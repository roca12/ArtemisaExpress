/**
 * DTO de respuesta con los datos de un link valioso.
 */
class LinkValiosoResponse {
  /**
   * @param {Object} body - Documento del link valioso.
   * @param {string} body.nombre - Nombre del recurso.
   * @param {string} body.url - URL del recurso.
   * @param {string} body.tags - Etiquetas asociadas (separadas por comas).
   * @param {string} body.icono - Identificador del icono a mostrar.
   */
  constructor(body) {
    this.nombre = body.nombre;
    this.url = body.url;
    this.tags = body.tags;
    this.icono = body.icono;
  }
}

module.exports = LinkValiosoResponse;