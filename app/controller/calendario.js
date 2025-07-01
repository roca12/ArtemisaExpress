const ModelCalendario = require("./../model/calendario");

class Calendario {
  constructor(router) {
    router.get("/calendario", this.obtenerInformacionCalendario.bind(this));
  }

  async obtenerInformacionCalendario(req, res) {
    res.send(await ModelCalendario.obtenerFechasCalendario());
  }
}

module.exports = Calendario;
