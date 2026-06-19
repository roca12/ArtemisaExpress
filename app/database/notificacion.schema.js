/**
 * Define y devuelve el modelo Mongoose `notificacion` (colección `notificacion`).
 *
 * Campos: `destino`, `tipo` y `plantilla` (requeridos), `datos` (payload
 * flexible), `enviado` (estado de envío) y `creadoEn` (fecha de creación).
 *
 * @param {import("mongoose")} mongoose - Instancia de Mongoose.
 * @returns {import("mongoose").Model} Modelo `notificacion`.
 */
module.exports = (mongoose) => {
  const Schema = new mongoose.Schema(
    {
      destino: { type: String, required: true },
      tipo: { type: String, required: true },
      plantilla: { type: String, required: true },
      datos: { type: mongoose.Schema.Types.Mixed }, //Payload flexible
      enviado: { type: Boolean, default: false },
      creadoEn: { type: Date, default: Date.now },
    },
    { collection: "notificacion" },
  );
  return mongoose.models.notificacion || mongoose.model("notificacion", Schema);
};
