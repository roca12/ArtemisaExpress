const MFAService = require("../service/MFAService");
const NotificacionService = require("../service/NotificacionService");
const EmailStrategy = require("../service/notificacion/EmailStrategy");

/**
 * Controlador para las rutas de MFA y notificaciones generales.
 * Ambos servicios comparten la misma EmailStrategy.
 */
class NotificacionController {
  constructor(router) {
    const emailStrategy = new EmailStrategy();
    this.mfaService = new MFAService(emailStrategy);
    this.notificacionService = new NotificacionService(emailStrategy);
    router.post("/notificacion/enviar-codigo", this.enviarCodigo.bind(this));
    router.post(
      "/notificacion/reenviar-codigo",
      this.reenviarCodigo.bind(this),
    );
    router.post("/notificacion/validar-codigo", this.validarCodigo.bind(this));
  }

  /**
   * @openapi
   * /notificacion/enviar-codigo:
   *   post:
   *     tags: [MFA]
   *     summary: Genera y envía un código de verificación al correo del usuario
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [destino, usuario]
   *             properties:
   *               destino:
   *                 type: string
   *                 format: email
   *                 example: juan@ejemplo.com
   *               usuario:
   *                 type: string
   *                 example: juan123
   *     responses:
   *       200:
   *         description: Código enviado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success: { type: boolean, example: true }
   *                 message: { type: string, example: Código enviado exitosamente }
   *       500:
   *         description: Error al enviar el código
   */
  async enviarCodigo(req, res) {
    const { destino, usuario } = req.body;
    try {
      const resultado = await this.mfaService.enviarCodigo(destino, usuario);
      res.status(200).json(resultado);
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ ok: false, error: error.message });
    }
  }

  /**
   * @openapi
   * /notificacion/reenviar-codigo:
   *   post:
   *     tags: [MFA]
   *     summary: Regenera y reenvía el código de verificación
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [destino, usuario]
   *             properties:
   *               destino:
   *                 type: string
   *                 format: email
   *                 example: juan@ejemplo.com
   *               usuario:
   *                 type: string
   *                 example: juan123
   *     responses:
   *       200:
   *         description: Código reenviado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success: { type: boolean, example: true }
   *                 message: { type: string, example: Código reenviado exitosamente }
   *       500:
   *         description: Error al reenviar el código
   */
  async reenviarCodigo(req, res) {
    const { destino, usuario } = req.body;
    try {
      const response = await this.mfaService.reenviarCodigo(destino, usuario);
      res.status(200).json(response);
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ ok: false, error: error.message });
    }
  }

  /**
   * @openapi
   * /notificacion/validar-codigo:
   *   post:
   *     tags: [MFA]
   *     summary: Valida el código MFA ingresado por el usuario
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [destino, codigo]
   *             properties:
   *               destino:
   *                 type: string
   *                 format: email
   *                 example: juan@ejemplo.com
   *               codigo:
   *                 type: string
   *                 example: A3K7
   *     responses:
   *       200:
   *         description: Resultado de la validación
   *         content:
   *           application/json:
   *             schema:
   *               type: boolean
   *               example: true
   *       500:
   *         description: Error al validar el código
   */
  async validarCodigo(req, res) {
    const { destino, codigo } = req.body;
    try {
      const response = await this.mfaService.validarCodigo(destino, codigo);
      res.status(200).json(response);
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ ok: false, error: error.message });
    }
  }
}

module.exports = NotificacionController;
