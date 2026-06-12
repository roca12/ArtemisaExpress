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

    /**
     * Obtiene el encabezado Authorization enviado por el cliente.
     */
    const authHeader = req.headers.authorization;

    /**
     * Verifica que el encabezado exista.
     */
    if (!authHeader) {
      return res.status(401).json({
        ok: false,
        message: "Token requerido",
      });
    }

    /**
     * Divide el contenido del encabezado usando el espacio
     * como separador.
     */
    const partes = authHeader.split(" ");

    /**
     * Verifica que el formato sea exactamente:
     * Authorization: Bearer <token>
     *
     * Si el formato no es correcto, la petición es rechazada.
     */
    if (partes.length !== 2 || partes[0] !== "Bearer") {
      return res.status(401).json({
        ok: false,
        message: "Formato de token inválido",
      });
    }

    /**
     * Extrae únicamente el JWT.
     */
    const token = partes[1];

    /**
     * Verifica la firma del JWT utilizando la clave secreta
     * configurada en las variables de entorno, validando que el 
     * token no fuera modificadado, que fuese firmado con la clave 
     * correcta y que este no este expirado.
     *
     */
    const payload = jwt.verify(
      token,
      process.env.JWT_KEY
    );

    /**
     * Guarda la información contenida en el token
     * dentro del objeto request.
     *
     */
    req.usuario = payload;

    next();

  } catch (error) {

    /**
     * Si ocurre cualquier error durante la validación
     * del JWT, se responde con estado 401.
     */
    return res.status(401).json({
      ok: false,
      message: "Token inválido o expirado",
    });
  }
}

module.exports = verificarToken;