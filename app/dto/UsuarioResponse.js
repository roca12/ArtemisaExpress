/**
 * DTO de respuesta con los datos públicos de un usuario.
 */
class UsuarioResponse {
  constructor(body) {
    this.usuario = body.usuario;
    this.correo = body.correo;
    this.role = body.role;
  }
}
module.exports = UsuarioResponse;
