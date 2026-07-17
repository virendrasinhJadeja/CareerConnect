import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data.jobs);
    } catch (error) {
      toast.error("Failed to load jobs");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Jobs</h2>

      {jobs.length === 0 ? (
        <p>No Jobs Available</p>
      ) : (
        <div className="row">
          {jobs.map((job) => (
            <div className="col-md-6 mb-4" key={job._id}>
              <div className="card shadow">
                <div className="card-body">
                  <h4>{job.title}</h4>

                  <p><strong>Company:</strong> {job.company}</p>

                  <p><strong>Location:</strong> {job.location}</p>

                  <p><strong>Salary:</strong> ₹{job.salary}</p>

                  <p><strong>Skills:</strong> {job.skills}</p>

                  <p><strong>Status:</strong> {job.status}</p>

                  <button
                    className="btn btn-success"
                  >
                    Apply Now
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;