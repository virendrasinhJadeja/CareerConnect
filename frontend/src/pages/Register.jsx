import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    college: "",
    role: "student",
    company: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/register", formData);

    console.log("SUCCESS:", res.data);

    toast.success(res.data.message);

    setTimeout(() => {
      navigate("/login");
    }, 1500);

  } catch (error) {
    console.log("ERROR:", error);
    console.log("ERROR RESPONSE:", error.response);

    toast.error(error.response?.data?.message || "Registration Failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Register
        </h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="w-full border p-3 rounded mb-4"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="w-full border p-3 rounded mb-4"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="college"
          placeholder="College"
          className="w-full border p-3 rounded mb-4"
          value={formData.college}
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-3 rounded mb-4"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
        </select>

        {formData.role === "recruiter" && (
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            className="w-full border p-3 rounded mb-4"
            value={formData.company}
            onChange={handleChange}
          />
        )}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded"
        >
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;