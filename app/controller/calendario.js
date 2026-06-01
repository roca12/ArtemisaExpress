const { obtenerCalendario } = require("../service/CalendarService");

class Calendario {
  constructor(router) {
    router.get("/calendario", this.obtenerInformacionCalendario.bind(this));
  }

  async obtenerInformacionCalendario(req, res) {
    try {
      const data = await obtenerCalendario();
      res.status(200).json(data);
    } catch (e) {
      res.status(e.statusCode || 500).json({ ok: false, message: e.message });
    }
  }
}

module.exports = Calendario;
