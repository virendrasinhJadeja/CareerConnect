import { useEffect, useState } from "react";
import API from "../services/api";

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
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <p>You haven't applied to any jobs yet.</p>
      ) : (
        <div className="grid gap-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold">
                {application.jobId.title}
              </h2>

              <p>
                <strong>Company:</strong> {application.jobId.company}
              </p>

              <p>
                <strong>Location:</strong> {application.jobId.location}
              </p>

              <p>
                <strong>Salary:</strong> ₹{application.jobId.salary}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="font-semibold text-blue-600">
                  {application.status}
                </span>
              </p>

              <p>
                <strong>Applied On:</strong>{" "}
                {new Date(application.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;