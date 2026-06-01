export class RegisterRequest {
  constructor(body) {
    this.usuario = body.usuario;
    this.correo = body.correo;
    this.contrasenia = body.contrasenia;
    this.verificacion = body.verificacion;
  }
  validate() {
    const errors = [];
    if (!this.usuario) errors.push("El usuario es requerido.");
    if (!this.correo) errors.push("El correo es requerido.");
    if (!this.contrasenia) errors.push("La contraseña es requerida.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.correo && !this.correo.match(emailRegex))
      errors.push("El correo no es válido.");
    return errors;
  }
  toModel() {
    return {
      contrasenia: this.contrasenia,
      rol: "estudiante",
      usuario: this.usuario,
      correo: this.correo,
      verification: this.verificacion,
    };
  }
}
