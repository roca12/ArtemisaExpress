/**
 * Middleware de autorización basado en roles.
 *
 * Permite restringir el acceso a una endpoint según el rol
 * del usuario autenticado.
 *
 */
function authorize(rolPermitido) {
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

    next();
  }

  return verificarRol;
}

module.exports = authorize;
