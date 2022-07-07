const modelLinkValioso = require('./../model/link_valioso');

class LinkValioso {
    constructor(router) {
        router.get('/link-valioso/', this.obtenerLinksValiosos);
    }

    async obtenerLinksValiosos(req, res) {
        res.send(await modelLinkValioso.findAll());
    }
}

module.exports = LinkValioso;
