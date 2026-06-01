const ModelLinkValioso = require("../model/link_valioso");
const urlValidator = require("../util/validators/url");

class LinkValiosoService {
  async crearLinkValioso({ nombre, url, tags, icono }) {
    if (!nombre) throw new Error("El nombre es obligatorio");
    if (!url) throw new Error("La URL es obligatoria");
    if (!tags) throw new Error("Los tags es obligatorio");
    if (!icono) throw new Error("El icono es obligatorio");
    if (!urlValidator.esUrlValida(url)) throw new Error("El url no es válida");
    return ModelLinkValioso.create({ nombre, url, tags, icono });
  }
  async obtenerLinksValiosos() {
    return ModelLinkValioso.findAll();
  }
  async actualizarLinkValioso(id, { nombre, url, tags, icono }) {
    if (!id) throw new Error("El id es obligatorio");
    if (!nombre) throw new Error("El nombre es obligatorio");
    if (!icono) throw new Error("El icono es obligatorio");
    if (url && !urlValidator.esUrlValida(url))
      throw new Error("La URL no es válida");
    let datos = {};
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
    return ModelLinkValioso.updateOne({ id, datos });
  }
  async eliminarLinkValioso(id) {
    if (!id) throw new Error("El id es obligatorio");
    return ModelLinkValioso.deleteOne(id);
  }
}
module.exports = LinkValiosoService;
