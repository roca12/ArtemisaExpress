module.exports = (mongoose) => {
    const schema = new mongoose.Schema(
        {
            titulo: { type: String },
            archivoPdf: { type: String },
            imagen: { type: String }
        },
        { collection: "libro" },
    );
    return mongoose.model("libro", schema);
};