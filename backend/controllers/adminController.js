const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalRecruiters = await User.countDocuments({
      role: "recruiter",
    });

    const totalJobs = await Job.countDocuments();

    const totalApplications = await Application.countDocuments();

    // Latest Jobs
    const latestJobs = await Job.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title company location");

    // Latest Students
    const latestStudents = await User.find({
      role: "student",
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("fullName email college");

    // Recent Applications
const recentApplications = await Application.find()
  .populate("studentId", "fullName email")
  .populate("jobId", "title company")
  .sort({ createdAt: -1 })
  .limit(5);

    res.status(200).json({
  success: true,
  stats: {
    totalStudents,
    totalRecruiters,
    totalJobs,
    totalApplications,
  },
  latestJobs,
  latestStudents,
  recentApplications,
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboardStats,
};