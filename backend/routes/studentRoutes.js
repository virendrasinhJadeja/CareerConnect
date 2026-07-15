const express = require("express");
const router = express.Router();

const {
  getStudentProfile,
  updateStudentProfile,
  uploadResume,
} = require("../controllers/studentController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Get Student Profile
router.get(
  "/profile",
  protect,
  authorizeRoles("student"),
  getStudentProfile
);


// Update Student Profile
router.put(
  "/profile",
  protect,
  authorizeRoles("student"),
  updateStudentProfile
);

router.post(
  "/upload-resume",
  protect,
  authorizeRoles("student"),
  upload.single("resume"),
  uploadResume
);

module.exports = router;