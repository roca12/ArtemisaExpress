const ModelUsuario = require("./../model/usuario");

class Usuario {
  constructor(router) {
    router.post("/usuario/crear", this.crearUsuario);
    router.post("/usuario/autenticar", this.autenticarUsuario);
    router.get("/usuario/acceso/:codPerfil", this.obtenerAccesosPorPerfil);
    router.post("/usuario/autenticar/captcha", this.autenticarCaptcha);
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
