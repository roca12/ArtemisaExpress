const NotificacionService = require("../service/NotificacionService");
const EmailStrategy = require("../service/notificacion/EmailStrategy");

/**
 * Controlador para las rutas relacionadas con las notificaciones.
 */
class NotificacionController {
  constructor(router) {
    this.service = new NotificacionService(new EmailStrategy());
    router.post("/notificacion/enviar-codigo", this.enviarCodigo.bind(this));
    router.post(
      "/notificacion/reenviar-codigo",
      this.reenviarCodigo.bind(this),
    );
    router.post("/notificacion/validar-codigo", this.validarCodigo.bind(this));
  }

  /**
   * Envía un código de verificación al destino indicado.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async enviarCodigo(req, res) {
    const { destino, usuario } = req.body;
    try {
      const resultado = await this.service.enviarCodigo(destino, usuario);
      res.status(200).json(resultado);
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ ok: false, error: error.message });
    }
  }

  /**
   * Reenvía el código de verificación al destino indicado.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async reenviarCodigo(req, res) {
    const { destino, usuario } = req.body;
    try {
      const response = await this.service.reenviarCodigo(destino, usuario);
      res.status(200).json(response);
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ ok: false, error: error.message });
    }
  }

  /**
   * Valida el código de verificación enviado al destino.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async validarCodigo(req, res) {
    const { destino, codigo } = req.body;
    try {
      const response = await this.service.validarCodigo(destino, codigo);
      res.status(200).json(response);
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ ok: false, error: error.message });
    }
  }
}

module.exports = NotificacionController;
