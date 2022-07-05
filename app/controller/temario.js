const ModelTemario = require('./../model/temario');

class Temario {
    constructor(router) {
        router.get('/', this.obtenerTemario);
    }

    async obtenerTemario(req, res) {
        res.send(await ModelTemario.findAll());
    }

}

module.exports = Temario;
