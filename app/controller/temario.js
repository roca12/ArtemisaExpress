const TemarioService = require("../service/TemarioService");
const CrearTemarioRequest = require("../dto/CrearTemarioRequest");
const ActualizarTemarioRequest = require("../dto/ActualizarTemarioRequest");

const verificarToken = require("../middleware/auth");
const authorize = require("../middleware/authorize");

/**
 * Controlador para las rutas relacionadas con el temario.
 */
class Temario {
  constructor(router) {
  this.service = new TemarioService();

  router.get("/temario", this.obtenerTemario.bind(this));
  router.get("/temario/supergrupos", this.obtenerSupergrupos.bind(this));
  router.get("/temario/:id", this.obtenerPorId.bind(this));

  router.post("/temario/crear", verificarToken, authorize("admin"), this.crearTemario.bind(this));
  router.put("/temario/:id", verificarToken, authorize("admin"), this.actualizarTemario.bind(this));
  router.delete( "/temario/:id", verificarToken, authorize("admin"), this.eliminarTemario.bind(this));
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
  async crearTemario(req, res){
    try{
      const dto = new CrearTemarioRequest(req.body);
      const temario = await this.service.crearTemario(dto);
      res.status(201).json({ok:true,message:"Temario creado exitosamente", temario:temario});
    }catch(err){
      res.status(err.statusCode || 500).json({ok:false,message:err.message});
    }
  }

   
  async obtenerPorId(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "El id es requerido",
      });
    }
    try {
      const temario = await this.service.obtenerPorId(id);
      return res.status(200).json(temario);
    } catch (err) {
      return res.status(500).json({ ok: false, message: err.message });
    }
  }

  async actualizarTemario(req, res) {
    const { id } = req.params;
    const request = new ActualizarTemarioRequest(req.body);
    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "El id es requerido",
      });
    }
    try {
      const data = {
        supergrupo: request.supergrupo,
        tema: request.tema,
        texto: request.texto,
        complejidad_tiempo: request.complejidad_tiempo,
        java: request.java,
        cpp: request.cpp,
        py: request.py,
        orden: request.orden,
        suborden: request.suborden,
        fecha_modificacion: request.fecha_modificacion,
      };
      const resultado = await this.service.actualizarTemario(id, data);

      return res.status(200).json({
        ok: true, message: "Temario actualizado correctamente", temario: resultado });
    } catch (err) {
      return res.status(500).json({ ok: false, message: err.message });
    }
  }

  async eliminarTemario(req, res) {
  try {
    const { id } = req.params;

    await this.service.eliminarTemario(id);

    res.status(200).json({ok: true, message: "Temario eliminado correctamente"});
  } catch (err) {
    res.status(err.statusCode || 500).json({ok: false,message: err.message });
  }
}

}

module.exports = Temario;
