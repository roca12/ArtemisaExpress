/**
 * DTO para la solicitud de registro de un nuevo usuario.
 */
export class RegisterRequest {
  constructor(body) {
    this.usuario = body.usuario;
    this.correo = body.correo;
    this.contrasenia = body.contrasenia;
    this.verificacion = body.verificacion;
  }
  /**
   * Valida los datos del registro.
   * @returns {string[]} Lista de errores encontrados. Vacía si todo es válido.
   */
  validate() {
    const errors = [];
    if (!this.usuario) errors.push("El usuario es requerido.");
    if (!this.correo) errors.push("El correo es requerido.");
    if (!this.contrasenia) errors.push("La contraseña es requerida.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.correo && !emailRegex.test(this.correo))
      errors.push("El correo no es válido.");
    return errors;
  }
  /**
   * Convierte el DTO al formato esperado por el modelo de usuario.
   * @returns {Object} Objeto listo para persistir.
   */
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
