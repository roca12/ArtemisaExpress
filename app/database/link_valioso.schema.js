/**
 * Define y devuelve el modelo Mongoose `link_valioso` (colección `link_valioso`).
 *
 * Campos: `nombre`, `url`, `tags` (etiquetas separadas por comas) e `icono`.
 *
 * @param {import("mongoose")} mongoose - Instancia de Mongoose.
 * @returns {import("mongoose").Model} Modelo `link_valioso`.
 */
module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      nombre: { type: String },
      url: { type: String },
      tags: { type: String },
      icono: { type: String },
    },
    { collection: "link_valioso" },
  );
  return mongoose.models.link_valioso || mongoose.model("link_valioso", schema);
};
