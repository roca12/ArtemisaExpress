const ModelProblema = require("./../model/problema");

class Problema {
  constructor(router) {
    router.get("/problema/", this.obtenerProblemas.bind(this));
    router.post("/problema/crear", this.crearProblema.bind(this));
  }

  async obtenerProblemas(req, res) {
    res.send(await ModelProblema.findAll());
  }

  async crearProblema(req, res) {
    const problema = req.body;
    res.send(await ModelProblema.crearProblema(problema));
  }
}

module.exports = Problema;
