const ModelNotificacion = require("../model/notificacion");
const { sha256 } = require("../util/crypto/hash");

/**
 * Servicio para el envío y validación de notificaciones y códigos de verificación.
 */
class NotificacionService {
  constructor(strategy) {
    this.strategy = strategy;
  }
  /**
   * Genera y envía un código de verificación al destino indicado.
   * @param {string} destino - Dirección de destino (correo, teléfono, etc.).
   * @param {string} usuario - Nombre del usuario destinatario.
   * @returns {Promise<Object>} Resultado del envío.
   */
  async enviarCodigo(destino, usuario) {
    const codigo = _generarCodigo();
    if(!destino) throw new Error("El destino es obligatorio");
    if(!usuario) throw new Error("La información del usuario es obligatoria");
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

  /**
   * Regenera y reenvía el código de verificación al destino indicado.
   * @param {string} destino - Dirección de destino.
   * @param {string} usuario - Nombre del usuario destinatario.
   * @returns {Promise<Object>} Resultado del reenvío.
   */
  async reenviarCodigo(destino, usuario) {
    if(!destino) throw new Error("El destino es obligatorio");
    if(!usuario) throw new Error("La información del usuario es obligatoria");
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

  /**
   * Valida el código de verificación para el destino indicado.
   * @param {string} destino - Dirección de destino.
   * @param {string} codigo - Código a validar.
   * @returns {Promise<boolean>} `true` si el código es válido, `false` en caso contrario.
   */
  async validarCodigo(destino, codigo) {
    if(!destino) throw new Error("El destino es obligatorio");
    const doc = await ModelNotificacion.findOne(destino, "verificacion");
    if (!doc) return false;
    return (
      !doc.datos.usado &&
      doc.datos.expiraEn > new Date() &&
      doc.datos.codigo === sha256(codigo)
    );
  }

  /**
   * Envía un aviso al destino indicado.
   * @param {string} destino - Dirección de destino.
   * @param {Object} datos - Datos del aviso a enviar.
   * @returns {Promise<void>}
   */
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

/**
 * Genera un código aleatorio de 4 caracteres alfanuméricos.
 * @returns {string} Código generado.
 */
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
