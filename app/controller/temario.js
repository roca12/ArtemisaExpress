const TemarioService = require("../service/TemarioService");
const CrearTemarioRequest = require("../dto/CrearTemarioRequest");
const ActualizarTemarioRequest = require("../dto/ActualizarTemarioRequest");
const TemarioResponse = require("../dto/TemarioResponse");

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
      res.status(200).json(temario.map((t) => new TemarioResponse(t)));
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
  /**
   * @openapi
   * /temario/crear:
   *   post:
   *     tags: [Temario]
   *     summary: Crea un nuevo tema (requiere rol admin)
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [supergrupo, tema]
   *             properties:
   *               supergrupo: { type: string, example: Estructuras de Datos }
   *               tema: { type: string, example: Arreglos }
   *               texto: { type: string }
   *               complejidad_tiempo: { type: string, example: O(n) }
   *               java: { type: string }
   *               cpp: { type: string }
   *               py: { type: string }
   *               orden: { type: number, example: 1 }
   *               suborden: { type: number, example: 1 }
   *     responses:
   *       201:
   *         description: Temario creado exitosamente
   *       401:
   *         description: No autenticado
   *       403:
   *         description: No autorizado (se requiere rol admin)
   *       500:
   *         description: Error interno del servidor
   */
  async crearTemario(req, res){
    try{
      const dto = new CrearTemarioRequest(req.body);
      const temario = await this.service.crearTemario(dto);
      res.status(201).json({ok:true,message:"Temario creado exitosamente", temario: new TemarioResponse(temario)});
    }catch(err){
      res.status(err.statusCode || 500).json({ok:false,message:err.message});
    }
  }

  /**
   * @openapi
   * /temario/{id}:
   *   get:
   *     tags: [Temario]
   *     summary: Obtiene un tema por su ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *         description: ID del tema
   *     responses:
   *       200:
   *         description: Tema encontrado
   *       400:
   *         description: El id es requerido
   *       500:
   *         description: Error interno del servidor
   */
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
      return res
        .status(200)
        .json(temario ? new TemarioResponse(temario) : temario);
    } catch (err) {
      return res.status(500).json({ ok: false, message: err.message });
    }
  }

  /**
   * @openapi
   * /temario/{id}:
   *   put:
   *     tags: [Temario]
   *     summary: Actualiza un tema existente (requiere rol admin)
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *         description: ID del tema a actualizar
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               supergrupo: { type: string }
   *               tema: { type: string }
   *               texto: { type: string }
   *               complejidad_tiempo: { type: string }
   *               java: { type: string }
   *               cpp: { type: string }
   *               py: { type: string }
   *               orden: { type: number }
   *               suborden: { type: number }
   *               fecha_modificacion: { type: string }
   *     responses:
   *       200:
   *         description: Temario actualizado correctamente
   *       400:
   *         description: El id es requerido
   *       401:
   *         description: No autenticado
   *       403:
   *         description: No autorizado (se requiere rol admin)
   *       500:
   *         description: Error interno del servidor
   */
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
        ok: true, message: "Temario actualizado correctamente", temario: resultado ? new TemarioResponse(resultado) : resultado });
    } catch (err) {
      return res.status(500).json({ ok: false, message: err.message });
    }
  }

  /**
   * @openapi
   * /temario/{id}:
   *   delete:
   *     tags: [Temario]
   *     summary: Elimina un tema por ID (requiere rol admin)
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *         description: ID del tema a eliminar
   *     responses:
   *       200:
   *         description: Temario eliminado correctamente
   *       401:
   *         description: No autenticado
   *       403:
   *         description: No autorizado (se requiere rol admin)
   *       500:
   *         description: Error interno del servidor
   */
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
