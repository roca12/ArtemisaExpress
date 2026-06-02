const { configMongoose } = require("../database/database");
const Usuario = configMongoose.usuario;

/**
 * Guarda un nuevo usuario en la base de datos.
 * @param {Object} usuario - Datos del usuario ya procesados (contraseña hasheada).
 * @returns {Promise<Object>} Usuario creado.
 */
exports.crearUsuario = function (usuario) {
  return new Usuario(usuario).save();
};

/**
 * Busca un usuario por nombre de usuario y contraseña hasheada.
 * @param {string} usuario - Nombre de usuario.
 * @param {string} contrasenia - Contraseña ya hasheada.
 * @returns {Promise<Array>} Lista de usuarios encontrados.
 */
exports.findByCredentials = function (usuario, contrasenia) {
  return Usuario.find({ usuario, contrasenia });
};

/**
 * Actualiza los datos de un usuario por ID.
 * @param {Object} params - Parámetros de actualización.
 * @param {string} params.id - Identificador del usuario.
 * @param {Object} params.data - Campos a actualizar.
 * @returns {Promise<Object|null>} Usuario actualizado o null si no existe.
 */
exports.actualizarUsuario = function ({ id, data }) {
  return Usuario.findOneAndUpdate({ _id: id }, data, { new: true });
};

/**
 * Busca un usuario por correo electrónico.
 * @param {string} correo - Correo electrónico único del usuario.
 * @returns {Promise<Object|null>} Usuario encontrado o null si no existe.
 */
exports.buscarPorCorreo = function (correo) {
  return Usuario.findOne({ correo });
};

/**
 * Busca un usuario por nombre de usuario.
 * @param {string} usuario - Nombre de usuario único.
 * @returns {Promise<Object|null>} Usuario encontrado o null si no existe.
 */
exports.buscarPorUsuario = function (usuario) {
  return Usuario.findOne({ usuario });
};
