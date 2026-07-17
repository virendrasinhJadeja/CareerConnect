import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");

      setFormData({
        fullName: res.data.user.fullName || "",
        email: res.data.user.email || "",
        phone: res.data.user.phone || "",
        college: res.data.user.college || "",
      });
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.put("/auth/profile", formData);

    toast.success(res.data.message);

    fetchProfile();

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Update Failed"
    );
  }
};

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="Full Name"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full border rounded-lg p-3 bg-gray-100"
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="Phone"
        />

        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="College"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Update Profile
        </button>

      </form>
    </div>
  );
}

export default Profile;