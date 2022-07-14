const ModelLinkValioso = require('./../model/link_valioso');

class LinkValioso {
    constructor(router) {
        router.get('/link-valioso/', this.obtenerLinksValiosos);
    }

    async obtenerLinksValiosos(req, res) {
        res.send(await ModelLinkValioso.findAll());
    }
}

module.exports = LinkValioso;
