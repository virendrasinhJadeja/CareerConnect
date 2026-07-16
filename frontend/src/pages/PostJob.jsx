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

      toast.success(res.data.message);

      setJob({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        skills: "",
      });

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">

      <h2 className="text-2xl font-bold mb-6">
        Post New Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          rows="4"
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={job.company}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={job.salary}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (React, Node, MongoDB)"
          value={job.skills}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Post Job
        </button>

      </form>

    </div>
  );
}

export default PostJob;