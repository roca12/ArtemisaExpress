class CambiarContraseniaRequest {
  constructor(body) {
    this.nombreDeUsuario = body.nombreDeUsuario;
    this.nuevaContrasenia = body.nuevaContrasenia;
  }

  validate() {
    const errors = [];
    if (!this.nombreDeUsuario)
      errors.push("El nombre de usuario es requerido.");
    if (!this.nuevaContrasenia)
      errors.push("La nueva contraseña es requerida.");
    return errors;
  }
}

module.exports = CambiarContraseniaRequest;
