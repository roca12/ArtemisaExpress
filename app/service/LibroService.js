const ModelLibro = require("../model/libro");

/**
 * Crea un Error de validación con `statusCode` 400 para que el controlador
 * responda 400 (Bad Request) en lugar del 500 por defecto.
 * @param {string} mensaje - Mensaje de error.
 * @returns {Error} Error con `statusCode = 400`.
 */
function errorValidacion(mensaje) {
  const err = new Error(mensaje);
  err.statusCode = 400;
  return err;
}

/**
 * Servicio para la gestión de libros.
 */
class LibroService {
  constructor() {
    this.model = ModelLibro;
  }
  /**
   * Obtiene todos los libros.
   * @returns {Promise<Array>} Lista de libros.
   */
  async obtenerLibros() {
    return await this.model.findAll();
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
    if (!titulo) throw errorValidacion("El título es obligatorio");
    if (!archivoPdf) throw errorValidacion("El archivo PDF es obligatorio");
    return await this.model.createbook({ titulo, archivoPdf, imagen });
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
    if (!id) throw errorValidacion("El id es obligatorio");
    const datos = {};
    if (titulo) datos.titulo = titulo;
    if (archivoPdf) datos.archivoPdf = archivoPdf;
    if (imagen) datos.imagen = imagen;
    return await this.model.updatebook({ id, datos });
  }
  /**
   * Elimina un libro por ID.
   * @param {string} id - Identificador del libro.
   * @returns {Promise<Object>} Resultado de la eliminación.
   */
  async eliminarLibro(id) {
    if (!id) throw errorValidacion("El id es obligatorio");
    return await this.model.deletebook({ id });
  }
}
module.exports = LibroService;
