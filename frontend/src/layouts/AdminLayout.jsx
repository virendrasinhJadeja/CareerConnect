import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaTachometerAlt,
  FaUsers,
  FaBriefcase,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white">

        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold">
            CareerConnect
          </h1>

          <p className="text-sm text-gray-400">
            Admin Panel
          </p>
        </div>

        <div className="p-5 space-y-3">

          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 p-3 rounded hover:bg-slate-700"
          >
            <FaTachometerAlt />
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-3 p-3 rounded hover:bg-slate-700"
          >
            <FaUsers />
            Users
          </Link>

          <Link
            to="/admin/jobs"
            className="flex items-center gap-3 p-3 rounded hover:bg-slate-700"
          >
            <FaBriefcase />
            Jobs
          </Link>

          <Link
            to="/admin/applications"
            className="flex items-center gap-3 p-3 rounded hover:bg-slate-700"
          >
            <FaFileAlt />
            Applications
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-3 mt-10 bg-red-600 hover:bg-red-700 p-3 rounded w-full"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>
      </div>

      {/* Main */}
      <div className="flex-1">

        {/* Navbar */}
        <div className="bg-white shadow p-5 flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            Admin Dashboard
          </h2>

          <div className="text-right">
            <p className="font-bold">
              {user?.fullName}
            </p>

            <p className="text-gray-500">
              ADMIN
            </p>
          </div>

        </div>

        <div className="p-8">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default AdminLayout;