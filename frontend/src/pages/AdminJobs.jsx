import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/admin/jobs");
      setJobs(res.data.jobs);
    } catch (error) {
      toast.error("Failed to load jobs");
    }
  };

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/admin/jobs/${id}`);
      toast.success(res.data.message);
      fetchJobs();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete failed"
      );
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Job Management
      </h1>

      <input
        type="text"
        placeholder="Search by title or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg p-3 w-full mb-6"
      />

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Company</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Salary</th>
              <th className="p-3 border">Recruiter</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredJobs.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6"
                >
                  No jobs found.
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => (
                <tr key={job._id}>
                  <td className="border p-3">
                    {job.title}
                  </td>

                  <td className="border p-3">
                    {job.company}
                  </td>

                  <td className="border p-3">
                    {job.location}
                  </td>

                  <td className="border p-3">
                    ₹{job.salary}
                  </td>

                  <td className="border p-3">
                    {job.recruiter?.fullName || "N/A"}
                  </td>

                  <td className="border p-3">
                    <button
                      onClick={() => deleteJob(job._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminJobs;