const ModelTemario = require("./../model/temario");

/**
 * Controlador para las rutas relacionadas con el temario.
 */
class Temario {
  constructor(router) {
    router.get("/temario", this.obtenerTemario.bind(this));
    router.get("/temario/supergrupos", this.obtenerSupergrupos.bind(this));
  }

  /**
   * Obtiene todos los temarios.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async obtenerTemario(req, res) {
    res.send(await ModelTemario.findAll());
  }

  /**
   * Obtiene todos los supergrupos del temario.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async obtenerSupergrupos(req, res) {
    res.send(await ModelTemario.supergrupos());
  }
}

module.exports = Temario;
