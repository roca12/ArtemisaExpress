class LoginRequest {
  constructor(body) {
    this.usuario = body.usuario;
    this.contrasenia = body.contrasenia;
  }

  validate() {
    const errors = [];
    if (!this.usuario) errors.push("El usuario es requerido.");
    if (!this.contrasenia) errors.push("La contraseña es requerida.");
    return errors;
  }
}

module.exports = LoginRequest;
