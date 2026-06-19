/**
 * Define y devuelve el modelo Mongoose `temario` (colección `temario`).
 *
 * Campos: `ID`, `supergrupo`, `tema`, `texto`, `complejidad_tiempo`,
 * snippets por lenguaje (`java`, `cpp`, `py`), `orden`, `suborden` y fechas de
 * creación/modificación.
 *
 * @param {import("mongoose")} mongoose - Instancia de Mongoose.
 * @returns {import("mongoose").Model} Modelo `temario`.
 */
module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      ID: { type: Number },
      supergrupo: { type: String },
      tema: { type: String },
      texto: { type: String },
      complejidad_tiempo: { type: String, default: null },
      java: { type: String, default: null },
      cpp: { type: String, default: null },
      py: { type: String, default: null },
      orden: { type: Number },
      suborden: { type: Number },
      fecha_creacion: { type: String },
      fecha_modificacion: { type: String },
    },
    { collection: "temario" },
  );
  return mongoose.models.temario || mongoose.model("temario", schema);
};
