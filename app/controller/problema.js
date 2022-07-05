const modelProblema = require('./../model/problema');

class Problema {
    constructor(router) {
        router.get('/', this.obtenerProblemas);
        router.post('/crear', this.crearProblema);
    }

    async obtenerProblemas(req, res) {
        res.send(await modelProblema.findAll());
    }

    async crearProblema(req, res) {
        const problema = req.body;
        res.send(await modelProblema.crearProblema(problema));
    }

}

module.exports = Problema;
