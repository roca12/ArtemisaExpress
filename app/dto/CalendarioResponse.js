/**
 * @fileoverview DTO de respuesta del calendario con sus eventos agrupados.
 */
const CalendarioEventResponse = require("./CalendarioEventResponse");
/**
 * DTO de respuesta del calendario con sus eventos agrupados por calendario.
 */
class CalendarioResponse {
  constructor(calendarios) {
    this.calendarios = calendarios.map((cal) => ({
      titulo: cal.summary,
      eventos: (cal.items || []).map(
        (item) => new CalendarioEventResponse(item),
      ),
    }));
  }
}

module.exports = CalendarioResponse;
