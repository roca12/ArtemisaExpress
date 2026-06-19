// Subdocumento embebido dentro de cuaderno (no es una colección propia).
// `contenido` guarda el JSON por bloques del editor (BlockNote / TipTap):
// texto, código y fórmulas conviven dentro de ese JSON.
module.exports = (mongoose) => {
  return new mongoose.Schema(
    {
      titulo: { type: String, default: "" },
      contenido: { type: mongoose.Schema.Types.Mixed, default: {} },
      origen: { type: String, enum: ["MANUAL", "GITHUB"], default: "MANUAL" },
      repoUrl: { type: String, default: null },
      orden: { type: Number, default: 0 },
    },
    { _id: true },
  );
};
