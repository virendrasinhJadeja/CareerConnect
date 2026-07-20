import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRecruiters: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  const [latestJobs, setLatestJobs] = useState([]);
  const [latestStudents, setLatestStudents] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data.stats);
      setLatestJobs(res.data.latestJobs);
      setLatestStudents(res.data.latestStudents);
      setRecentApplications(res.data.recentApplications);
    } catch (error) {
      toast.error("Failed to load dashboard");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-lg">Students</h2>
          <p className="text-4xl font-bold mt-3">
            {stats.totalStudents}
          </p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-lg">Recruiters</h2>
          <p className="text-4xl font-bold mt-3">
            {stats.totalRecruiters}
          </p>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow">
          <h2 className="text-lg">Jobs</h2>
          <p className="text-4xl font-bold mt-3">
            {stats.totalJobs}
          </p>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-lg">Applications</h2>
          <p className="text-4xl font-bold mt-3">
            {stats.totalApplications}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 mt-8">
  <h2 className="text-2xl font-bold mb-4">
    Latest Jobs
  </h2>

  {latestJobs.length === 0 ? (
    <p>No jobs found.</p>
  ) : (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-3">Title</th>
          <th className="border p-3">Company</th>
          <th className="border p-3">Location</th>
        </tr>
      </thead>

      <tbody>
        {latestJobs.map((job) => (
          <tr key={job._id}>
            <td className="border p-3">{job.title}</td>
            <td className="border p-3">{job.company}</td>
            <td className="border p-3">{job.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

<div className="bg-white shadow rounded-xl p-6 mt-8">
  <h2 className="text-2xl font-bold mb-4">
    Latest Students
  </h2>

  {latestStudents.length === 0 ? (
    <p>No students found.</p>
  ) : (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-3">Name</th>
          <th className="border p-3">Email</th>
          <th className="border p-3">College</th>
        </tr>
      </thead>

      <tbody>
        {latestStudents.map((student) => (
          <tr key={student._id}>
            <td className="border p-3">
              {student.fullName}
            </td>

            <td className="border p-3">
              {student.email}
            </td>

            <td className="border p-3">
              {student.college}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

<div className="bg-white shadow rounded-xl p-6 mt-8">
  <h2 className="text-2xl font-bold mb-4">
    Recent Applications
  </h2>

  {recentApplications.length === 0 ? (
    <p>No applications found.</p>
  ) : (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-3">Student</th>
          <th className="border p-3">Email</th>
          <th className="border p-3">Job</th>
          <th className="border p-3">Company</th>
          <th className="border p-3">Status</th>
        </tr>
      </thead>

      <tbody>
        {recentApplications.map((app) => (
          <tr key={app._id}>
            <td className="border p-3">
              {app.studentId?.fullName}
            </td>

            <td className="border p-3">
              {app.studentId?.email}
            </td>

            <td className="border p-3">
              {app.jobId?.title}
            </td>

            <td className="border p-3">
              {app.jobId?.company}
            </td>

            <td className="border p-3">
              {app.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

      </div>
    </div>
  );
}


export default AdminDashboard;