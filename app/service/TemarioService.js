const ModelTemario = require("../model/temario");

/**
 * Servicio para la gestión del temario.
 */
class TemarioService {
  /**
   * Obtiene todos los registros del temario.
   * @returns {Promise<{data: Array}>} Objeto con la lista de temarios.
   */
  async obtenerTemario() {
    return ModelTemario.findAll();
  }

  /**
   * Obtiene los nombres únicos de supergrupos del temario.
   * @returns {Promise<{data: string[]}>} Objeto con la lista de nombres de supergrupos.
   */
  async obtenerSupergrupos() {
    return ModelTemario.supergrupos();
  }
}

module.exports = TemarioService;
