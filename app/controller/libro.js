const LibroService = require("../service/LibroService");
const LibroResponse = require("../dto/LibroResponse");
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
   * @openapi
   * /libro/:
   *   get:
   *     tags: [Libro]
   *     summary: Obtiene todos los libros
   *     responses:
   *       200:
   *         description: Lista de libros
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id: { type: string }
   *                   titulo: { type: string, example: Introducción a los Algoritmos }
   *                   archivoPdf: { type: string, example: https://res.cloudinary.com/... }
   *                   imagen: { type: string, example: https://res.cloudinary.com/... }
   *       500:
   *         description: Error interno del servidor
   */
  async obtenerLibros(req, res) {
    try {
      const libros = await this.service.obtenerLibros();
      res.status(200).json(libros.map((l) => new LibroResponse(l)));
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }

  /**
   * @openapi
   * /libro/crear:
   *   post:
   *     tags: [Libro]
   *     summary: Crea un nuevo libro
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [titulo]
   *             properties:
   *               titulo: { type: string, example: Introducción a los Algoritmos }
   *               archivoPdf: { type: string, example: https://url-del-pdf.com/archivo.pdf }
   *               imagen: { type: string, example: https://url-de-imagen.com/portada.jpg }
   *     responses:
   *       200:
   *         description: Libro creado exitosamente
   *       500:
   *         description: Error interno del servidor
   */
  async crearLibro(req, res) {
    try {
      const { titulo, archivoPdf, imagen } = req.body;
      const libro = await this.service.crearLibro({
        titulo,
        archivoPdf,
        imagen,
      });
      res.status(200).json(new LibroResponse(libro));
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }

  /**
   * @openapi
   * /libro/{id}:
   *   put:
   *     tags: [Libro]
   *     summary: Actualiza un libro (sube archivos a Cloudinary)
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *         description: ID del libro a actualizar
   *     requestBody:
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               titulo: { type: string }
   *               archivoPdf: { type: string, format: binary }
   *               imagen: { type: string, format: binary }
   *     responses:
   *       200:
   *         description: Libro actualizado exitosamente
   *       500:
   *         description: Error interno del servidor
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
      res.status(200).json(libro ? new LibroResponse(libro) : libro);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }

  /**
   * @openapi
   * /libro/{id}:
   *   delete:
   *     tags: [Libro]
   *     summary: Elimina un libro por ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *         description: ID del libro a eliminar
   *     responses:
   *       200:
   *         description: Libro eliminado exitosamente
   *       500:
   *         description: Error interno del servidor
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
