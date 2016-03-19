var index = require('../controllers/index.server.controller');
var Joi = require('joi');

exports.register = function(server, options, next) {
  server.route({
    method: 'GET',
    path: '/api/user',
    config: {
        // Include this API in swagger documentation
        tags: ['api'],
        description: 'Get All User data',
        notes: 'Get All User data'
    },
    handler: index.getAll
  });

  server.route({
    method: 'POST',
    path: '/api/user',
    config: {
        // Include this API in swagger documentation
        tags: ['api'],
        description: 'Save User data',
        notes: 'Save User data',
        validate: {
            payload: {
                autor: Joi.string().required(),
                libro: Joi.string().required()
            }
        }
    },
    handler: index.save
  });

  server.route({
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        reply.view('index', {
          title: 'Project Chat HapiJs'
        });
      }
    });

  next();
}

exports.register.attributes = {
    name: 'routes',
    version: '1.0.0'
};
