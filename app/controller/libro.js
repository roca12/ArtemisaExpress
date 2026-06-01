const LibroService = require("../service/LibroService");
const upload = require("../config/cloudinary");

/**
 * Controlador para las rutas relacionadas con los libros.
 */
class LibroController {
  constructor(router) {
    this.service = new LibroService();
    router.get("/libro/", this.obtenerLibros.bind(this));
    router.post("/libro/crear", this.crearLibro.bind(this));
    router.put(
      "/libro/:id",
      upload.fields([{ name: "archivoPdf" }, { name: "imagen" }]),
      this.actualizarLibro.bind(this),
    );
    router.delete("/libro/:id", this.eliminarLibro.bind(this));
  }

  /**
   * Retrieves all books.
   * @param {import('express').Request} req - Express request object.
   * @param {import('express').Response} res - Express response object.
   */
  /**
   * Obtiene todos los libros.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async obtenerLibros(req, res) {
    try {
      const libros = await this.service.obtenerLibros();
      res.status(200).json(libros);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }

  /**
   * Crea un nuevo libro.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async crearLibro(req, res) {
    try {
      const { titulo, archivoPdf, imagen } = req.body;
      const libro = await this.service.crearLibro({
        titulo,
        archivoPdf,
        imagen,
      });
      res.status(200).json(libro);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }

  /**
   * Actualiza un libro existente por ID.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async actualizarLibro(req, res) {
    try {
      const { id } = req.params;
      const { titulo } = req.body;
      const archivoPdf = req.files?.archivoPdf?.[0]?.path;
      const imagen = req.files?.imagen?.[0]?.path;
      const libro = await this.service.actualizarLibro(id, {
        titulo,
        archivoPdf,
        imagen,
      });
      res.status(200).json(libro);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }

  /**
   * Elimina un libro por ID.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async eliminarLibro(req, res) {
    try {
      const { id } = req.params;
      await this.service.eliminarLibro(id);
      res
        .status(200)
        .json({ ok: true, message: "Archvio eliminado exitosamente." });
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }
}

module.exports = LibroController;
