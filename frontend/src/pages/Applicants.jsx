import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Applicants() {

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [applications, setApplications] = useState([]);


  // Get Recruiter Jobs
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


  // Get Applicants
  const fetchApplicants = async (jobId) => {

    try {

      const res = await API.get(
        `/applications/job/${jobId}`
      );

      setApplications(res.data.applications);

    } catch (error) {

      console.log(error);

    }

  };


  // Update Status
  const updateStatus = async (
    applicationId,
    status
  ) => {

    try {

      const res = await API.put(
        `/applications/status/${applicationId}`,
        {
          status
        }
      );


      toast.success(res.data.message);


      fetchApplicants(selectedJob);


    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed"
      );

    }

  };


  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        Applicants
      </h1>


      {/* Select Job */}

      <div className="bg-white shadow rounded-lg p-5 mb-8">

        <h2 className="text-xl font-bold mb-3">
          Select Job
        </h2>


        <select

          className="border p-3 rounded w-full"

          value={selectedJob}

          onChange={(e)=>{

            setSelectedJob(e.target.value);

            fetchApplicants(e.target.value);

          }}

        >

          <option value="">
            Select Job
          </option>


          {
            jobs.map((job)=>(

              <option
                key={job._id}
                value={job._id}
              >

                {job.title}

              </option>

            ))
          }


        </select>


      </div>



      {/* Applicants Table */}


      <div className="bg-white shadow rounded-lg p-6">


        <h2 className="text-2xl font-bold mb-5">
          Applicant List
        </h2>


        {
          applications.length === 0 ?

          (

            <p>
              No applicants found
            </p>

          )

          :

          (

          <div className="overflow-x-auto">


          <table className="w-full border">


          <thead>

          <tr className="bg-gray-100">

            <th className="p-3 border">
              Name
            </th>

            <th className="p-3 border">
              Email
            </th>

            <th className="p-3 border">
              College
            </th>

            <th className="p-3 border"> 
              Phone 
              </th> 
              
              <th className="p-3 border"> 
                Resume 
                </th>

            <th className="p-3 border">
              Status
            </th>

            <th className="p-3 border">
              Action
            </th>


          </tr>

          </thead>


          <tbody>


          {
            applications.map((app)=>(


            <tr key={app._id}>


              <td className="border p-3">
                {app.studentId.fullName}
              </td>


              <td className="border p-3">
                {app.studentId.email}
              </td>


              <td className="border p-3">
                {app.studentId.college}
              </td>

              <td className="border p-3">
  {app.studentId.phone}
</td>

<td className="border p-3">
  {app.studentId.resume ? (
    <a
  href={app.studentId.resume}
  target="_blank"
  rel="noreferrer"
  className="text-blue-600 underline"
>
  View Resume
</a>
  ) : (
    "No Resume"
  )}
</td>


              <td className="border p-3">

                <span className="bg-blue-100 px-3 py-1 rounded">

                  {app.status}

                </span>

              </td>


              <td className="border p-3 space-x-2">


                <button

                onClick={()=>
                  updateStatus(
                    app._id,
                    "shortlisted"
                  )
                }

                className="bg-green-600 text-white px-3 py-1 rounded"
                >

                  Shortlist

                </button>



                <button

                onClick={()=>
                  updateStatus(
                    app._id,
                    "rejected"
                  )
                }

                className="bg-red-600 text-white px-3 py-1 rounded"
                >

                  Reject

                </button>


              </td>


            </tr>


            ))

          }


          </tbody>


          </table>


          </div>

          )

        }


      </div>


    </div>

  );

}


export default Applicants;