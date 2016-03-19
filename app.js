//Archivo principal
var server = require('./config/hapi');
var app = server();

app.start(function() {
  console.log('Servidor trabajando en: ' + app.info.uri);
});
