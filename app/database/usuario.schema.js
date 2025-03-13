module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      user: { type: String },
      password: { type: String },
      email: { type: String },
      activo: { type: Number, default: 1 },
      cod_perfil: { type: Number, default: 1 },
      fecha_creacion: { type: String, default: new Date() },
      fecha_modificacion: { type: String, default: new Date() },
    },
    { collection: "usuario" },
  );
  return mongoose.model("usuario", schema);
};
