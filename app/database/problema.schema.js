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
    { collection: "problemas" },
  );
  return mongoose.models["problemas"] || mongoose.model("problemas", schema);
};
