const { configMongoose } = require("../database/database");
const Temario = configMongoose.temario;


/**
 * Obtiene todos los registros del temario.
 * @returns {Promise<{data: Array}>} Objeto con la lista de temarios.
 */
exports.findAll = function () {
  return Temario.find({});
};

/**
 * Obtiene los nombres únicos de supergrupos del temario.
 * @returns {Promise<{data: string[]}>} Objeto con la lista de nombres de supergrupos.
 */
exports.supergrupos = function () {
  const resultado = Temario.aggregate([
    {
      $group: {
        _id: "$supergrupo",
      },
    },
  ]);
  return resultado.map((item) => item._id);
};
/**
 * Crea y guarda un nuevo temario en la base de datos.
 * @param {Object} data - Datos del temario.
 * @returns {Promise<Object>} Temario creado.
 */
exports.crearTemario = function (data) {
  return new Temario(data).save();
};
/**
 * Actualiza los datos de un temario por ID.
 * @param {Object} params - Parámetros de actualización.
 * @param {string} params.id - Identificador del temario.
 * @param {Object} params.data - Campos a actualizar.
 * @returns {Promise<Object|null>} Temario actualizado o null si no existe.
 */
exports.actualizarTemario = function ({ id, data }) {
  return Temario.findOneAndUpdate({ _id: id }, data, { new: true });
};
/**
 * Busca un temario a partir de su id y lo elimina
 * @param id el identificador único del temario
 * @returns {Promise<Object>} La confirmacin de eliminación.
 */
exports.eliminarTemario = function (id) {
  return Temario.findOneAndDelete({ _id: id });
};

/**
 * Busca un temario a partir de su id.
 * @param id el identificador único del temario
 * @returns {Promise<Object>} El temario encontrado.
 */
exports.obtenerPorId = function (id) {
  return Temario.findOne({ _id: id });
};
