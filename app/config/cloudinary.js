const cloudinary = require("cloudinary");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");
cloudinary.config({
    cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage =  new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "artemisa/libros",
        resource_type:"raw",
        allowed_formats:["pdf"]
    },
});
module.exports = multer({
    storage,
    limits:{fileSize:10*1024*1024},
});