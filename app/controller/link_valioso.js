const LinkValiosoService = require("../service/LinkValiosoService");
const CrearLinkValiosoRequest = require("../dto/CrearLinkValiosoRequest");
const ActualizarLinkValiosoRequest = require("../dto/ActualizarLinkValiosoRequest");
const LinkValiosoResponse = require("../dto/LinkValiosoResponse");

const verificarToken = require("../middleware/auth");
const authorize = require("../middleware/authorize");

/**
 * Controlador para las rutas relacionadas con los links valiosos.
 */
class LinkValiosoController {
  constructor(router) {
  this.service = new LinkValiosoService();
  
  router.get("/link-valioso/", this.obtenerLinksValiosos.bind(this));
  router.get("/link-valioso/:id", this.obtenerLinkValioso.bind(this));

  router.post("/link-valioso/crear", verificarToken, authorize("admin"), this.crearLinkValioso.bind(this));
  router.put("/link-valioso/:id", verificarToken, authorize("admin"), this.actualizarLinkValioso.bind(this));
  router.delete("/link-valioso/:id", verificarToken, authorize("admin"), this.eliminarLinkValioso.bind(this));
}

  /**
   * @openapi
   * /link-valioso/:
   *   get:
   *     tags: [Link Valioso]
   *     summary: Obtiene todos los links valiosos
   *     responses:
   *       200:
   *         description: Lista de links valiosos
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id: { type: string }
   *                   nombre: { type: string, example: VisuAlgo }
   *                   url: { type: string, example: https://visualgo.net }
   *                   tags: { type: string, example: algoritmos,visualización }
   *                   icono: { type: string, example: chart-bar }
   *       500:
   *         description: Error interno del servidor
   */
  async obtenerLinksValiosos(req, res) {
    try {
      const links = await this.service.obtenerLinksValiosos();
      res.status(200).json(links);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }
  /**
   * @openapi
   * /link-valioso/crear:
   *   post:
   *     tags: [Link Valioso]
   *     summary: Crea un nuevo link valioso
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [nombre, url, tags, icono]
   *             properties:
   *               nombre: { type: string, example: VisuAlgo }
   *               url: { type: string, example: https://visualgo.net }
   *               tags: { type: string, example: algoritmos,visualización }
   *               icono: { type: string, example: chart-bar }
   *     responses:
   *       201:
   *         description: Link creado exitosamente
   *       500:
   *         description: Error interno del servidor
   */
  async crearLinkValioso(req, res) {
    try {
      const { nombre, url, tags, icono } = req.body;
      const link = await this.service.crearLinkValioso({
        nombre,
        url,
        tags,
        icono,
      });
      res.status(201).json(link);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }
  /**
   * @openapi
   * /link-valioso/{id}:
   *   put:
   *     tags: [Link Valioso]
   *     summary: Actualiza un link valioso existente
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *         description: ID del link a actualizar
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [nombre, icono]
   *             properties:
   *               nombre: { type: string }
   *               url: { type: string }
   *               tags: { type: string }
   *               icono: { type: string }
   *     responses:
   *       200:
   *         description: Link actualizado exitosamente
   *       500:
   *         description: Error interno del servidor
   */
  async actualizarLinkValioso(req, res) {
    try {
      const { id } = req.params;
      const { nombre, url, tags, icono } = req.body;
      const link = await this.service.actualizarLinkValioso(id, {
        nombre,
        url,
        tags,
        icono,
      });
      res.status(200).json(link);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }
  /**
   * @openapi
   * /link-valioso/{id}:
   *   delete:
   *     tags: [Link Valioso]
   *     summary: Elimina un link valioso por ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *         description: ID del link a eliminar
   *     responses:
   *       200:
   *         description: Link eliminado exitosamente
   *       500:
   *         description: Error interno del servidor
   */
  async eliminarLinkValioso(req, res) {
    try {
      const { id } = req.params;
      await this.service.eliminarLinkValioso(id);
      res
        .status(200)
        .json({ ok: true, message: "Link eliminado exitosamente" });
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }

   /**
   * Obtiene un link valioso por su ID.
   * @param {string} id - Identificador del link valioso.
   * @returns {Promise<Object|null>} Link encontrado o null si no existe.
   */
  async obtenerLinkValioso(id) {
  if (!id) throw new Error("El id es obligatorio");
  return await this.model.findOne(id);
  }

}

module.exports = LinkValiosoController;
