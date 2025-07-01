const ModelUsuario = require("./../model/usuario");

class Usuario {
  constructor(router) {
    router.post("/usuario/crear", this.crearUsuario.bind(this));
    router.post("/usuario/autenticar", this.autenticarUsuario.bind(this));
    router.get("/usuario/acceso/:codPerfil", this.obtenerAccesosPorPerfil.bind(this));
    router.post("/usuario/autenticar/captcha", this.autenticarCaptcha.bind(this));
  }

  async crearUsuario(req, res) {
    const usuario = req.body;
    res.send(await ModelUsuario.crearUsuario(usuario));
  }


  async autenticarCaptcha(req, res) {
    const { token } = req.body;
    res.send(await ModelUsuario.autenticarToken(token));
  }

  async autenticarUsuario(req, res) {
    const { user, password } = req.body;
    res.send(await ModelUsuario.autenticarUsuario({ user, password }));
  }

  async obtenerAccesosPorPerfil(req, res) {
    const perfil = +req.params["codPerfil"];
    res.send(await ModelUsuario.obtenerAccesosPorPerfil(perfil));
  }
}

module.exports = Usuario;
