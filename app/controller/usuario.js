const UsuarioService = require("../service/UsuarioService");

/**
 * Controlador para las rutas relacionadas con los usuarios.
 */
class Usuario {
  constructor(router) {
    this.service = new UsuarioService();
    router.post("/usuario/crear", this.crearUsuario.bind(this));
    router.post("/usuario/autenticar", this.autenticarUsuario.bind(this));
    router.post(
      "/usuario/autenticar/captcha",
      this.autenticarCaptcha.bind(this),
    );
  }

  /**
   * Crea un nuevo usuario.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async crearUsuario(req, res) {
    const usuario = req.body;
    try {
      const resultado = await this.service.crearUsuario(usuario);
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

  /**
   * Autentica un token de captcha.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async autenticarCaptcha(req, res) {
    try {
      const { token } = req.body;
      const resultado = await this.service.autenticarToken(token);
      res.status(200).json(resultado);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }

  /**
   * Autentica un usuario con su nombre de usuario y contraseña.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async autenticarUsuario(req, res) {
    const { usuario, contrasenia } = req.body;
    try {
      const resultado = await this.service.autenticarUsuario(
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
