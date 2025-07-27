const { configMongoose } = require("../database/database");
const Usuario = configMongoose.usuario;
const RutaComponents = configMongoose.ruta_component;
const jwt = require("jsonwebtoken");
const {hashPassword} = require("../util/crypto/hash");

exports.crearUsuario = async function (usuario) {
 try{
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
 }catch(e){throw e}
};

exports.obtenerUsuario = async function (usuario) {
  try {
    return Usuario.find({ usuario: usuario });
  } catch (e) {
    throw e;
  }
}

exports.autenticarUsuario = async function (user,password) {
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
    console.log(datos);
    return datos.success === true;
  } catch (err) {
    console.error("Error el verificar captcha: ", err);
    return false;
  }
};


exports.obtenerAccesosPorPerfil = async function (perfil) {
  try {
    return RutaComponents.find({ perfil: perfil });
  } catch (e) {
    throw e;
  }
};
