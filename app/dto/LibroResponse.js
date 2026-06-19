/**
 * DTO de respuesta con los datos de un libro.
 */
class LibroResponse {
  /**
   * @param {Object} body - Documento del libro.
   * @param {string} body._id - Identificador del libro (necesario para editar/eliminar).
   * @param {string} body.titulo - Título del libro.
   * @param {string} body.archivoPdf - URL del archivo PDF en Cloudinary.
   * @param {string} body.imagen - URL de la imagen de portada en Cloudinary.
   */
  constructor(body) {
    this._id = body._id;
    this.titulo = body.titulo;
    this.archivoPdf = body.archivoPdf;
    this.imagen = body.imagen;
  }
}

module.exports = LibroResponse;
