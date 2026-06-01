const ModelUsuario = require("../model/usuario");

/**
 * Servicio para la gestión y autenticación de usuarios.
 */
class UsuarioService {
  /**
   * Crea un nuevo usuario en la base de datos.
   * @param {Object} usuario - Datos del usuario a crear.
   * @returns {Promise<Object>} Usuario creado.
   */
  async crearUsuario(usuario) {
    return ModelUsuario.crearUsuario(usuario);
  }

  /**
   * Autentica un usuario y retorna un token JWT.
   * @param {string} usuario - Nombre de usuario.
   * @param {string} contrasenia - Contraseña en texto plano.
   * @returns {Promise<{token: string}>} Objeto con el token JWT.
   */
  async autenticarUsuario(usuario, contrasenia) {
    return ModelUsuario.autenticarUsuario(usuario, contrasenia);
  }

  /**
   * Valida un token de reCAPTCHA contra la API de Google.
   * @param {string} token - Token de reCAPTCHA a verificar.
   * @returns {Promise<boolean>} `true` si el token es válido.
   */
  async autenticarToken(token) {
    return ModelUsuario.autenticarToken(token);
  }
}

module.exports = UsuarioService;
