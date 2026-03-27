module.exports = (mongoose) => {
  const Schema = new mongoose.Schema(
    {
      correo: {
        type: String,
        //unique: true,
        required: true,
      },
      usuario: { type: String },
      codigo: { type: String },
      usado: { type: Boolean },
      creadoEn: { type: Date },
      expiraEn: { type: Date },
    },
    { collection: "correo_confirmacion" },
  );
  return mongoose.model("correo_confirmacion", Schema);
};
