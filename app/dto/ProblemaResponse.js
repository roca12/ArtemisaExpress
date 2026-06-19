/**
 * DTO de respuesta con los datos de un problema de programación.
 */
class ProblemaResponse {
  /**
   * @param {Object} body - Documento del problema.
   * @param {string} body._id - Identificador del problema (necesario para editar/eliminar).
   * @param {string} body.titulo - Título del problema.
   * @param {string} body.juez - Juez en línea al que pertenece.
   * @param {number} body.alias - Alias o número de referencia del problema.
   * @param {number} body.dificultad - Nivel de dificultad.
   * @param {string} body.tema_1 - Primer tema asociado.
   * @param {string} body.tema_2 - Segundo tema asociado.
   * @param {string} body.tema_3 - Tercer tema asociado.
   * @param {string} body.tema_4 - Cuarto tema asociado.
   * @param {string} body.url - URL del problema.
   */
  constructor(body) {
    this._id = body._id;
    this.titulo = body.titulo;
    this.juez = body.juez;
    this.alias = body.alias;
    this.dificultad = body.dificultad;
    this.tema_1 = body.tema_1;
    this.tema_2 = body.tema_2;
    this.tema_3 = body.tema_3;
    this.tema_4 = body.tema_4;
    this.url = body.url;
  }
}

module.exports = ProblemaResponse;
