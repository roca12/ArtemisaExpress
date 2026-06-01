/**
 * Clase base (estrategia) para el envío de notificaciones.
 * Debe ser extendida por cada implementación concreta.
 */
class NotificacionStrategy {
  /**
   * Tipo de canal de notificación (p. ej. 'email', 'sms').
   * @type {string}
   */
  get tipo() {
    throw new Error(`${this.constructor.name} debe implementar 'tipo'`);
  }
  /**
   * Envía una notificación al destino indicado.
   * @param {string} destino - Dirección de destino.
   * @param {Object} datos - Datos a incluir en la notificación.
   * @returns {Promise<void>}
   */
  async send(destino, datos) {
    throw new Error(
      `${this.constructor.name} debe implementar 'send(destino,datos)'`,
    );
  }
}
module.exports = NotificacionStrategy;
