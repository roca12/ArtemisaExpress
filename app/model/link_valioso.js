const { configMongoose } = require("../database/database");
const LinkValioso = configMongoose.link_valioso;

/**
 * Obtiene todos los links valiosos de la base de datos.
 * @returns {Promise<Array>} Lista de links valiosos.
 */
exports.findAll = async function () {
  return LinkValioso.find({});
};

/**
 * Actualiza un link valioso por ID.
 * @param {Object} params - Parámetros de actualización.
 * @param {string} params.id - Identificador del link.
 * @param {Object} params.datos - Datos a actualizar.
 * @returns {Promise<Object|null>} Link actualizado o null.
 */
exports.updateOne = async function ({ id, datos }) {
  return LinkValioso.findOneAndUpdate({ _id: id }, datos, { new: true });
};

/**
 * Elimina un link valioso por ID.
 * @param {string} id - Identificador del link.
 * @returns {Promise<Object|null>} Link eliminado o null.
 */
exports.deleteOne = async function (id) {
  return LinkValioso.findOneAndDelete({ _id: id });
};

/**
 * Crea y guarda un nuevo link valioso.
 * @param {Object} data - Datos del link valioso.
 * @returns {Promise<Object>} Link creado.
 */
exports.create = async function (data) {
  return new LinkValioso(data).save();
};
