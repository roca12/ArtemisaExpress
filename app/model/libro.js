const { configMongoose } = require("../database/database");
const Libro = configMongoose.libro;

exports.findAll = async function () {
  return Libro.find({});
};

exports.createbook = async function ({ titulo, archivoPdf, imagen }) {
  return new Libro({ titulo, archivoPdf, imagen });
};

exports.updatebook = async function ({ id, datos }) {
  return Libro.findByIdAndUpdate(id, datos, { new: true });
};

exports.deletebook = async function ({ id }) {
  return Libro.findByIdAndRemove(id);
};
