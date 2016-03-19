var Hapi = require('hapi'),
    Mongoose = require('mongoose'),
    DbOpts = require('./config').mongo;
    var Path = require('path');

module.exports = function() {

  Mongoose.connect(DbOpts.url);

  var server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'templates')
            }
        }
    }
  });
  server.connection({
    host: '192.168.0.103',
    port: 3000,
    labels: ['api']

  });

  var io = require('socket.io')(server.listener);

  //Cargamos archivos de unrutamiento y plugins
  var plugins = [
    {register: require('../app/routes/index.server.routes')},
    {register: require('inert')},
    {register: require('vision')},
    {register: require('hapi-swagger'), options: {info: {version: '0.0.1'}}}
  ];
  //var vision = require('vision');
  server.register(plugins, {select: 'api'}, function(err) {
    if(err) throw err;

    //Configurando la plantilla
    server.views({
      engines: {
        html: require('ejs')
      },
      relativeTo: __dirname,
      path: '../templates'
    });

    //Configurar los archivos estaticos
    server.route({
      method: 'GET',
      path: '/static/{path*}',
      config: {
        handler: {
          directory: {
            path: Path.join(__dirname, "../templates")
          }
        }
      }
    });

  });

  /*
  var count = 0;

  io.on('connection', function(socket) {
    socket.emit('count', {count: count});
    socket.on('increase', function() {
      count++;
      io.sockets.emit('count', {count: count});
    });
  });
  */

  io.on('connection', function (socket) {
    console.log('Nuevo Usuario Conectado!!');

    socket.on('new user', function(data, callback) {
      callback(true);
      socket.nickname = data;
    });

    socket.on('message', function (data) {
      console.log(data);
      io.emit('message', { msg: data, user: socket.nickname });
    });


    socket.on('disconnect', function() {
      console.log('Usuario desconectado');
    });


  });

  return server;
};
