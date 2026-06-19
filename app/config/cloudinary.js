/**
 * Configuración de Cloudinary y del middleware de subida de archivos (multer).
 *
 * Configura las credenciales de Cloudinary desde variables de entorno y expone
 * un middleware `multer` que almacena los archivos en la carpeta
 * `artemisa/libros` como recurso `raw`, limitado a PDFs de hasta 10 MB.
 *
 * @module config/cloudinary
 */
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "artemisa/libros",
    resource_type: "raw",
    allowed_formats: ["pdf"],
  },
});
module.exports = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
