import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    skills: "",
    status: "active",
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await API.get("/jobs/my-jobs");

      const job = res.data.jobs.find((j) => j._id === id);

      if (job) {
        setFormData(job);
      } else {
        toast.success("Job not found");
        navigate("/recruiter/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put(`/jobs/${id}`, formData);

      toast.success(res.data.message);

      navigate("/recruiter/dashboard");

    } catch (error) {
       console.log("Update Error:", error.response);
       console.log("Update Data:", error.response?.data);

      toast.error(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Edit Job
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          Update Job
        </button>

      </form>

    </div>
  );
}

export default EditJob;