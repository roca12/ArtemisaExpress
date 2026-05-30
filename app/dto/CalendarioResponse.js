class CalendarioResponse {
    constructor(calendarios) {
        this.calendarios = calendarios.map(cal => ({
            titulo: cal.summary,
            eventos: (cal.items || []).map(item => new CalendarioEventoResponse(item))
        }));
    }
}
const CalendarioEventResponse = require("./CalendarioResponse")
module.exports = CalendarioResponse;