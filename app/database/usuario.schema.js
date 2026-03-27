module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      contrasenia: { type: String },
      rol: { type: String },
      usuario: { type: String, unique: true, required: true },
      correo: { type: String, unique: true, required: true },
      verificacion: { type: String },
    },
    { collection: "usuario" },
  );
  return mongoose.model("usuario", schema);
};
