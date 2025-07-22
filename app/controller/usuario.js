const ModelUsuario = require("./../model/usuario");
const EmailService = require("../util/mail/email_service");

class Usuario {
  constructor(router) {
    router.post("/usuario/crear", this.crearUsuario.bind(this));
    router.post("/usuario/autenticar", this.autenticarUsuario.bind(this));
    router.post(
      "/usuario/autenticar/captcha",
      this.autenticarCaptcha.bind(this),
    );
  }

  async crearUsuario(req, res) {
    const usuario = req.body;
    try {
      const resultado = await ModelUsuario.crearUsuario(usuario);
      res.status(200).json(resultado);
    } catch (error) {
      if (error.code === 11000) {
        console.error("Nombre de usuario o correo ya están en uso");
        res.status(409).json({
          ok: false,
          message: "Nombre de usuario o correo ya están en uso",
        });
      } else {
        console.error("Error registrando al usuario: ", error);
        res.status(500).json({
          ok: false,
          message: "Error registrando al usuario.",
          error: error.message,
        });
      }
    }
  }

  async autenticarCaptcha(req, res) {
    const { token } = req.body;
    res.send(await ModelUsuario.autenticarToken(token));
  }

  async autenticarUsuario(req, res) {
    const { usuario, contrasenia } = req.body;
    try {
      const resultado = await ModelUsuario.autenticarUsuario(
        usuario,
        contrasenia,
      );
      res.status(200).json(resultado);
    } catch (error) {
      console.error("Usuario o contraseña invalidos: ", error);
      res.status(404).json({
        ok: false,
        message: "Usuario o contraseña invalidos.",
        error: error.message,
      });
    }
  }
}

module.exports = Usuario;
