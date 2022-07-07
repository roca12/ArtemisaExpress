const ModelUsuario = require('./../model/usuario');

class Usuario {
    constructor(router) {
        router.post('/usuario/crear', this.crearUsuario);
        router.post('/usuario/autenticar', this.autenticarUsuario)
    }

    async crearUsuario(req, res) {
        const usuario = req.body;
        res.send(await ModelUsuario.crearUsuario(usuario));
    }

    async autenticarUsuario(req, res) {
        const {user, password} = req.body;
        res.send(await ModelUsuario.autenticarUsuario({user, password}));
    }
}

module.exports = Usuario;
