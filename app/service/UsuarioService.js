const ModelUsuario = require("../model/usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { hashPassword } = require("../util/crypto/hash");

/**
 * Servicio para la gestión y autenticación de usuarios.
 */
class UsuarioService {
  /**
   * @param {Object} mfaService - Servicio de verificación multifactor (MFA) usado para enviar y validar códigos por correo.
   */
  constructor(mfaService) {
    this.model = ModelUsuario;
    this.mfaService = mfaService;
    this.captchaSecret = process.env.RECAPTCHA_SECRET_KEY;
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
    if (!token) return false;
    if (!this.captchaSecret) {
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

  /**
   * Obtiene la lista de todos los usuarios.
   * @returns {Promise<Object[]>} Lista de usuarios.
   */
  async obtenerUsuarios() {
    return await this.model.obtenerUsuarios();
  }

  /**
   * Obtiene un usuario por su ID.
   * @param {string} id - Identificador del usuario.
   * @returns {Promise<Object>} Usuario encontrado.
   * @throws {Error} Si no se proporciona el ID.
   */
  async obtenerUsuario(id) {
    if (!id) throw new Error("El id es obligatorio");
    return await this.model.obtenerUsuario(id);
  }

  /**
   * Obtiene los usuarios que tienen un rol determinado.
   * @param {string} rol - Rol por el cual filtrar (p. ej. "admin", "estudiante").
   * @returns {Promise<Object[]>} Lista de usuarios con el rol indicado.
   * @throws {Error} Si no se proporciona el rol.
   */
  async obtenerUsuariosPorRol(rol) {
    if (!rol) throw new Error("El rol es obligatorio");
    return await this.model.obtenerUsuariosPorRol(rol);
  }

  /**
   * Busca un usuario por su nombre de usuario.
   * @param {string} nombre - Nombre de usuario a buscar.
   * @returns {Promise<Object>} Usuario encontrado.
   * @throws {Error} Si no se proporciona el nombre.
   */
  async obtenerPorNombre(nombre) {
    if (!nombre) throw new Error("El nombre es obligatorio.");
    return await this.model.buscarPorUsuario(nombre);
  }

  /**
   * Elimina un usuario por ID.
   * @param {string} id - Identificador del usuario.
   * @returns {Promise<Object>} Confirmación de eliminación.
   */
  async eliminarUsuario(id) {
    if (!id) throw new Error("El id es obligatorio");

    const usuario = await this.model.eliminarUsuario(id);

    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    return usuario;
  }
}

module.exports = UsuarioService;
