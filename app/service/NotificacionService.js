const ModelNotificacion = require("../model/notificacion");

/**
 * Servicio para el envío de notificaciones generales (avisos).
 * Para códigos MFA usa MFAService.
 */
class NotificacionService {
  constructor(strategy) {
    this.strategy = strategy;
    this.model = ModelNotificacion;
  }

  /**
   * Envía un aviso al destino indicado.
   * @param {string} destino - Dirección de destino.
   * @param {Object} datos - Datos del aviso a enviar.
   * @returns {Promise<void>}
   */
  async enviarAviso(destino, datos) {
    const doc = await this.model.createOne({
      destino,
      tipo: this.strategy.tipo,
      plantilla: "aviso",
      datos,
    });
    await this.strategy.send(destino, datos);
    await this.model.marcarEnviado(doc._id);
  }
}

module.exports = NotificacionService;
