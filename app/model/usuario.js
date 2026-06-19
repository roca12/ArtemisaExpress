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
 * Marca el correo de un usuario como verificado.
 * @param {string} correo - Correo del usuario.
 * @returns {Promise<Object|null>} Usuario actualizado.
 */
exports.verificarCorreo = function (correo) {
  return Usuario.findOneAndUpdate(
    { correo },
    { verificado: true },
    { new: true },
  );
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
/**
 * Busca un usuario a partir de su id y lo elimina
 * @param id el identificador único del usuario
 * @returns {Promise<Object>} La confirmacin de eliminación.
 */
exports.eliminarUsuario = function (id) {
  return Usuario.findOneAndDelete({ _id: id });
};
/**
 * Obtiene todos los usuarios.
 * @returns {Promise<Array>}
 */
exports.obtenerUsuarios = function () {
  return Usuario.find().select("rol usuario correo -_id");
};

/**
 * Obtiene un usuario por id.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
exports.obtenerUsuario = function (id) {
  return Usuario.findById(id).select("rol usuario correo -_id");
};

/**
 * Obtiene los usuarios de un rol específico.
 * @param {string} rol
 * @returns {Promise<Array>}
 */
exports.obtenerUsuariosPorRol = function (rol) {
  return Usuario.find({ rol }).select("rol usuario correo -_id");
};
