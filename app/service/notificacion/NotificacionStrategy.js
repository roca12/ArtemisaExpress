class NotificacionStrategy {
  get tipo() {
    throw new Error(`${this.constructor.name} debe implementar 'tipo'`);
  }
  async send(destino, datos) {
    throw new Error(
      `${this.constructor.name} debe implementar 'send(destino,datos)'`,
    );
  }
}
module.exports = NotificacionStrategy;
