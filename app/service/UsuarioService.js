const ModelUsuario = require("../model/usuario");
const jwt = require("jsonwebtoken");
const { hashPassword } = require("../util/crypto/hash");
const UsuarioResponse = require("../dto/UsuarioResponse");

/**
 * Servicio para la gestión y autenticación de usuarios.
 */
class UsuarioService {
  constructor() {
    this.model = ModelUsuario;
    this.captchaSecret = process.env.CAPTCHA_SECRET;
    this.captchaUrl = "https://www.google.com/recaptcha/api/siteverify";
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
    if (!searchUser) throw new Error("Usuario o contraseña inválidos");
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
    params.append("secret", this.captchaSecret);
    try {
      const response = await fetch(this.captchaUrl, {
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

  async cambiarNombreDeUsuario(correo, nombreDeUsuario) {
    if (!correo) throw new Error("El correo es obligatorio.");
    if (!nombreDeUsuario) throw new Error("El nombre de obligatorio.");
    const checkUsuario = await this.model.buscarPorUsuario(nombreDeUsuario);
    if(checkUsuario) throw new Error("Este nombre de usuario ya está en uso.");
    const oldUsuario = await this.model.buscarPorCorreo(correo);
    if (!oldUsuario) throw new Error("No hay usuario con este correo.");
    oldUsuario.usuario = nombreDeUsuario;
    return await this.model.actualizarUsuario({id:oldUsuario.id, data:oldUsuario});
  }
  async cambiarEmailDeUsuario(nombreDeUsuario, correo) {
    if (!nombreDeUsuario) throw new Error("El nombre de usuario es obligatorio.");
    if (!correo) throw new Error("El correo es obligatorio.");
    const checkCorreo = await this.model.buscarPorCorreo(correo);
    if (checkCorreo) throw new Error("Este correo ya está en uso.");
    const usuario = await this.model.buscarPorUsuario(nombreDeUsuario);
    if (!usuario) throw new Error("No hay usuario con este nombre de usuario.");
    usuario.correo = correo;
    return await this.model.actualizarUsuario({ id: usuario.id, data: usuario });
  }
  async cambiarContrasenia(nombreDeUsuario, nuevaContrasenia) {
    if (!nombreDeUsuario) throw new Error("El nombre de usuario es obligatorio.");
    if (!nuevaContrasenia) throw new Error("La nueva contraseña es obligatoria.");
    const usuario = await this.model.buscarPorUsuario(nombreDeUsuario);
    if (!usuario) throw new Error("No hay usuario con este nombre de usuario.");
    usuario.contrasenia = hashPassword(nuevaContrasenia);
    return await this.model.actualizarUsuario({ id: usuario.id, data: usuario });
  }
}

module.exports = UsuarioService;
