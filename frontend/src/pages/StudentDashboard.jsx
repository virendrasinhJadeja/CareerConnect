import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function StudentDashboard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/student/profile");
      setStudent(res.data.student);
    } catch (error) {
      console.log(error);
    }
  };

  if (!student) {
    return <h2 className="text-center text-xl">Loading...</h2>;
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white shadow-lg mb-8">
  <h1 className="text-4xl font-bold">
    Welcome, {student.fullName} 👋
  </h1>

  <p className="mt-2 text-blue-100">
    Welcome to CareerConnect Placement Portal
  </p>
</div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-blue-500 text-white rounded-lg p-6 shadow">
          <h3 className="text-lg">Student</h3>
          <p className="text-2xl font-bold mt-2">
            {student.fullName}
          </p>
        </div>

        <div className="bg-green-500 text-white rounded-lg p-6 shadow">
          <h3 className="text-lg">College</h3>
          <p className="text-xl font-bold mt-2">
            {student.college}
          </p>
        </div>

        <div className="bg-purple-500 text-white rounded-lg p-6 shadow">
          <h3 className="text-lg">Resume</h3>
          <p className="text-xl font-bold mt-2">
            {student.resume ? "Uploaded" : "Not Uploaded"}
          </p>
        </div>

        <div className="bg-orange-500 text-white rounded-lg p-6 shadow">
          <h3 className="text-lg">Role</h3>
          <p className="text-xl font-bold mt-2">
            {student.role}
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6 my-8">

  <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700">
    Browse Jobs
  </button>

  <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700">
    Update Profile
  </button>

  <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700">
    My Applications
  </button>

</div>

      <div className="bg-white rounded-lg shadow mt-8 p-6">
        <h2 className="text-2xl font-bold mb-4">
          Profile Information
        </h2>

        <p><strong>Name:</strong> {student.fullName}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Phone:</strong> {student.phone}</p>
        <p><strong>College:</strong> {student.college}</p>
      </div>
    </div>
  );
}

export default StudentDashboard;