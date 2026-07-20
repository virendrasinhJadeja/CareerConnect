import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-6">

        <h1 className="text-3xl font-bold mb-10">
          CareerConnect
        </h1>

        <div className="space-y-4">

          {user?.role === "student" && (
            <>
              <Link
                to="/student/dashboard"
                className="block hover:bg-blue-600 p-3 rounded"
              >
                Dashboard
              </Link>

              <Link
                to="/jobs"
                className="block hover:bg-blue-600 p-3 rounded"
              >
                Jobs
              </Link>

              <Link
                to="/my-applications"
                className="block hover:bg-blue-600 p-3 rounded"
              >
                My Applications
              </Link>

              <Link
                to="/profile"
                className="block hover:bg-blue-600 p-3 rounded"
              >
                Profile
              </Link>
            </>
          )}

          {user?.role === "recruiter" && (
            <>
              <Link
                to="/recruiter/dashboard"
                className="block hover:bg-blue-600 p-3 rounded"
              >
                Dashboard
              </Link>

              <Link
                to="/post-job"
                className="block hover:bg-blue-600 p-3 rounded"
              >
                Post Job
              </Link>

              <Link
                to="/applicants"
                className="block hover:bg-blue-600 p-3 rounded"
              >
                Applicants
              </Link>
            </>
          )}

          <button
            onClick={logout}
            className="w-full bg-red-500 mt-10 p-3 rounded"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Main Content */}
<div className="flex-1 p-8">

  <div className="bg-white rounded-lg shadow p-5 mb-6">
    <h2 className="text-2xl font-bold">
      Welcome, {user?.fullName}
    </h2>

    <p className="text-gray-500">
      {user?.role.toUpperCase()}
    </p>
  </div>

  <Outlet />

</div>
    </div>
  );
}

export default DashboardLayout;