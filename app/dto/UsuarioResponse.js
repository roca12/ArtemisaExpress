/**
 * DTO de respuesta con los datos públicos de un usuario.
 */
class UsuarioResponse {
  constructor(body) {
    this.usuario = body.usuario;
    this.correo = body.correo;
    this.rol = body.rol;
  }
}
module.exports = UsuarioResponse;
