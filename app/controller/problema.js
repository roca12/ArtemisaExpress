const ProblemaService = require("../service/ProblemaService");
const CrearProblemaRequest = require("../dto/CrearProblemaRequest");
const ActualizarProblemaRequest = require("../dto/ActualizarProblemaRequest");
const ProblemaResponse = require("../dto/ProblemaResponse");

const verificarToken = require("../middleware/auth");
const authorize = require("../middleware/authorize");

/**
 * Controlador para las rutas relacionadas con los problemas.
 */
class Problema {
  constructor(router) {
    this.service = new ProblemaService();

    router.get("/problema/", this.obtenerProblemas.bind(this));
    router.get("/problema/:id", this.obtenerProblema.bind(this));

    router.post(
      "/problema/crear",
      verificarToken,
      authorize("admin"),
      this.crearProblema.bind(this),
    );
    router.put(
      "/problema/:id",
      verificarToken,
      authorize("admin"),
      this.actualizarProblema.bind(this),
    );
    router.delete(
      "/problema/:id",
      verificarToken,
      authorize("admin"),
      this.eliminarProblema.bind(this),
    );
  }

  /**
   * @openapi
   * /problema/:
   *   get:
   *     tags: [Problema]
   *     summary: Obtiene todos los problemas de programación
   *     responses:
   *       200:
   *         description: Lista de problemas
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id: { type: string }
   *                   titulo: { type: string, example: Two Sum }
   *                   juez: { type: string, example: LeetCode }
   *                   alias: { type: number, example: 1 }
   *                   dificultad: { type: number, example: 1 }
   *                   url: { type: string, example: https://leetcode.com/problems/two-sum }
   *       500:
   *         description: Error interno del servidor
   */
  async obtenerProblemas(req, res) {
    try {
      const problemas = await this.service.obtenerProblemas();
      res.status(200).json(problemas);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }

  /**
   * @openapi
   * /problema/crear:
   *   post:
   *     tags: [Problema]
   *     summary: Crea un nuevo problema de programación
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [titulo, juez, dificultad, url]
   *             properties:
   *               titulo: { type: string, example: Two Sum }
   *               juez: { type: string, example: LeetCode }
   *               alias: { type: number, example: 1 }
   *               dificultad: { type: number, example: 1 }
   *               tema_1: { type: string, example: Arrays }
   *               tema_2: { type: string, example: Hash Table }
   *               tema_3: { type: string }
   *               tema_4: { type: string }
   *               url: { type: string, example: https://leetcode.com/problems/two-sum }
   *     responses:
   *       200:
   *         description: Problema creado exitosamente
   *       500:
   *         description: Error interno del servidor
   */
  async crearProblema(req, res) {
    try {
      const {
        titulo,
        juez,
        alias,
        dificultad,
        tema_1,
        tema_2,
        tema_3,
        tema_4,
        url,
      } = req.body;
      const problema = await this.service.crearProblema({
        titulo,
        juez,
        alias,
        dificultad,
        tema_1,
        tema_2,
        tema_3,
        tema_4,
        url,
      });
      res.status(200).json(problema);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }

  /**
   * @openapi
   * /problema/{id}:
   *   put:
   *     tags: [Problema]
   *     summary: Actualiza un problema existente
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *         description: ID del problema a actualizar
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               titulo: { type: string }
   *               juez: { type: string }
   *               alias: { type: number }
   *               dificultad: { type: number }
   *               tema_1: { type: string }
   *               tema_2: { type: string }
   *               tema_3: { type: string }
   *               tema_4: { type: string }
   *               url: { type: string }
   *     responses:
   *       200:
   *         description: Problema actualizado exitosamente
   *       500:
   *         description: Error interno del servidor
   */
  async actualizarProblema(req, res) {
    try {
      const { id } = req.params;
      const {
        titulo,
        juez,
        alias,
        dificultad,
        tema_1,
        tema_2,
        tema_3,
        tema_4,
        url,
      } = req.body;
      const problema = await this.service.actualizarProblema(id, {
        titulo,
        juez,
        alias,
        dificultad,
        tema_1,
        tema_2,
        tema_3,
        tema_4,
        url,
      });
      res.status(200).json(problema);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }

  /**
   * @openapi
   * /problema/{id}:
   *   delete:
   *     tags: [Problema]
   *     summary: Elimina un problema por ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *         description: ID del problema a eliminar
   *     responses:
   *       200:
   *         description: Problema eliminado exitosamente
   *       500:
   *         description: Error interno del servidor
   */
  async eliminarProblema(req, res) {
    try {
      const { id } = req.params;
      await this.service.eliminarProblema(id);
      res
        .status(200)
        .json({ ok: true, message: "Problema eliminado exitosamente." });
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }

  /**
   * @openapi
   * /problema/{id}:
   *   get:
   *     tags: [Problema]
   *     summary: Obtiene un problema por ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del problema
   *     responses:
   *       200:
   *         description: Problema encontrado
   *       404:
   *         description: Problema no encontrado
   *       500:
   *         description: Error interno del servidor
   */
  async obtenerProblema(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ ok: false, message: "El id es obligatorio" });
      }
      const problema = await this.service.obtenerProblema(id);
      if (!problema) {
        return res
          .status(404)
          .json({ ok: false, message: "Problema no encontrado" });
      }
      res.status(200).json(problema);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ ok: false, message: err.message });
    }
  }
}

module.exports = Problema;
