const ModelTemario = require("./../model/temario");

class Temario {
  constructor(router) {
    router.get("/temario", this.obtenerTemario.bind(this));
    router.get("/temario/supergrupos", this.obtenerSupergrupos.bind(this));
  }

  async obtenerTemario(req, res) {
    res.send(await ModelTemario.findAll());
  }

  async obtenerSupergrupos(req, res) {
    res.send(await ModelTemario.supergrupos());
  }


}

module.exports = Temario;
