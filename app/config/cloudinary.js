/**
 * Configuración de Cloudinary y del middleware de subida de archivos (multer).
 *
 * Configura las credenciales de Cloudinary desde variables de entorno y expone
 * un middleware `multer` que almacena los archivos según el campo:
 * - `archivoPdf`: PDF (`raw`) en la carpeta `artemisa/libros`.
 * - `imagen`: imagen de portada en la carpeta `artemisa/portadas`.
 * Ambos limitados a 10 MB por archivo.
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
  params: (req, file) => {
    if (file.fieldname === "imagen") {
      return {
        folder: "artemisa/portadas",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      };
    }
    // El PDF se sube como `raw`. NO se usa `allowed_formats` aquí: en subidas
    // `raw` Cloudinary detecta el formato por la extensión del `public_id`, que
    // `multer-storage-cloudinary` genera sin extensión, por lo que la
    // validación fallaría con "An unknown file format not allowed". El formato
    // se valida antes mediante `fileFilter` (por `mimetype`). Se conserva la
    // extensión `.pdf` en el `public_id` para que la URL sea descargable.
    const nombreBase = file.originalname.replace(/\.pdf$/i, "");
    return {
      folder: "artemisa/libros",
      resource_type: "raw",
      public_id: `${nombreBase}-${Date.now()}.pdf`,
    };
  },
});

/**
 * Valida el tipo de cada archivo por su `mimetype` antes de subirlo a
 * Cloudinary: `archivoPdf` debe ser un PDF y `imagen` una imagen permitida.
 */
const fileFilter = (req, file, cb) => {
  /**
   * Rechaza el archivo actual con un error 400 y el mensaje indicado.
   *
   * @param {string} mensaje - Motivo del rechazo enviado al cliente.
   */
  const rechazar = (mensaje) => {
    const err = new Error(mensaje);
    err.statusCode = 400;
    cb(err);
  };
  if (file.fieldname === "imagen") {
    const permitidas = ["image/jpeg", "image/png", "image/webp"];
    return permitidas.includes(file.mimetype)
      ? cb(null, true)
      : rechazar("La portada debe ser una imagen JPG, PNG o WebP");
  }
  return file.mimetype === "application/pdf"
    ? cb(null, true)
    : rechazar("El archivo debe ser un PDF");
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});
