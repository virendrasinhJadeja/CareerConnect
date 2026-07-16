const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getMyJobs,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Create Job
router.post(
  "/create",
  protect,
  authorizeRoles("recruiter"),
  createJob
);

// Recruiter Jobs
router.get(
  "/my-jobs",
  protect,
  authorizeRoles("recruiter"),
  getMyJobs
);

// Get All Jobs
router.get("/", getAllJobs);

module.exports = router;