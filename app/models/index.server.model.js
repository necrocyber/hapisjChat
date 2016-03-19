var Mongoose   = require('mongoose');
var Schema     = Mongoose.Schema;

var librosSchema = new Schema({
  autor: { type : String },
  libro: { type : String }
});

var libros = Mongoose.model('libros', librosSchema);

module.exports = {
  Libros: libros
};
