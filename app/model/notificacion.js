const { configMongoose } = require("../database/database");
const Notificacion = configMongoose.notificacion;

/**
 * Crea y guarda un nuevo documento de notificación.
 * @param {Object} data - Datos de la notificación.
 * @returns {Promise<Object>} Documento creado.
 */
exports.createOne = function (data) {
  return new Notificacion(data).save();
};

/**
 * Busca una notificación por destino y plantilla.
 * @param {string} destino - Dirección de destino.
 * @param {string} plantilla - Tipo de plantilla ('verificacion', 'aviso', etc.).
 * @returns {Promise<Object|null>} Notificación encontrada o null.
 */
exports.findOne = function (destino, plantilla) {
  return Notificacion.findOne({ destino, plantilla }, null, { sort: { creadoEn: -1 } });
};

/**
 * Marca el código de un documento de notificación como usado.
 * @param {string} id - Identificador del documento.
 * @returns {Promise<Object|null>} Documento actualizado o null.
 */
exports.marcarUsado = function (id) {
  return Notificacion.findByIdAndUpdate(id, { "datos.usado": true }, { new: true });
};

/**
 * Actualiza los datos de una notificación existente.
 * @param {string} destino - Dirección de destino.
 * @param {string} plantilla - Tipo de plantilla.
 * @param {Object} datos - Nuevos datos de la notificación.
 * @returns {Promise<Object|null>} Notificación actualizada o null.
 */
exports.updateOne = function (destino, plantilla, datos) {
  return Notificacion.findOneAndUpdate(
    { destino, plantilla },
    { datos },
    { new: true, sort: { creadoEn: -1 } },
  );
};

/**
 * Marca una notificación como enviada.
 * @param {string} id - Identificador de la notificación.
 * @returns {Promise<Object|null>} Notificación actualizada o null.
 */
exports.marcarEnviado = function (id) {
  return Notificacion.findByIdAndUpdate(id, { enviado: true }, { new: true });
};
