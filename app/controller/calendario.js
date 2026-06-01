const CalendarioService = require("../service/CalendarService");

/**
 * Controlador para las rutas relacionadas con el calendario.
 */
class Calendario {
  constructor(router) {
    this.service = new CalendarioService();
    router.get("/calendario", this.obtenerInformacionCalendario.bind(this));
  }

  /**
   * Obtiene la información del calendario.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async obtenerInformacionCalendario(req, res) {
    try {
      const data = await this.service.obtenerCalendario();
      res.status(200).json(data);
    } catch (e) {
      res.status(e.statusCode || 500).json({ ok: false, message: e.message });
    }
  }
}

module.exports = Calendario;
