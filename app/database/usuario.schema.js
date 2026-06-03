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
