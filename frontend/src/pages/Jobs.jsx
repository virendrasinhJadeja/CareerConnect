import { useEffect, useState } from "react";
import API from "../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  const applyJob = async (jobId) => {
    try {
      const res = await API.post(`/applications/apply/${jobId}`);
      toast.success(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to apply");
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Available Jobs
      </h1>

      <input
        type="text"
        placeholder="Search by title, company or location..."
        className="w-full border rounded-lg p-3 mb-8"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredJobs.length === 0 ? (
        <p>No Jobs Found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold">
                {job.title}
              </h2>

              <p className="mt-3">
                <strong>Company:</strong> {job.company}
              </p>

              <p>
                <strong>Location:</strong> {job.location}
              </p>

              <p>
                <strong>Salary:</strong> ₹{job.salary}
              </p>

              <p>
                <strong>Skills:</strong> {job.skills}
              </p>

              <button
                onClick={() => applyJob(job._id)}
                className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Apply Now
              </button>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Jobs;