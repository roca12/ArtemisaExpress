const { configMongoose } = require("../database/database");
const Usuario = configMongoose.usuario;
const RutaComponents = configMongoose.ruta_component;
const jwt = require("jsonwebtoken");
const { hashPassword } = require("../util/crypto/hash");

/**
 * Crea un nuevo usuario en la base de datos hasheando su contraseña.
 * @param {Object} usuario - Datos del usuario a crear.
 * @returns {Promise<Object>} Usuario creado.
 */
exports.crearUsuario = async function (usuario) {
  try {
    let newUser = {};
    usuario &&
      usuario.usuario &&
      usuario.correo &&
      usuario.contrasenia &&
      usuario.rol &&
      (await (async () => {
        usuario.contrasenia = hashPassword(usuario.contrasenia);
        newUser = await new Usuario(usuario).save();
      })());
    return newUser;
  } catch (e) {
    throw e;
  }
};

/**
 * Busca un usuario por nombre de usuario.
 * @param {string} usuario - Nombre de usuario a buscar.
 * @returns {Promise<Array>} Lista de usuarios encontrados.
 */
exports.obtenerUsuario = async function (usuario) {
  try {
    return Usuario.find({ usuario: usuario });
  } catch (e) {
    throw e;
  }
};

/**
 * Autentica un usuario y retorna un token JWT.
 * @param {string} user - Nombre de usuario.
 * @param {string} password - Contraseña en texto plano.
 * @returns {Promise<{token: string}>} Objeto con el token JWT.
 */
exports.autenticarUsuario = async function (user, password) {
  try {
    let searchUser = {};
    user &&
      password &&
      (await (async () => {
        password = hashPassword(password);
        searchUser = await Usuario.find({
          usuario: user,
          contrasenia: password,
        });
      })());
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
  } catch (e) {
    throw e;
  }
};

/**
 * Valida un token de reCAPTCHA contra la API de Google.
 * @param {string} token - Token de reCAPTCHA a verificar.
 * @returns {Promise<boolean>} `true` si el token es válido.
 */
exports.autenticarToken = async function (token) {
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
    console.error("Error el verificar captcha: ", err);
    return false;
  }
};

/**
 * Obtiene las rutas y componentes accesibles para un perfil de usuario.
 * @param {string} perfil - Nombre del perfil (rol).
 * @returns {Promise<Array>} Lista de rutas y componentes del perfil.
 */
exports.obtenerAccesosPorPerfil = async function (perfil) {
  try {
    return RutaComponents.find({ perfil: perfil });
  } catch (e) {
    throw e;
  }
};
