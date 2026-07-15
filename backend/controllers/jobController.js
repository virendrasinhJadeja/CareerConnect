const Job = require("../models/Job");

// =======================
// Create Job
// =======================
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
      recruiterId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================
// Get All Active Jobs
// =======================
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      status: "active",
    }).populate("recruiterId", "fullName company email");

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================
// Get Recruiter's Own Jobs
// =======================
const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      recruiterId: req.user.id,
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.log(error);

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
      recruiterId: req.user.id,
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
      message: "Job updated successfully",
      job,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      recruiterId: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Export
// =======================
module.exports = {
  createJob,
  getAllJobs,
  getRecruiterJobs,
  updateJob,
  deleteJob,
};