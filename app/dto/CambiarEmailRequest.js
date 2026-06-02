/**
 * DTO para la solicitud de cambio de correo electrónico.
 */
class CambiarEmailRequest {
  constructor(body) {
    this.nombreDeUsuario = body.nombreDeUsuario;
    this.correo = body.correo;
  }

  /**
   * Valida los campos del DTO.
   * @returns {string[]} Lista de mensajes de error.
   */
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
