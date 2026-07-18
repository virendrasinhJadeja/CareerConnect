const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "careerconnect/resumes",
    resource_type: "raw",
    public_id: Date.now().toString(),
    format: path.extname(file.originalname).replace(".", ""),
  }),
});

module.exports = multer({ storage });