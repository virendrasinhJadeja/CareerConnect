const express = require("express");
const router = express.Router();


const {
  applyJob,
  getJobApplicants,
  updateApplicationStatus,
  getMyApplications
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");


// Apply For Job
router.post(
  "/apply/:jobId",
  protect,
  authorizeRoles("student"),
  applyJob
);

// Student - View My Applications
router.get(
  "/my-applications",
  protect,
  authorizeRoles("student"),
  getMyApplications
);

// Get Applicants For Job
router.get(
  "/job/:jobId",
  protect,
  authorizeRoles("recruiter"),
  getJobApplicants
);

// Update Application Status
router.put(
  "/status/:applicationId",
  protect,
  authorizeRoles("recruiter"),
  updateApplicationStatus
);

module.exports = router;