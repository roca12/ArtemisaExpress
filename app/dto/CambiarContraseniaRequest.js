/**
 * DTO para la solicitud de cambio de contraseña.
 */
class CambiarContraseniaRequest {
  constructor(body) {
    this.nombreDeUsuario = body.nombreDeUsuario;
    this.nuevaContrasenia = body.nuevaContrasenia;
  }

  /**
   * Valida los campos del DTO.
   * @returns {string[]} Lista de mensajes de error.
   */
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
