const ProblemaModel = require("../model/problema");

/**
 * Servicio para la gestión de problemas de programación.
 */
class ProblemaService {
  constructor() {
    this.model = ProblemaModel;
  }
  /**
   * Crea un nuevo problema de programación.
   * @param {Object} datos - Datos del problema.
   * @param {string} datos.titulo - Título del problema.
   * @param {string} datos.juez - Juez en línea del problema.
   * @param {string} datos.alias - Alias del problema.
   * @param {number} datos.dificultad - Nivel de dificultad.
   * @param {string} datos.url - URL del problema en el juez.
   * @returns {Promise<Object>} Problema creado.
   */
  async crearProblema({
    titulo,
    juez,
    alias,
    dificultad,
    tema_1,
    tema_2,
    tema_3,
    tema_4,
    url,
  }) {
    if (!titulo) throw new Error("El título es obligatorio");
    if (!juez) throw new Error("El juez es obligatorio");
    if (!dificultad) throw new Error("La dificultad es obligatoria");
    if (!url) throw new Error("El url es obligatorio");
    return await this.model.crearProblema({
      titulo,
      juez,
      alias,
      dificultad,
      tema_1,
      tema_2,
      tema_3,
      tema_4,
      url,
    });
  }

  /**
   * Actualiza un problema existente. Solo modifica los campos que lleguen con valor.
   * @param {string} id - Identificador del problema.
   * @param {Object} datos - Campos a actualizar (solo los que tengan valor se modifican).
   * @returns {Promise<Object>} Problema actualizado.
   */
  async actualizarProblema(
    id,
    { titulo, juez, alias, dificultad, tema_1, tema_2, tema_3, tema_4, url },
  ) {
    if (!id) throw new Error("El id es obligatorio");
    const datos = {};
    if (titulo) datos.titulo = titulo;
    if (juez) datos.juez = juez;
    if (alias) datos.alias = alias;
    if (dificultad) datos.dificultad = dificultad;
    if (tema_1) datos.tema_1 = tema_1;
    if (tema_2) datos.tema_2 = tema_2;
    if (tema_3) datos.tema_3 = tema_3;
    if (tema_4) datos.tema_4 = tema_4;
    if (url) datos.url = url;
    if (Object.keys(datos).length === 0)
      throw new Error("Debes enviar al menos un campo para actualizar");
    return await this.model.actualizarProblema({ id, data: datos });
  }

  /**
   * Obtiene todos los problemas.
   * @returns {Promise<{data: Array}>} Objeto con la lista de problemas.
   */
  async obtenerProblemas() {
    return await this.model.findAll();
  }

  /**
   * Elimina un problema por ID.
   * @param {string} id - Identificador del problema.
   * @returns {Promise<Object>} Confirmación de eliminación.
   */
  async eliminarProblema(id) {
    if (!id) throw new Error("El id es obligatorio");
    return await this.model.eliminarProblema(id);
  }
}
module.exports = ProblemaService;
