import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs/my-jobs");
      setJobs(res.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJob = async (jobId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this job?"
  );

  if (!confirmDelete) return;

  try {
    const res = await API.delete(`/jobs/${jobId}`);

    console.log("Delete Success:", res.data);

    toast.success(res.data.message);

    fetchJobs();

  } catch (error) {
    console.log("Delete Error:", error.response?.status);
    console.log("Delete Response:", error.response?.data);

    toast.error(error.response?.data?.message || "Delete Failed");
  }
};

  const activeJobs = jobs.filter(job => job.status === "active").length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Recruiter Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-blue-500 text-white rounded-lg p-6 shadow">
          <h3>Total Jobs</h3>
          <p className="text-3xl font-bold">{jobs.length}</p>
        </div>

        <div className="bg-green-500 text-white rounded-lg p-6 shadow">
          <h3>Active Jobs</h3>
          <p className="text-3xl font-bold">{activeJobs}</p>
        </div>

        <div className="bg-purple-500 text-white rounded-lg p-6 shadow">
          <h3>Company</h3>
          <p className="text-lg font-bold">
            {jobs.length ? jobs[0].company : "-"}
          </p>
        </div>

        <div className="bg-orange-500 text-white rounded-lg p-6 shadow">
          <h3>Recruiter</h3>
          <p className="text-lg font-bold">
            {user?.fullName}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-lg shadow mt-8 p-6">
        <h2 className="text-2xl font-bold mb-4">
          My Jobs
        </h2>

        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="border rounded-lg p-4"
              >
                <h3 className="text-xl font-bold">
                  {job.title}
                </h3>

                <p>📍 {job.location}</p>
                <p>💰 ₹{job.salary}</p>
                <p>🟢 {job.status}</p>

                <div className="mt-4 flex gap-3">

 <Link
  to={`/edit-job/${job._id}`}
  className="bg-yellow-500 text-white px-4 py-2 rounded"
>
  Edit
</Link>

  <button
    onClick={() => deleteJob(job._id)}
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Delete
  </button>

</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecruiterDashboard;