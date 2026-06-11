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

  async crearTemario(temario){
    if (!temario) throw new Error("El temario es obligatorio");
    return await this.model.crearTemario(temario);
  }
}

module.exports = TemarioService;
