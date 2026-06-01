const axios = require("axios");
const CalendarioResponse = require("../dto/CalendarioResponse");
const CalendarioApiException = require("../exception/CalendarioApiException");

/**
 * Servicio para la consulta de eventos del calendario de Google.
 */
class CalendarioService {
  constructor() {
    this.listCalendars = process.env.LIST_CALENDAR?.toString().split(",") || [];
  }

  /**
   * Obtiene los eventos de todos los calendarios configurados en un rango de ±3 meses.
   * @returns {Promise<CalendarioResponse>} Respuesta con los calendarios y sus eventos.
   */
  async obtenerCalendario() {
    try {
      const date = new Date();
      const data = await Promise.all(
        this.listCalendars.map(async (e) => {
          const timeMin = new Date(
            new Date().setMonth(date.getMonth() - 3),
          ).toISOString();
          const timeMax = new Date(
            new Date().setMonth(date.getMonth() + 3),
          ).toISOString();
          const url =
            `${process.env.API_GOOGLE_CALENDAR}/${e}/events?calendarId=${e}` +
            "&singleEvents=true&timeZone=America/Bogota&maxAttendees=1" +
            "&maxResults=250&sanitizeHtml=true" +
            `&timeMin=${timeMin}&timeMax=${timeMax}&key=${process.env.KEY_CALENDAR}`;
          const response = await axios.get(url);
          return response.data;
        }),
      );

      //Procesar URL de cada evento.
      for (const calendario of data) {
        if (calendario?.items?.length) {
          for (const item of calendario.items) {
            item.url = item?.location?.includes("http") ? item.location : "";
          }
        }
      }
      return new CalendarioResponse(data);
    } catch (e) {
      throw new CalendarioApiException();
    }
  }
}
module.exports = CalendarioService;
