const modelProblema = require('./../model/problema');

class Problema {
    constructor(router) {
        router.get('/problema/', this.obtenerProblemas);
        router.post('/problema/crear', this.crearProblema);
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
