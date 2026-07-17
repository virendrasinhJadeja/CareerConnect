const Job = require("../models/Job");
const Application = require("../models/Application");

// Create New Job
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      skills,
    } = req.body;

    const job = await Job.create({
  title,
  description,
  company,
  location,
  salary,
  skills,
  recruiter: req.user.id,
  status: "active", // ✅ Add this
});

    res.status(201).json({
      success: true,
      message: "Job Posted Successfully",
      job,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate(
      "recruiter",
      "fullName company email"
    );

    res.status(200).json({
      success: true,
      jobs,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get myJobs
const getMyJobs = async (req, res) => {
  try {
    console.log("Logged in Recruiter ID:", req.user.id);

    const jobs = await Job.find({
      recruiter: req.user.id,
    });

    console.log("Jobs Found:", jobs);

    res.status(200).json({
      success: true,
      jobs,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Recruiter Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments({
      recruiter: req.user.id,
    });

    const activeJobs = await Job.countDocuments({
      recruiter: req.user.id,
      status: "active",
    });

    const totalApplicants = await Application.countDocuments({
      recruiterId: req.user.id,
    });

    const shortlisted = await Application.countDocuments({
      recruiterId: req.user.id,
      status: "shortlisted",
    });

    const rejected = await Application.countDocuments({
      recruiterId: req.user.id,
      status: "rejected",
    });

    res.status(200).json({
      success: true,
      totalJobs,
      activeJobs,
      totalApplicants,
      shortlisted,
      rejected,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      recruiter: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    Object.assign(job, req.body);

    await job.save();

    res.status(200).json({
      success: true,
      message: "Job Updated Successfully",
      job,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      recruiter: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job Deleted Successfully",
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
  createJob,
  getAllJobs,
  getMyJobs,
  updateJob,
  deleteJob,
  getDashboardStats,
};