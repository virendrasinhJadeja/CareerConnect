const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getMyJobs,
  updateJob,
  deleteJob,
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

// My Jobs
router.get(
  "/my-jobs",
  protect,
  authorizeRoles("recruiter"),
  getMyJobs
);

// Update Job
router.put(
  "/:id",
  protect,
  authorizeRoles("recruiter"),
  updateJob
);

// Delete Job
router.delete(
  "/:id",
  protect,
  authorizeRoles("recruiter"),
  deleteJob
);

// Get All Jobs
router.get("/", getAllJobs);

module.exports = router;