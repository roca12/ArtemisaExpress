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
   * @openapi
   * /temario:
   *   get:
   *     tags: [Temario]
   *     summary: Obtiene todos los temas del temario
   *     responses:
   *       200:
   *         description: Lista de temas
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   supergrupo: { type: string, example: Estructuras de Datos }
   *                   tema: { type: string, example: Arreglos }
   *                   texto: { type: string }
   *                   complejidad_tiempo: { type: string, example: O(n) }
   *                   orden: { type: number }
   *       500:
   *         description: Error interno del servidor
   */
  async obtenerTemario(req, res) {
    try {
      const temario = await this.service.obtenerTemario();
      res.status(200).json(temario);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }

  /**
   * @openapi
   * /temario/supergrupos:
   *   get:
   *     tags: [Temario]
   *     summary: Obtiene la lista de supergrupos del temario
   *     responses:
   *       200:
   *         description: Lista de supergrupos
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: string
   *               example: [Estructuras de Datos, Grafos, Programación Dinámica]
   *       500:
   *         description: Error interno del servidor
   */
  async obtenerSupergrupos(req, res) {
    try {
      const supergrupos = await this.service.obtenerSupergrupos();
      res.status(200).json(supergrupos);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }
}

module.exports = Temario;
