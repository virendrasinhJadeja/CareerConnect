import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTools,
  FaBriefcase,
} from "react-icons/fa";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
const [location, setLocation] = useState("");
const [filteredJobs, setFilteredJobs] = useState([]);

const [company, setCompany] = useState("");
const [status, setStatus] = useState("");
const [salary, setSalary] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data.jobs);
      setFilteredJobs(res.data.jobs);
    } catch (error) {
      toast.error("Failed to load jobs");
    }
  };

  const applyJob = async (jobId) => {
    try {
      const res = await API.post(`/applications/apply/${jobId}`);

      toast.success(res.data.message);

      fetchJobs();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to apply"
      );
    }
  };

  const handleSearch = () => {
  const filtered = jobs.filter((job) => {
    const titleMatch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const locationMatch = job.location
      .toLowerCase()
      .includes(location.toLowerCase());

    const companyMatch = job.company
      .toLowerCase()
      .includes(company.toLowerCase());

    const statusMatch =
      status === "" || job.status === status;

    const salaryMatch =
      salary === "" || job.salary >= Number(salary);

    return (
      titleMatch &&
      locationMatch &&
      companyMatch &&
      statusMatch &&
      salaryMatch
    );
  });

  setFilteredJobs(filtered);
};

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Available Jobs
      </h1>

      <div className="bg-white shadow rounded-xl p-5 mb-8">

  <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">

    <input
      type="text"
      placeholder="Search Job"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-3 rounded-lg"
    />

    <input
      type="text"
      placeholder="Location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="border p-3 rounded-lg"
    />

    <input
      type="text"
      placeholder="Company"
      value={company}
      onChange={(e) => setCompany(e.target.value)}
      className="border p-3 rounded-lg"
    />

    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="border p-3 rounded-lg"
    >
      <option value="">All Status</option>
      <option value="active">Active</option>
      <option value="closed">Closed</option>
    </select>

    <input
      type="number"
      placeholder="Minimum Salary"
      value={salary}
      onChange={(e) => setSalary(e.target.value)}
      className="border p-3 rounded-lg"
    />

    <div className="flex gap-2">

      <button
        onClick={handleSearch}
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        Search
      </button>

      <button
        onClick={() => {
          setSearch("");
          setLocation("");
          setCompany("");
          setStatus("");
          setSalary("");
          setFilteredJobs(jobs);
        }}
        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
      >
        Reset
      </button>

    </div>

  </div>

</div>

      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h3 className="text-xl font-semibold">
            No Jobs Available
          </h3>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <FaBriefcase />
                {job.title}
              </h2>

              <p className="flex items-center gap-2 mb-2">
                <FaBuilding className="text-blue-600" />
                <strong>Company:</strong> {job.company}
              </p>

              <p className="flex items-center gap-2 mb-2">
                <FaMapMarkerAlt className="text-red-500" />
                <strong>Location:</strong> {job.location}
              </p>

              <p className="flex items-center gap-2 mb-2">
                <FaMoneyBillWave className="text-green-600" />
                <strong>Salary:</strong> ₹{job.salary}
              </p>

              <p className="flex items-center gap-2 mb-4">
                <FaTools className="text-yellow-500" />
                <strong>Skills:</strong> {job.skills}
              </p>

              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    job.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.status}
                </span>

                <button
                  onClick={() => applyJob(job._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;