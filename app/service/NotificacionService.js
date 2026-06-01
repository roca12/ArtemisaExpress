const ModelNotificacion = require("../model/notificacion");
const { sha256 } = require("../util/crypto/hash");

class NotificacionService {
  constructor(strategy) {
    this.strategy = strategy;
  }
  async enviarCodigo(destino, usuario) {
    const codigo = _generarCodigo();
    const doc = await ModelNotificacion.createOne({
      destino,
      tipo: this.strategy.tipo,
      plantilla: "verificacion",
      datos: {
        usuario,
        codigo: sha256(codigo),
        expiraEn: new Date(Date.now() + 1000 * 60 * 5),
        usado: false,
      },
    });
    await this.strategy.send(destino, { usuario, codigo });
    await ModelNotificacion.marcarEnviado(doc._id);
    return {
      success: true,
      message: "Código enviado exitosamente",
    };
  }

  async reenviarCodigo(destino, usuario) {
    const codigo = _generarCodigo();
    await ModelNotificacion.updateOne(destino, "verificacion", {
      usuario,
      codigo: sha256(codigo),
      expiraEn: new Date(Date.now() + 1000 * 60 * 5),
      usado: false,
    });
    await this.strategy.send(destino, { usuario, codigo });
    return {
      success: true,
      message: "Código enviado exitosamente",
    };
  }

  async validarCodigo(destino, codigo) {
    const doc = await ModelNotificacion.findOne(destino, "verificacion");
    if (!doc) return false;
    return (
      !doc.datos.usado &&
      doc.datos.expiraEn > new Date() &&
      doc.datos.codigo === sha256(codigo)
    );
  }

  async enviarAviso(destino, datos) {
    const doc = await ModelNotificacion.createOne({
      destino,
      tipo: this.strategy.tipo,
      plantilla: "aviso",
      datos,
    });
    await this.strategy.send(destino, datos);
    await ModelNotificacion.marcarEnviado(doc._id);
  }
}

function _generarCodigo() {
  const chars = [];
  for (let i = 0; i < 4; i++) {
    if (Math.random() < 0.5) {
      chars.push(String.fromCharCode(Math.floor(Math.random() * 26) + 65));
    } else {
      chars.push(String.fromCharCode(Math.floor(Math.random() * 10) + 48));
    }
  }
  return chars.join("");
}
module.exports = NotificacionService;
