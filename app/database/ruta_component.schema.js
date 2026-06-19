/**
 * Define y devuelve el modelo Mongoose `ruta_component` (colección `ruta_component`).
 *
 * Representa los elementos de navegación del menú. Campos: `path`, `title`,
 * `icon`, `class`, `extralink`, `submenu` (subelementos) y `perfil` (perfiles
 * con acceso).
 *
 * @param {import("mongoose")} mongoose - Instancia de Mongoose.
 * @returns {import("mongoose").Model} Modelo `ruta_component`.
 */
module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      path: { type: String },
      title: { type: String },
      icon: { type: String, default: "" },
      class: { type: String },
      extralink: { type: Boolean, default: false },
      submenu: { type: Array, default: [] },
      perfil: { type: Array, default: [] },
    },
    { collection: "ruta_component" },
  );
  return (
    mongoose.models.ruta_component || mongoose.model("ruta_component", schema)
  );
};
