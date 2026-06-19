const ModelTemario = require("../model/temario");

/**
 * Servicio para la gestión del temario.
 */
class TemarioService {
  constructor() {
    this.model = ModelTemario;
  }

  /**
   * Obtiene todos los registros del temario.
   * @returns {Promise<{data: Array}>} Objeto con la lista de temarios.
   */
  async obtenerTemario() {
    return await this.model.findAll();
  }

  /**
   * Obtiene los nombres únicos de supergrupos del temario.
   * @returns {Promise<{data: string[]}>} Objeto con la lista de nombres de supergrupos.
   */
  async obtenerSupergrupos() {
    return await this.model.supergrupos();
  }

  /**
 * Crea un nuevo registro de temario en la base de datos.
 * @param {Object} temario - Objeto con los datos del temario a crear.
 * @returns {Promise<Object>} Temario creado y guardado en la base de datos.
 */
async crearTemario(temario) {
  if (!temario) throw new Error("El temario es obligatorio");

  return await this.model.crearTemario(temario);
}

 /**
 * Obtiene un temario por su ID.
 * @param {string} id - Identificador del temario.
 * @returns {Promise<Object|null>} Temario encontrado o null si no existe.
 */
async obtenerPorId(id) {
  if (!id) throw new Error("El id es obligatorio");
  return await this.model.obtenerPorId(id);
}

/**
 * Actualiza un temario por su ID.
 * @param {string} id - Identificador del temario.
 * @param {Object} data - Datos a actualizar.
 * @returns {Promise<Object|null>} Temario actualizado o null si no existe.
 */
async actualizarTemario(id, data) {
  if (!id) throw new Error("El id es obligatorio");
  if (!data) throw new Error("Los datos son obligatorios");

  return await this.model.actualizarTemario({
    id,
    data
  });
}

/**
 * Elimina un temario por su ID.
 * @param {string} id - Identificador del temario.
 * @returns {Promise<Object|null>} Resultado de la eliminación.
 */
async eliminarTemario(id) {
  if (!id) throw new Error("El id es obligatorio");
  return await this.model.eliminarTemario(id);
}

}

module.exports = TemarioService;
