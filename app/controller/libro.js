const LibroService = require("../service/LibroService");
const upload = require("../config/cloudinary");

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

  async obtenerLibros(req, res) {
    res.send(await ModelLibro.findAll());
  }

  async crearLibro(req, res) {
    const libro = req.body;
    res.send(await ModelLibro.createbook(libro));
  }

  async actualizarLibro(req, res) {
    try {
      const { id } = req.params;
      const { titulo } = req.body;
      const archivoPdf = req.files?.["archivoPdf"]?.[0]?.path;
      const imagen = req.files?.["imagen"]?.[0]?.path;
      const libro = await this.service.actualizarLibro(id, {
        titulo,
        archivoPdf,
        imagen,
      });
      res.status(200).json(libro);
    } catch (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({
          ok: false,
          message: "El archivo supera los 10MB permitidos",
        });
      }
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }

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
