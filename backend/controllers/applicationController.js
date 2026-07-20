const Application = require("../models/Application");
const Job = require("../models/Job");


// Apply For Job
const applyJob = async (req, res) => {

  try {

    const jobId = req.params.jobId;


    // Check Job Exists
    const job = await Job.findById(jobId);


    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }


    // Check Already Applied
    const alreadyApplied = await Application.findOne({
      studentId: req.user.id,
      jobId: jobId
    });


    if (alreadyApplied) {

      return res.status(400).json({
        success: false,
        message: "Already applied for this job",
      });

    }


    // Create Application

    const application = await Application.create({

      studentId: req.user.id,

      jobId: jobId,

      recruiterId: job.recruiter,

      status: "Applied"

    });


    res.status(201).json({

      success: true,

      message: "Job applied successfully",

      application

    });



  } catch (error) {

    console.log(error);


    res.status(500).json({

      success: false,

      message: "Server Error"

    });

  }

};

// Get Applicants For Job
const getJobApplicants = async (req, res) => {

  try {

    const jobId = req.params.jobId;
    
    const job = await Job.findById(jobId);

if (!job) {
  return res.status(404).json({
    success: false,
    message: "Job not found",
  });
}

// Recruiter can only view applicants for their own jobs
if (job.recruiter.toString() !== req.user.id) {
  return res.status(403).json({
    success: false,
    message: "Access denied",
  });
}

    const applications = await Application.find({
      jobId: jobId
    })
    .populate(
      "studentId",
      "fullName email phone college resume"
    )
    .populate(
      "jobId",
      "title company"
    );


    res.status(200).json({

      success: true,
      applications

    });


  } catch (error) {

    console.log(error);


    res.status(500).json({

      success: false,
      message: "Server Error"

    });

  }

};

// Update Application Status
const updateApplicationStatus = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;
    const { status } = req.body;

    // Find Application
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Only the recruiter who owns the job can update status
    if (application.recruiterId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Update Status
    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get My Applications
const getMyApplications = async (req, res) => {
  try {

    const applications = await Application.find({
      studentId: req.user.id
    })
      .populate(
        "jobId",
        "title company location salary skills status"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  applyJob,
  getJobApplicants,
  updateApplicationStatus,
  getMyApplications,
};