/**
 * Define y devuelve el modelo Mongoose `libro` (colección `libro`).
 *
 * Campos: `titulo`, `archivoPdf` (URL del PDF en Cloudinary) e `imagen`
 * (URL de la portada).
 *
 * @param {import("mongoose")} mongoose - Instancia de Mongoose.
 * @returns {import("mongoose").Model} Modelo `libro`.
 */
module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      titulo: { type: String },
      archivoPdf: { type: String },
      imagen: { type: String },
    },
    { collection: "libro" },
  );
  return mongoose.models.libro || mongoose.model("libro", schema);
};
