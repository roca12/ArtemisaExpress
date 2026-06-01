const LinkValiosoService = require("../service/LinkValiosoService");

/**
 * Controlador para las rutas relacionadas con los links valiosos.
 */
class LinkValiosoController {
  constructor(router) {
    this.service = new LinkValiosoService();
    router.get("/link-valioso/", this.obtenerLinksValiosos.bind(this));
    router.post("/link-valioso/crear", this.crearLinkValioso.bind(this));
    router.put("/link-valioso/:id", this.actualizarLinkValioso.bind(this));
    router.delete("/link-valioso/:id", this.eliminarLinkValioso.bind(this));
  }

  /**
   * Obtiene todos los links valiosos.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
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
   * Crea un nuevo link valioso.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
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
   * Actualiza un link valioso existente por ID.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
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
   * Elimina un link valioso por ID.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
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
}

module.exports = LinkValiosoController;
