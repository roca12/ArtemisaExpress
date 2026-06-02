const { configMongoose } = require("../database/database");
const Libro = configMongoose.libro;

/**
 * Obtiene todos los libros de la base de datos.
 * @returns {Promise<Array>} Lista de libros.
 */
exports.findAll = function () {
  return Libro.find({});
};

/**
 * Crea un nuevo libro (sin guardarlo en la base de datos).
 * @param {Object} datos - Datos del libro.
 * @param {string} datos.titulo - Título del libro.
 * @param {string} datos.archivoPdf - URL del archivo PDF.
 * @param {string} datos.imagen - URL de la imagen de portada.
 * @returns {Promise<Object>} Instancia del libro creado.
 */
exports.createbook = function ({ titulo, archivoPdf, imagen }) {
  return new Libro({ titulo, archivoPdf, imagen }).save();
};

/**
 * Actualiza un libro por ID.
 * @param {Object} params - Parámetros de actualización.
 * @param {string} params.id - Identificador del libro.
 * @param {Object} params.datos - Campos a actualizar.
 * @returns {Promise<Object|null>} Libro actualizado o null.
 */
exports.updatebook = function ({ id, datos }) {
  return Libro.findByIdAndUpdate(id, datos, { new: true });
};

/**
 * Elimina un libro por ID.
 * @param {Object} params - Parámetros.
 * @param {string} params.id - Identificador del libro.
 * @returns {Promise<Object|null>} Libro eliminado o null.
 */
exports.deletebook = function ({ id }) {
  return Libro.findByIdAndRemove(id);
};
