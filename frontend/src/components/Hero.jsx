import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col lg:flex-row items-center justify-between">

        {/* Left */}
        <div className="lg:w-1/2">

          <h1 className="text-5xl font-bold leading-tight">
            Find Your Dream Job
            <br />
            with CareerConnect
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Connect students with recruiters.
            Apply for jobs, manage applications,
            and build your career in one place.
          </p>

          <div className="mt-8 flex gap-4">

            <Link
              to="/register"
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
            >
              Login
            </Link>

          </div>

        </div>

        {/* Right */}
        <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">

          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800"
            alt="Career"
            className="rounded-2xl shadow-2xl w-full max-w-lg"
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;