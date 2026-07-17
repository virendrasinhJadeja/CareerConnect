import { useEffect, useState } from "react";
import API from "../services/api";
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications/my-applications");
      setApplications(res.data.applications);
    } catch (error) {
      toast.error("Failed to load applications");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "applied":
        return "bg-yellow-100 text-yellow-700";
      case "shortlisted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-xl font-semibold">
            You haven't applied to any jobs yet.
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <FaBriefcase />
                {application.jobId.title}
              </h2>

              <p className="flex items-center gap-2 mb-2">
                <FaBuilding />
                <strong>Company:</strong> {application.jobId.company}
              </p>

              <p className="flex items-center gap-2 mb-2">
                <FaMapMarkerAlt />
                <strong>Location:</strong> {application.jobId.location}
              </p>

              <p className="flex items-center gap-2 mb-2">
                <FaMoneyBillWave />
                <strong>Salary:</strong> ₹{application.jobId.salary}
              </p>

              <p className="flex items-center gap-2 mb-4">
                <FaCalendarAlt />
                <strong>Applied:</strong>{" "}
                {new Date(application.createdAt).toLocaleDateString()}
              </p>

              <span
                className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(
                  application.status
                )}`}
              >
                {application.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;