var Libros = require('../models/index.server.model').Libros;

var addUrl = function(server, libro){
   var baseUrl = 'http://' + server.host;
   libro.url = baseUrl + '/' + libro._id;
   return libro;
}

var save = function(request, reply){
   libro = new Libros(request.payload);
   //libro.autor = request.payload.autor;
   //libro.libro = request.payload.libro;

   libro.save(function (err) {
    if (!err) {
      var response = addUrl(request.info, libro);
      reply(response);
    } else {
      reply(Hapi.error.internal('Internal MongoDB error', err));
    }
   });
};

var getAll = function(request, reply) {
  //reply.view('index');
  var todosWithUrl = [];
  Libros.find({}, function (err, libros) {
      if (!err) {
	      for(i in libros){
	        todosWithUrl.push(addUrl(request.info, libros[i]));
	      }
        reply(todosWithUrl);
      } else {
        reply(err);
      }
   });
};

var controller = {
    getAll: getAll,
    save: save
}

module.exports = controller;
