/**
 * Define y devuelve el modelo Mongoose `problema` (colección `Problemas`).
 *
 * Campos: `id`, `titulo`, `juez`, `alias`, `dificultad`, hasta cuatro temas
 * asociados (`tema_1`..`tema_4`) y `url`.
 *
 * @param {import("mongoose")} mongoose - Instancia de Mongoose.
 * @returns {import("mongoose").Model} Modelo `problema`.
 */
module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      id: { type: Number },
      titulo: { type: String },
      juez: { type: String },
      alias: { type: Number },
      dificultad: { type: Number },
      tema_1: { type: String },
      tema_2: { type: String },
      tema_3: { type: String },
      tema_4: { type: String },
      url: { type: String },
    },
    { collection: "Problemas" },
  );
  return mongoose.models.problema || mongoose.model("problema", schema);
};
