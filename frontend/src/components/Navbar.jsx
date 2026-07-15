import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          CareerConnect
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>

          {user ? (
            <>
              <span className="font-semibold">
                Welcome, {user.fullName}
              </span>

              {user.role === "student" ? (
                <Link to="/student/dashboard">Dashboard</Link>
              ) : (
                <Link to="/recruiter/dashboard">Dashboard</Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;