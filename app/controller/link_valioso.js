const LinkValiosoService = require("../service/LinkValiosoService");

class LinkValiosoController {
  constructor(router) {
    this.service = new LinkValiosoService();
    router.get("/link-valioso/", this.obtenerLinksValiosos.bind(this));
    router.post("/link-valioso/crear", this.crearLinkValioso.bind(this));
    router.put("/link-valioso/:id", this.actualizarLinkValioso.bind(this));
    router.delete("/link-valioso/:id", this.eliminarLinkValioso.bind(this));
  }

  async obtenerLinksValiosos(req, res) {
    try{
      const links = await this.service.obtenerLinksValiosos();
      res.status(200).json(links);
    }catch(err){
      res.status(err.statusCode || 500).json({ok:false, message: err.message});
    }
  }
  async crearLinkValioso(req, res) {
    try {
      const {nombre,url,tags,icono} = req.body;
      const link = await this.service.crearLinkValioso({nombre,url,tags,icono});
      res.status(201).json(link);
    }catch (err){
      res.status(err.statusCode || 500).json({ok:false, message: err.message});
    }
  }
  async actualizarLinkValioso(req, res) {
    try{
      const {id} = req.params;
      const {nombre,url,tags,icono} = req.body;
      const link = await this.service.actualizarLinkValioso(id, {nombre,url,tags,icono});
      res.status(200).json(link);
    }catch(err){
      res.status(err.statusCode || 500).json({ok:false, message: err.message});
    }
  }
  async eliminarLinkValioso(req, res) {
    try{
      const {id} = req.params;
      await this.service.eliminarLinkValioso(id);
      res.status(200).json({ok:true, message:"Link eliminado exitosamente"});
    }catch(err){
      res.status(err.statusCode || 500).json({ok:false, message: err.message});
    }
  }
}

module.exports = LinkValiosoController;
