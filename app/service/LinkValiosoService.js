const ModelLinkValioso = require("../model/link_valioso");
const urlValidator = require("../util/validators/url");

/**
 * Servicio para la gestión de links valiosos.
 */
class LinkValiosoService {
  constructor() {
    this.model = ModelLinkValioso;
  }

  /**
   * Crea un nuevo link valioso.
   * @param {Object} datos - Datos del link.
   * @param {string} datos.nombre - Nombre del link.
   * @param {string} datos.url - URL del link.
   * @param {string} datos.tags - Etiquetas del link.
   * @param {string} datos.icono - Icono del link.
   * @returns {Promise<Object>} Link creado.
   */
  async crearLinkValioso({ nombre, url, tags, icono }) {
    if (!nombre) throw new Error("El nombre es obligatorio");
    if (!url) throw new Error("La URL es obligatoria");
    if (!tags) throw new Error("Los tags es obligatorio");
    if (!icono) throw new Error("El icono es obligatorio");
    if (!urlValidator.esUrlValida(url)) throw new Error("El url no es válida");
    return await this.model.create({ nombre, url, tags, icono });
  }

  /**
   * Obtiene todos los links valiosos.
   * @returns {Promise<Array>} Lista de links valiosos.
   */
  async obtenerLinksValiosos() {
    return await this.model.findAll();
  }

  /**
   * Actualiza un link valioso existente por ID.
   * @param {string} id - Identificador del link.
   * @param {Object} datos - Datos a actualizar.
   * @param {string} [datos.nombre] - Nuevo nombre del link.
   * @param {string} [datos.url] - Nueva URL del link.
   * @param {string} [datos.tags] - Nuevas etiquetas del link.
   * @param {string} [datos.icono] - Nuevo icono del link.
   * @returns {Promise<Object>} Link actualizado.
   */
  async actualizarLinkValioso(id, { nombre, url, tags, icono }) {
    if (!id) throw new Error("El id es obligatorio");
    if (!nombre) throw new Error("El nombre es obligatorio");
    if (!icono) throw new Error("El icono es obligatorio");
    if (url && !urlValidator.esUrlValida(url))
      throw new Error("La URL no es válida");
    const datos = {};
    let flag = false;
    if (nombre) {
      datos.nombre = nombre;
      flag = true;
    }
    if (url) {
      datos.url = url;
      flag = true;
    }
    if (tags) {
      datos.tags = tags;
      flag = true;
    }
    if (icono) {
      datos.icono = icono;
      flag = true;
    }
    if (!flag)
      throw new Error("Es necesario que alguno de los campos no esté vacío");
    return await this.model.updateOne({ id, datos });
  }

  /**
   * Elimina un link valioso por ID.
   * @param {string} id - Identificador del link.
   * @returns {Promise<Object>} Resultado de la eliminación.
   */
  async eliminarLinkValioso(id) {
    if (!id) throw new Error("El id es obligatorio");
    return await this.model.deleteOne(id);
  }

  /**
   * Obtiene un link valioso por su ID.
   * @param {string} id - Identificador del link valioso.
   * @returns {Promise<Object|null>} Link encontrado o null si no existe.
   */
  async obtenerLinkValioso(id) {
    if (!id) throw new Error("El id es obligatorio");
    return await this.model.findOne(id);
  }
}
module.exports = LinkValiosoService;
