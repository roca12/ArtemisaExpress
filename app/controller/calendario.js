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
   * @openapi
   * /calendario:
   *   get:
   *     tags: [Calendario]
   *     summary: Obtiene eventos del calendario de Google en un rango de ±3 meses
   *     responses:
   *       200:
   *         description: Calendarios con sus eventos
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 calendarios:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       titulo: { type: string, example: Eventos Artemisa }
   *                       eventos:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                             id: { type: string }
   *                             titulo: { type: string }
   *                             inicio: { type: string, format: date-time }
   *                             fin: { type: string, format: date-time }
   *                             url: { type: string }
   *       502:
   *         description: Error al comunicarse con la API de Google Calendar
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
