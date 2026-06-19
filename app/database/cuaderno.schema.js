module.exports = (mongoose) => {
  const entradaSchema = require("./entrada.schema")(mongoose);
  const schema = new mongoose.Schema(
    {
      usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario",
        required: true,
      },
      titulo: { type: String, required: true },
      descripcion: { type: String, required: true },
      entradas: { type: [entradaSchema], default: [] },
      fechaCreacion: { type: Date, default: Date.now },
      fechaModificacion: { type: Date, default: Date.now },
      estado: {
        type: String,
        enum: ["borrador", "publicado"],
        default: "borrador",
      },
    },
    { collection: "cuaderno" },
  );
  schema.index({ usuarioId: 1 });
  return mongoose.models.cuaderno || mongoose.model("cuaderno", schema);
};
