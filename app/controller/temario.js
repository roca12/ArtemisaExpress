const TemarioService = require("../service/TemarioService");

/**
 * Controlador para las rutas relacionadas con el temario.
 */
class Temario {
  constructor(router) {
    this.service = new TemarioService();
    router.get("/temario", this.obtenerTemario.bind(this));
    router.get("/temario/supergrupos", this.obtenerSupergrupos.bind(this));
  }

  /**
   * Obtiene todos los temarios.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async obtenerTemario(req, res) {
    try {
      const temario = await this.service.obtenerTemario();
      res.status(200).json(temario);
    } catch (err) {
      res.status(err.statusCode || 500).json({ ok: false, message: err.message });
    }
  }

  /**
   * Obtiene todos los supergrupos del temario.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async obtenerSupergrupos(req, res) {
    try {
      const supergrupos = await this.service.obtenerSupergrupos();
      res.status(200).json(supergrupos);
    } catch (err) {
      res.status(err.statusCode || 500).json({ ok: false, message: err.message });
    }
  }
}

module.exports = Temario;
