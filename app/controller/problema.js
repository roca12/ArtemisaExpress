const ProblemaService = require("../service/ProblemaService");

/**
 * Controlador para las rutas relacionadas con los problemas.
 */
class Problema {
  constructor(router) {
    this.service = new ProblemaService();
    router.get("/problema/", this.obtenerProblemas.bind(this));
    router.post("/problema/crear", this.crearProblema.bind(this));
    router.put("/problema/:id", this.actualizarProblema.bind(this));
    router.delete("/problema/:id", this.eliminarProblema.bind(this));
  }

  /**
   * Obtiene todos los problemas.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async obtenerProblemas(req, res) {
    try{
      const problemas = await this.service.obtenerProblemas();
      res.status(200).json(problemas);
    }catch(err){
      res.status(err.statusCode || 500).json({ok:false, message:err.message});
    }
  }

  /**
   * Crea un nuevo problema.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async crearProblema(req, res) {
    try{
      const {titulo, juez, alias, dificultad, tema_1, tema_2, tema_3, tema_4, url} = req.body;
      const problema = await this.service.crearProblema(
          {
            titulo,
            juez,
            alias,
            dificultad,
            tema_1,
            tema_2,
            tema_3,
            tema_4,
            url
          });
      res.status(200).json(problema);
    }catch(err){
      res.status(err.statusCode || 500).json({ok:false, message:err.message});
    }
  }

  /**
   * Actualiza un problema ya existente.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   */
  async actualizarProblema(req, res) {
    try{
      const {id} = req.params.id;
      const {titulo, juez, alias, dificultad, tema_1, tema_2, tema_3, tema_4, url} = req.body;
      const problema = await this.service.actualizarProblema(
          id,
          {
            titulo,
            juez,
            alias,
            dificultad,
            tema_1,
            tema_2,
            tema_3,
            tema_4,
            url
          });
      res.status(200).json(problema);
    }catch(err){
      res.status(err.statusCode || 500).json({ok:false, message:err.message});
    }
  }

  async eliminarProblema(req, res) {
    try{
      const {id} = req.params;
      await this.service.eliminarProblema(id);
      res.status(200).json({ok:true, message: "Problema eliminado exitosamente."});
    }catch(err){
      res.status(err.statusCode || 500).json({ok:false, message:err.message});
    }
  }
}

module.exports = Problema;
