/**
 * Define y devuelve el modelo Mongoose `cuaderno` (colección `cuaderno`).
 *
 * Campos: `usuarioId` (referencia a `usuario`, requerido), `titulo` y
 * `descripcion` (requeridos), `entradas` (subdocumentos definidos en
 * `entrada.schema`), fechas de creación/modificación y `estado`
 * (`borrador` | `publicado`). Indexado por `usuarioId`.
 *
 * @param {import("mongoose")} mongoose - Instancia de Mongoose.
 * @returns {import("mongoose").Model} Modelo `cuaderno`.
 */
module.exports = (mongoose) => {
  const entradaSchema = require("./entrada.schema")(mongoose);
  const schema = new mongoose.Schema(
    {
      usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "usuario", required: true },
      titulo: { type: String, required: true },
      descripcion: { type: String, required: true },
      entradas: { type: [entradaSchema], default: [] },
      fechaCreacion: { type: Date, default: Date.now },
      fechaModificacion: { type: Date, default: Date.now },
      estado: { type: String, enum: ["borrador", "publicado"], default: "borrador" },
    },
    { collection: "cuaderno" },
  );
  schema.index({ usuarioId: 1 });
  return mongoose.models.cuaderno || mongoose.model("cuaderno", schema);
};
