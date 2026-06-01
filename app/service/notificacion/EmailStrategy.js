const NotificacionStrategy = require("./NotificacionStrategy");
const { sendVerificationCode } = require("../../util/mail/email_service");

/**
 * Implementación de NotificacionStrategy para el envío de notificaciones por correo electrónico.
 */
class EmailStrategy extends NotificacionStrategy {
  constructor() {
    super();
    this.tipo = "email";
    this.sendVerificationCode = sendVerificationCode;
  }
  /**
   * Envía el código de verificación por correo electrónico.
   * @param {string} destino - Correo electrónico destinatario.
   * @param {Object} datos - Datos del mensaje.
   * @param {string} datos.usuario - Nombre del usuario.
   * @param {string} datos.codigo - Código de verificación.
   * @returns {Promise<void>}
   */
  async send(destino, datos) {
    await this.sendVerificationCode(destino, datos.usuario, datos.codigo);
  }
}

module.exports = EmailStrategy;
