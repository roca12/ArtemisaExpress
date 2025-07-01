const ModelLinkValioso = require("./../model/link_valioso");

class LinkValioso {
  constructor(router) {
    router.get("/link-valioso/", this.obtenerLinksValiosos.bind(this));
  }

  async obtenerLinksValiosos(req, res) {
    res.send(await ModelLinkValioso.findAll());
  }
}

module.exports = LinkValioso;
