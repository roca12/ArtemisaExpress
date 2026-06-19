/**
 * Define y devuelve el modelo Mongoose `usuario` (colección `usuario`).
 *
 * Campos: `contrasenia` (hash), `rol`, `usuario` (único, requerido),
 * `correo` (único, requerido) y `verificado` (estado de verificación del correo).
 *
 * @param {import("mongoose")} mongoose - Instancia de Mongoose.
 * @returns {import("mongoose").Model} Modelo `usuario`.
 */
module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      contrasenia: { type: String },
      rol: { type: String },
      usuario: { type: String, unique: true, required: true },
      correo: { type: String, unique: true, required: true },
      verificado: { type: Boolean, default: false },
    },
    { collection: "usuario" },
  );
  return mongoose.models.usuario || mongoose.model("usuario", schema);
};
