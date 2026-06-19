const jwt = require("jsonwebtoken");

/**
 * Middleware de autenticación basado en JWT.
 *
 * Su función es verificar que la petición incluya un token válido
 * en el encabezado Authorization.
 *
 * Formato esperado:
 * Authorization: Bearer <token>
 *
 * Si el token es válido:
 * - Se decodifica su contenido.
 * - Se almacena la información del usuario en req.usuario.
 * - Se permite continuar con la ejecución de la ruta.
 *
 * Si el token no existe, tiene un formato incorrecto,
 * está expirado o fue alterado:
 * - Se responde con código HTTP 401 (Unauthorized).
 */
function verificarToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token)
      return res.status(401).json({
        ok: false,
        message: "Token no proporcionado",
      });
    const payload = jwt.verify(token, process.env.JWT_KEY, {
      algorithms: ["HS256"],
    });
    req.usuario = payload;
    return next();
  } catch {
    return res.status(401).json({
      ok: false,
      message: "Token inválido o expirado",
    });
  }
}

module.exports = verificarToken;
