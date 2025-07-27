const { configMongoose } = require("../database/database");
const { response } = require("express");
const Libro = configMongoose.libro;

exports.findAll = async function () {
  try {
    return { data: await Libro.find({}) };
  } catch (e) {
    throw e;
  }
};

exports.createbook = async function (libro) {
  try {
    let response = {};
    libro &&
      libro.titulo &&
      libro.archivoPdf &&
      libro.imagen &&
      (await (async () => {
        response = await new Libro({
          titulo: libro.titulo,
          archivoPdf: libro.archivoPdf,
          imagen: libro.imagen,
        }).save();
      })());
    return response;
  } catch (e) {
    throw e;
  }
};
