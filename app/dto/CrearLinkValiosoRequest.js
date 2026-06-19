/**
 * DTO de petición para la creación de un link valioso.
 */
class CrearLinkValiosoRequest {
  /**
   * @param {Object} body - Cuerpo de la petición.
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

module.exports = CrearLinkValiosoRequest;
