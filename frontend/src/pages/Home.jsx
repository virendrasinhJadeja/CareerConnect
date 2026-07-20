import Navbar from "../components/Navbar";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

       <Navbar />
       
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <h1 className="text-5xl md:text-6xl font-bold">
            CareerConnect
          </h1>

          <p className="mt-6 text-xl text-blue-100">
            A Smart Placement Management System for Students and Recruiters
          </p>

          <p className="mt-4 max-w-3xl mx-auto text-lg">
            Search jobs, apply instantly, manage applicants,
            and simplify the campus placement process with one platform.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              to="/login"
              className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-200"
            >
              Browse Jobs
            </Link>

            <Link
              to="/register"
              className="bg-green-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-600"
            >
              Get Started
            </Link>

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h2 className="text-4xl font-bold text-blue-600">
              100+
            </h2>
            <p className="mt-2 text-gray-600">
              Students
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h2 className="text-4xl font-bold text-green-600">
              50+
            </h2>
            <p className="mt-2 text-gray-600">
              Companies
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h2 className="text-4xl font-bold text-purple-600">
              200+
            </h2>
            <p className="mt-2 text-gray-600">
              Jobs Posted
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h2 className="text-4xl font-bold text-orange-600">
              500+
            </h2>
            <p className="mt-2 text-gray-600">
              Applications
            </p>
          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-6xl mx-auto px-6 pb-20">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose CareerConnect?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">
            <div className="text-5xl mb-4">🎓</div>

            <h3 className="text-2xl font-bold mb-3">
              Students
            </h3>

            <p className="text-gray-600">
              Apply for jobs, upload your resume,
              track applications and get placement updates.
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">
            <div className="text-5xl mb-4">🏢</div>

            <h3 className="text-2xl font-bold mb-3">
              Recruiters
            </h3>

            <p className="text-gray-600">
              Post jobs, manage applicants,
              shortlist candidates and hire efficiently.
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">
            <div className="text-5xl mb-4">🔒</div>

            <h3 className="text-2xl font-bold mb-3">
              Secure Platform
            </h3>

            <p className="text-gray-600">
              JWT Authentication, role-based access,
              and secure MERN architecture.
            </p>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-gray-900 text-white py-8">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-2xl font-bold">
            CareerConnect
          </h2>

          <p className="mt-3 text-gray-400">
            Placement Management System using MERN Stack
          </p>

          <p className="mt-4 text-gray-500 text-sm">
            © 2026 CareerConnect. All Rights Reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;