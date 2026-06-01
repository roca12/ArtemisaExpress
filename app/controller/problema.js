const ModelProblema = require("./../model/problema");

/**
 * Controlador para las rutas relacionadas con los problemas.
 */
class Problema {
  constructor(router) {
    router.get("/problema/", this.obtenerProblemas.bind(this));
    router.post("/problema/crear", this.crearProblema.bind(this));
  }

  /**
   * Obtiene todos los problemas.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async obtenerProblemas(req, res) {
    res.send(await ModelProblema.findAll());
  }

  /**
   * Crea un nuevo problema.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async crearProblema(req, res) {
    const problema = req.body;
    res.send(await ModelProblema.crearProblema(problema));
  }
}

module.exports = Problema;
