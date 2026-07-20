import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Briefcase, LogOut } from "lucide-react";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white flex flex-col shadow-xl">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-blue-400">
          CareerConnect
        </h1>
        <p className="text-sm text-gray-400">
          Admin Panel
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`
          }
        >
          <Users size={20} />
          Users
        </NavLink>

        <NavLink
          to="/admin/jobs"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`
          }
        >
          <Briefcase size={20} />
          Jobs
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          className="flex items-center gap-3 w-full p-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;