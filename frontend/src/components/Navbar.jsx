import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          CareerConnect
        </Link>

        {/* Menu */}
        <div className="flex gap-8 items-center">

          <a href="#features" className="hover:text-blue-600">
            Features
          </a>

          <a href="#companies" className="hover:text-blue-600">
            Companies
          </a>

          <a href="#contact" className="hover:text-blue-600">
            Contact
          </a>

          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;