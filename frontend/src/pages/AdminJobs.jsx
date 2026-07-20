import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import {
  FaSearch,
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTrash,
} from "react-icons/fa";

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/admin/jobs");
      setJobs(res.data.jobs);
      setFilteredJobs(res.data.jobs);
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

  const handleSearch = (value) => {
    setSearch(value);

    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(value.toLowerCase()) ||
        job.company.toLowerCase().includes(value.toLowerCase()) ||
        job.location.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredJobs(filtered);
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Job Management
          </h1>

          <p className="text-gray-500">
            Manage all posted jobs
          </p>

        </div>

        <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow">

          <div className="flex items-center gap-3">

            <FaBriefcase size={28} />

            <div>

              <p>Total Jobs</p>

              <h2 className="text-2xl font-bold">
                {jobs.length}
              </h2>

            </div>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <div className="relative">

          <FaSearch
            className="absolute top-4 left-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by Title, Company or Location..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full border rounded-lg pl-12 p-3"
          />

        </div>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Job
              </th>

              <th className="p-4 text-left">
                Company
              </th>

              <th className="p-4 text-left">
                Location
              </th>

              <th className="p-4 text-left">
                Salary
              </th>

              <th className="p-4 text-left">
                Recruiter
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredJobs.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center p-8"
                >
                  No Jobs Found
                </td>

              </tr>

            ) : (

              filteredJobs.map((job) => (

                <tr
                  key={job._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div className="bg-blue-100 p-3 rounded-full">
                        <FaBriefcase />
                      </div>

                      <div>

                        <p className="font-bold">
                          {job.title}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="p-4">

                    <div className="flex items-center gap-2">

                      <FaBuilding className="text-blue-600"/>

                      {job.company}

                    </div>

                  </td>

                  <td className="p-4">

                    <div className="flex items-center gap-2">

                      <FaMapMarkerAlt className="text-red-500"/>

                      {job.location}

                    </div>

                  </td>

                  <td className="p-4">

                    <div className="flex items-center gap-2">

                      <FaMoneyBillWave className="text-green-600"/>

                      ₹{job.salary}

                    </div>

                  </td>

                  <td className="p-4">

                    {job.recruiter?.fullName || "N/A"}

                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => deleteJob(job._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
                    >
                      <FaTrash />
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