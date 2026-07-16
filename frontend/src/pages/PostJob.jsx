import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function PostJob() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    skills: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/jobs", job);

    console.log("SUCCESS:", res.data);

    toast.success("Job Posted Successfully");

  } catch (error) {
    console.log("ERROR:", error);
    console.log("ERROR RESPONSE:", error.response);

    toast.error(error.response?.data?.message || "Failed to Post Job");
  }
};

  return (
    <div className="container mt-5">
      <h2>Post New Job</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Job Description"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (React, Node, MongoDB)"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <button className="btn btn-primary">
          Post Job
        </button>

      </form>
    </div>
  );
}

export default PostJob;