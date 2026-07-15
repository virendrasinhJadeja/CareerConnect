import { useState } from "react";
import API from "../services/api";

function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/jobs/create", formData);

      toast.success(res.data.message);

      setFormData({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        skills: "",
      });

    } catch (error) {
      alert(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Post New Job
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className="w-full border p-3 rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          className="w-full border p-3 rounded"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          className="w-full border p-3 rounded"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full border p-3 rounded"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          className="w-full border p-3 rounded"
          value={formData.salary}
          onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (React, Node.js, MongoDB)"
          className="w-full border p-3 rounded"
          value={formData.skills}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Post Job
        </button>

      </form>

    </div>
  );
}

export default PostJob;