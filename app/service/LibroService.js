const ModelLibro = require("../model/libro");
/**
 * Servicio para la gestión de libros.
 */
class LibroService {
  /**
   * Obtiene todos los libros.
   * @returns {Promise<Array>} Lista de libros.
   */
  async obtenerLibros() {
    return ModelLibro.findAll();
  }

  /**
   * Crea un nuevo libro.
   * @param {Object} datos - Datos del libro.
   * @param {string} datos.titulo - Título del libro.
   * @param {string} datos.archivoPdf - URL del archivo PDF en Cloudinary.
   * @param {string} datos.imagen - URL de la imagen de portada en Cloudinary.
   * @returns {Promise<Object>} Libro creado.
   */
  async crearLibro({ titulo, archivoPdf, imagen }) {
    if (!titulo) throw new Error("El título es obligatorio");
    if (!titulo) throw new Error("El archivo PDF es obligatorio");
    return ModelLibro.createbook({ titulo, archivoPdf, imagen });
  }

  /**
   * Actualiza un libro existente por ID.
   * @param {string} id - Identificador del libro.
   * @param {Object} datos - Datos a actualizar.
   * @param {string} [datos.titulo] - Nuevo título del libro.
   * @param {string} [datos.archivoPdf] - Nueva URL del PDF en Cloudinary.
   * @param {string} [datos.imagen] - Nueva URL de la imagen en Cloudinary.
   * @returns {Promise<Object>} Libro actualizado.
   */
  async actualizarLibro(id, { titulo, archivoPdf, imagen }) {
    if (!id) throw new Error("El ido es obligatorio");
    const datos = {};
    if (titulo) datos.titulo = titulo;
    if (archivoPdf) datos.archivoPdf = archivoPdf;
    if (imagen) datos.imagen = imagen;
    return ModelLibro.updatebook({ id, datos });
  }
  /**
   * Elimina un libro por ID.
   * @param {string} id - Identificador del libro.
   * @returns {Promise<Object>} Resultado de la eliminación.
   */
  async eliminarLibro(id) {
    if (!id) throw new Error("El id es obligatorio");
    return ModelLibro.deletebook(id);
  }
}
module.exports = LibroService;
