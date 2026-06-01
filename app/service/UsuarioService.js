const ModelUsuario = require("../model/usuario");
const jwt = require("jsonwebtoken");
const { hashPassword } = require("../util/crypto/hash");

/**
 * Servicio para la gestión y autenticación de usuarios.
 */
class UsuarioService {
  constructor() {
    this.model = ModelUsuario;
  }

  /**
   * Crea un nuevo usuario hasheando su contraseña antes de persistirlo.
   * @param {Object} usuario - Datos del usuario a crear.
   * @returns {Promise<Object>} Usuario creado.
   */
  async crearUsuario(usuario) {
    if (usuario?.contrasenia) {
      usuario.contrasenia = hashPassword(usuario.contrasenia);
    }
    return await this.model.crearUsuario(usuario);
  }

  /**
   * Autentica un usuario verificando sus credenciales y retorna un token JWT.
   * @param {string} usuario - Nombre de usuario.
   * @param {string} contrasenia - Contraseña en texto plano.
   * @returns {Promise<{token: string}>} Objeto con el token JWT.
   */
  async autenticarUsuario(usuario, contrasenia) {
    const password = hashPassword(contrasenia);
    const [searchUser] = await this.model.findByCredentials(usuario, password);
    return {
      token: jwt.sign(
        {
          usuario: searchUser.usuario,
          correo: searchUser.correo,
          rol: searchUser.rol,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" },
      ),
    };
  }

  /**
   * Valida un token de reCAPTCHA contra la API de Google.
   * @param {string} token - Token de reCAPTCHA a verificar.
   * @returns {Promise<boolean>} `true` si el token es válido.
   */
  async autenticarToken(token) {
    const params = new URLSearchParams();
    params.append("response", token);
    params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
    try {
      const response = await fetch(process.env.API_GOOGLE_CAPTCHA, {
        method: "POST",
        body: params,
      });
      const datos = await response.json();
      return datos.success === true;
    } catch (err) {
      console.error("Error al verificar captcha: ", err);
      return false;
    }
  }
}

module.exports = UsuarioService;
