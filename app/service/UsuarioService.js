const ModelUsuario = require("../model/usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { hashPassword } = require("../util/crypto/hash");

/**
 * Servicio para la gestión y autenticación de usuarios.
 */
class UsuarioService {
  constructor(mfaService) {
    this.model = ModelUsuario;
    this.mfaService = mfaService;
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
    const creado = await this.model.crearUsuario(usuario);
    await this.mfaService.enviarCodigo(creado.correo, creado.usuario);
    return creado;
  }

  /**
   * Verifica el correo de un usuario validando el código MFA recibido.
   * @param {string} correo - Correo electrónico del usuario.
   * @param {string} codigo - Código de verificación recibido por correo.
   * @returns {Promise<Object>} Usuario actualizado con correo verificado.
   * @throws {Error} Si el código es inválido o ha expirado.
   */
  async verificarCorreo(correo, codigo) {
    const valido = await this.mfaService.validarCodigo(correo, codigo);
    if (!valido) throw new Error("Código inválido o expirado.");
    return await this.model.verificarCorreo(correo);
  }

  /**
   * Autentica un usuario verificando sus credenciales y retorna un token JWT.
   * @param {string} usuario - Nombre de usuario.
   * @param {string} contrasenia - Contraseña en texto plano.
   * @returns {Promise<{token: string}>} Objeto con el token JWT.
   */
  async autenticarUsuario(usuario, contrasenia) {
    const searchUser = await this.model.buscarPorUsuario(usuario);
    if (!searchUser || !bcrypt.compareSync(contrasenia, searchUser.contrasenia))
      throw new Error("Usuario o contraseña inválidos");
    if (!searchUser.verificado) throw new Error("Correo no verificado");
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
    if(!token) return false;
    if(!this.captchaSecret){
      console.log("CAPTCHA_SECRET no configurado.");
      return false;
    }
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

  /**
   * Cambia el nombre de usuario de una cuenta identificada por correo.
   * @param {string} correo - Correo electrónico del usuario.
   * @param {string} nombreDeUsuario - Nuevo nombre de usuario.
   * @returns {Promise<Object>} Usuario actualizado.
   */
  async cambiarNombreDeUsuario(correo, nombreDeUsuario) {
    if (!correo) throw new Error("El correo es obligatorio.");
    if (!nombreDeUsuario) throw new Error("El nombre de obligatorio.");
    const checkUsuario = await this.model.buscarPorUsuario(nombreDeUsuario);
    if (checkUsuario) throw new Error("Este nombre de usuario ya está en uso.");
    const oldUsuario = await this.model.buscarPorCorreo(correo);
    if (!oldUsuario) throw new Error("No hay usuario con este correo.");
    oldUsuario.usuario = nombreDeUsuario;
    return await this.model.actualizarUsuario({
      id: oldUsuario.id,
      data: oldUsuario,
    });
  }
  /**
   * Cambia el correo electrónico de un usuario.
   * @param {string} nombreDeUsuario - Nombre del usuario.
   * @param {string} correo - Nuevo correo electrónico.
   * @returns {Promise<Object>} Usuario actualizado.
   */
  async cambiarEmailDeUsuario(nombreDeUsuario, correo) {
    if (!nombreDeUsuario)
      throw new Error("El nombre de usuario es obligatorio.");
    if (!correo) throw new Error("El correo es obligatorio.");
    const checkCorreo = await this.model.buscarPorCorreo(correo);
    if (checkCorreo) throw new Error("Este correo ya está en uso.");
    const usuario = await this.model.buscarPorUsuario(nombreDeUsuario);
    if (!usuario) throw new Error("No hay usuario con este nombre de usuario.");
    usuario.correo = correo;
    return await this.model.actualizarUsuario({
      id: usuario.id,
      data: usuario,
    });
  }
  /**
   * Cambia la contraseña de un usuario hasheando el nuevo valor antes de persistirlo.
   * @param {string} nombreDeUsuario - Nombre del usuario.
   * @param {string} nuevaContrasenia - Nueva contraseña en texto plano.
   * @returns {Promise<Object>} Usuario actualizado.
   */
  async cambiarContrasenia(nombreDeUsuario, nuevaContrasenia) {
    if (!nombreDeUsuario)
      throw new Error("El nombre de usuario es obligatorio.");
    if (!nuevaContrasenia)
      throw new Error("La nueva contraseña es obligatoria.");
    const usuario = await this.model.buscarPorUsuario(nombreDeUsuario);
    if (!usuario) throw new Error("No hay usuario con este nombre de usuario.");
    usuario.contrasenia = hashPassword(nuevaContrasenia);
    return await this.model.actualizarUsuario({
      id: usuario.id,
      data: usuario,
    });
  }

  async obtenerUsuarios() {
  return await this.model.obtenerUsuarios();
}

async obtenerUsuario(id) {
  if (!id) throw new Error("El id es obligatorio");
  return await this.model.obtenerUsuario(id);
}

async obtenerUsuariosPorRol(rol) {
  if (!rol) throw new Error("El rol es obligatorio");
  return await this.model.obtenerUsuariosPorRol(rol);
}

 /**
   * Elimina un usuario por ID.
   * @param {string} id - Identificador del usuario.
   * @returns {Promise<Object>} Confirmación de eliminación.
   */
  async eliminarUsuario(id) {
  if (!id) throw new Error("El id es obligatorio");

  const problema = await this.model.eliminarProblema(id);

  if (!problema) {
    throw new Error("Problema no encontrado");
  }

  return problema;
}

}

module.exports = UsuarioService;
