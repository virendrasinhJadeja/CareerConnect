const Job = require("../models/Job");

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

// Get Recruiter's Jobs
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

module.exports = {
  createJob,
  getAllJobs,
  getMyJobs,
};