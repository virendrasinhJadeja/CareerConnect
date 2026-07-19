const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  deleteJob,
  getAllJobs,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Dashboard
router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin"),
  getDashboardStats
);

// Get All Users
router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

// Delete User
router.delete(
  "/users/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

router.delete(
  "/jobs/:id",
  protect,
  authorizeRoles("admin"),
  deleteJob
);

router.get(
  "/jobs",
  protect,
  authorizeRoles("admin"),
  getAllJobs
);

module.exports = router;