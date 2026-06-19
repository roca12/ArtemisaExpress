/**
 * Middleware de autorización basado en roles.
 *
 * Permite restringir el acceso a una endpoint según el rol
 * del usuario autenticado.
 *
 */
function authorize(rolPermitido) {
  /**
   * Verifica que el usuario autenticado tenga el rol permitido.
   *
   * Debe ejecutarse después de un middleware de autenticación que
   * haya poblado `req.usuario` (p. ej. `verificarToken`).
   *
   * @param {import("express").Request} req - Petición HTTP; se espera `req.usuario` con la info del usuario.
   * @param {import("express").Response} res - Respuesta HTTP.
   * @param {import("express").NextFunction} next - Continúa con el siguiente middleware si la autorización es válida.
   * @returns {void|import("express").Response} Llama a `next()` si está autorizado; en caso contrario responde 401 o 403.
   */
  function verificarRol(req, res, next) {
    if (!req.usuario) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado",
      });
    }

    if (req.usuario.rol !== rolPermitido) {
      return res.status(403).json({
        ok: false,
        message: "No tiene permisos para realizar esta acción",
      });
    }

    return next();
  }

  return verificarRol;
}

module.exports = authorize;
