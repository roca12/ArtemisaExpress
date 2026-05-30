const NotificacionService = require("../service/NotificacionService");
const EmailStrategy = require("../service/notificacion/EmailStrategy");

class NotificacionController {
  constructor(router) {
    this.service = new NotificacionService(new EmailStrategy());
    router.post("/notificacion/enviar-codigo", this.enviarCodigo.bind(this));
    router.post("/notificacion/reenviar-codigo", this.reenviarCodigo.bind(this));
    router.post("/notificacion/validar-codigo", this.validarCodigo.bind(this));
  }

  async enviarCodigo(req, res) {
    const { destino, usuario } = req.body;
    try {
      const resultado = await this.service.enviarCodigo(destino, usuario);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(error.statusCode || 500).json({ok: false, error: error.message});
    }
  }

  async reenviarCodigo(req, res) {
    const {destino, usuario} = req.body;
    try{
      const response = await this.service.reenviarCodigo(destino, usuario);
      res.status(200).json(response);
    }catch(error){
      res.status(error.statusCode || 500).json({ok: false, error: error.message});
    }
  }

  async validarCodigo(req, res) {
    const {destino, codigo} = req.body;
    try{
      const response = await this.service.validarCodigo(destino, codigo);
      res.status(200).json(response);
    }catch(error){
      res.status(error.statusCode || 500).json({ok: false, error: error.message});
    }
  }
}

module.exports = CorreoConfirmacion;
