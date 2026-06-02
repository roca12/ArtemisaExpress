class CambiarEmailRequest {
  constructor(body) {
    this.nombreDeUsuario = body.nombreDeUsuario;
    this.correo = body.correo;
  }

  validate() {
    const errors = [];
    if (!this.nombreDeUsuario) errors.push("El nombre de usuario es requerido.");
    if (!this.correo) errors.push("El correo es requerido.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.correo && !emailRegex.test(this.correo))
      errors.push("El correo no es válido.");
    return errors;
  }
}

module.exports = CambiarEmailRequest;
