const ModelNotificacion = require("../model/notificacion");
const { sha256 } = require("../util/crypto/hash");

/**
 * Servicio para el envío y validación de códigos MFA.
 * Usa la misma strategy de envío que NotificacionService.
 */
class MFAService {
  constructor(strategy) {
    this.strategy = strategy;
    this.model = ModelNotificacion;
  }

  /**
   * Genera y envía un código de verificación al destino indicado.
   * @param {string} destino - Dirección de destino (correo, etc.).
   * @param {string} usuario - Nombre del usuario destinatario.
   * @returns {Promise<Object>} Resultado del envío.
   */
  async enviarCodigo(destino, usuario) {
    if (!destino) throw new Error("El destino es obligatorio");
    if (!usuario) throw new Error("La información del usuario es obligatoria");
    const codigo = _generarCodigo();
    const doc = await this.model.createOne({
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
    await this.model.marcarEnviado(doc._id);
    return { success: true, message: "Código enviado exitosamente" };
  }

  /**
   * Regenera y reenvía el código de verificación al destino indicado.
   * @param {string} destino - Dirección de destino.
   * @param {string} usuario - Nombre del usuario destinatario.
   * @returns {Promise<Object>} Resultado del reenvío.
   */
  async reenviarCodigo(destino, usuario) {
    if (!destino) throw new Error("El destino es obligatorio");
    if (!usuario) throw new Error("La información del usuario es obligatoria");
    const codigo = _generarCodigo();
    await this.model.updateOne(destino, "verificacion", {
      usuario,
      codigo: sha256(codigo),
      expiraEn: new Date(Date.now() + 1000 * 60 * 5),
      usado: false,
    });
    await this.strategy.send(destino, { usuario, codigo });
    return { success: true, message: "Código reenviado exitosamente" };
  }

  /**
   * Valida el código de verificación para el destino indicado.
   * Marca el código como usado si es válido.
   * @param {string} destino - Dirección de destino.
   * @param {string} codigo - Código en texto plano a validar.
   * @returns {Promise<boolean>} `true` si el código es válido.
   */
  async validarCodigo(destino, codigo) {
    if (!destino) throw new Error("El destino es obligatorio");
    const doc = await this.model.findOne(destino, "verificacion");
    if (!doc) return false;
    const valido =
      !doc.datos.usado &&
      doc.datos.expiraEn > new Date() &&
      doc.datos.codigo === sha256(codigo);
    if (valido) await this.model.marcarUsado(doc._id);
    return valido;
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

module.exports = MFAService;
