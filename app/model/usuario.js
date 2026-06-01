const { configMongoose } = require("../database/database");
const Usuario = configMongoose.usuario;
const RutaComponents = configMongoose.ruta_component;

/**
 * Guarda un nuevo usuario en la base de datos.
 * @param {Object} usuario - Datos del usuario ya procesados (contraseña hasheada).
 * @returns {Promise<Object>} Usuario creado.
 */
exports.crearUsuario = function (usuario) {
  return new Usuario(usuario).save();
};

/**
 * Busca un usuario por nombre de usuario.
 * @param {string} usuario - Nombre de usuario a buscar.
 * @returns {Promise<Array>} Lista de usuarios encontrados.
 */
exports.obtenerUsuario = function (usuario) {
  return Usuario.find({ usuario });
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
 * Obtiene las rutas y componentes accesibles para un perfil de usuario.
 * @param {string} perfil - Nombre del perfil (rol).
 * @returns {Promise<Array>} Lista de rutas y componentes del perfil.
 */
exports.obtenerAccesosPorPerfil = function (perfil) {
  return RutaComponents.find({ perfil });
};
