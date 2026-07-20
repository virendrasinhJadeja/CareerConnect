import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-xl p-10 text-center max-w-lg">

        <FaExclamationTriangle
          className="text-yellow-500 text-7xl mx-auto mb-5"
        />

        <h1 className="text-6xl font-bold text-gray-800">
          404
        </h1>

        <h2 className="text-2xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
        >
          Go Home
        </Link>

      </div>

    </div>
  );
}

export default NotFound;