/**
 * DTO que representa un evento individual del calendario.
 */
class CalendarioEventResponse {
  constructor(item) {
    this.id = item.id;
    this.titulo = item.summary;
    this.descripcion = item.description || "";
    this.inicio = item.start?.dateTime || item.start?.date;
    this.fin = item.end?.dateTime || item.end?.date;
    this.url = item.url || "";
    this.ubicacion = item.location || "";
  }
}

module.exports = CalendarioEventResponse;
