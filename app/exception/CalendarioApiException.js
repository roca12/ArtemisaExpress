/**
 * Excepción lanzada cuando falla la consulta a la API de Google Calendar.
 * Retorna HTTP 502.
 */
class CalendarioApiException extends Error {
  constructor(message = "Error al obtener datos del calendario") {
    super(message);
    this.name = "CalendarioApiException";
    this.statusCode = 502;
  }
}
module.exports = CalendarioApiException;
