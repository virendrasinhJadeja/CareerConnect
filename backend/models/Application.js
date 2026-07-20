const mongoose = require("mongoose");


const applicationSchema = new mongoose.Schema(
  {

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },


    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    status: {
  type: String,
  enum: ["Applied", "Shortlisted", "Interview", "Selected", "Rejected"],
  default: "Applied",
},

  },
  {
    timestamps: true,
  }
);



const Application = mongoose.model(
  "Application",
  applicationSchema
);


module.exports = Application;