const User = require("../models/User");


// Get Student Profile
const getStudentProfile = async (req, res) => {
  try {

    const student = await User.findById(req.user.id)
      .select("-password");


    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }


    res.status(200).json({
      success: true,
      student,
    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



// Update Student Profile
const updateStudentProfile = async (req, res) => {
  try {

    const {
      fullName,
      phone,
      college
    } = req.body;


    const student = await User.findByIdAndUpdate(
      req.user.id,
      {
        fullName,
        phone,
        college,
      },
      {
        new: true,
      }
    ).select("-password");


    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      student,
    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



// Upload Resume
const uploadResume = async (req, res) => {
     
  try {

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "Please upload a resume file",
      });

    }
     console.log(req.file);
  
    const student = await User.findByIdAndUpdate(
      req.user.id,
      {
        resume: req.file.path,
      },
      {
        new: true,
      }
    ).select("-password");


    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      student,
    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// Upload Profile Photo
const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a profile photo",
      });
    }

    const student = await User.findByIdAndUpdate(
      req.user.id,
      {
        profilePhoto: req.file.path,
      },
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile photo uploaded successfully",
      student,
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
  getStudentProfile,
  updateStudentProfile,
  uploadResume,
  uploadProfilePhoto,
};