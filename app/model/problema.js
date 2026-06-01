const { configMongoose } = require("../database/database");
const Problema = configMongoose.problema;

/**
 * Obtiene todos los problemas de la base de datos.
 * @returns {Promise<{data: Array}>} Objeto con la lista de problemas.
 */
exports.findAll = async function () {
  return await Problema.findAll();
};

/**
 * Crea y guarda un nuevo problema en la base de datos.
 * @param {Object} data - Datos del problema.
 * @returns {Promise<Object>} Problema creado.
 */
exports.crearProblema = async function (data) {
   return await new Problema(data).save();
};

/**
 * Busca un problema a partir de su id y lo actualiza.
 * @param id el identificador único del problema
 * @param data los nuevos datos del problema
 * @returns {Promise<Object>} el problema actualizado.
 */
exports.actualizarProblema = async function ({id, data}) {
  return await Problema.findOneAndUpdate({_id:id}, data, { new: true });
}
/**
 * Busca un problema a partir de su id y lo elimina
 * @param id el identificador único del problema
 * @returns {Promise<Object>} La confirmacin de eliminación.
 */
exports.eliminarProblema = async function (id) {
  return await Problema.findOneAndDelete({_id: id});
}
