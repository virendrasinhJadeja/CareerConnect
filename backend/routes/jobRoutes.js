const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Get All Jobs (Public)
router.get("/", getAllJobs);

// Create Job (Recruiter Only)
router.post(
  "/",
  protect,
  authorizeRoles("recruiter"),
  createJob
);

module.exports = router;