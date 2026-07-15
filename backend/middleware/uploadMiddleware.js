const multer = require("multer");
const path = require("path");


// Storage configuration
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },


  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  }

});


// File filter
const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    ".pdf",
    ".doc",
    ".docx"
  ];

  const ext = path.extname(file.originalname);

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only PDF and DOC files are allowed"),
      false
    );
  }

};


const upload = multer({
  storage,
  fileFilter
});


module.exports = upload;