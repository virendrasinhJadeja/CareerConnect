import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    resume: "",
    profilePhoto: "",
  });

  const [resume, setResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
        resume: res.data.user.resume || "",
        profilePhoto: res.data.user.profilePhoto || "",
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
      const res = await API.put("/auth/profile", {
        fullName: formData.fullName,
        phone: formData.phone,
        college: formData.college,
      });

      toast.success(res.data.message);
      fetchProfile();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    }
  };

  const handleResumeUpload = async () => {
    if (!resume) {
      toast.error("Please select a resume");
      return;
    }

    const data = new FormData();
    data.append("resume", resume);

    try {
      const res = await API.post(
        "/student/upload-resume",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message);
      fetchProfile();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Resume upload failed"
      );
    }
  };

  const handlePhotoUpload = async () => {
    if (!profilePhoto) {
      toast.error("Please select a profile photo");
      return;
    }

    const data = new FormData();
    data.append("profilePhoto", profilePhoto);

    try {
      const res = await API.post(
        "/student/upload-photo",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message);
      fetchProfile();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Photo upload failed"
      );
    }
  };


    return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">

      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      {/* Profile Photo */}

      <div className="flex flex-col items-center mb-8">

        <img
          src={
            formData.profilePhoto
              ? `http://localhost:5000/${formData.profilePhoto}`
              : `https://ui-avatars.com/api/?name=${formData.fullName}`
          }
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
        />

        <input
          type="file"
          accept="image/*"
          className="mt-4"
          onChange={(e) =>
            setProfilePhoto(e.target.files[0])
          }
        />

        <button
          type="button"
          onClick={handlePhotoUpload}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Upload Photo
        </button>

      </div>

      {/* Profile Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

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

      <hr className="my-8" />

      {/* Resume */}

      <h2 className="text-2xl font-bold mb-4">
        Upload Resume
      </h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) =>
          setResume(e.target.files[0])
        }
        className="w-full border rounded-lg p-3"
      />

      <button
        type="button"
        onClick={handleResumeUpload}
        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
      >
        Upload Resume
      </button>

      {formData.resume && (
        <a
          href={`http://localhost:5000/${formData.resume}`}
          target="_blank"
          rel="noreferrer"
          className="block mt-4 text-center bg-blue-100 text-blue-700 py-3 rounded-lg"
        >
          View Uploaded Resume
        </a>
      )}

      <hr className="my-8" />

            {/* Change Password */}

      <h2 className="text-2xl font-bold mb-4">
        Change Password
      </h2>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (
            passwordData.newPassword !==
            passwordData.confirmPassword
          ) {
            toast.error("Passwords do not match");
            return;
          }

          try {
            const res = await API.put(
              "/auth/change-password",
              {
                currentPassword:
                  passwordData.currentPassword,
                newPassword:
                  passwordData.newPassword,
              }
            );

            toast.success(res.data.message);

            setPasswordData({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            });

          } catch (error) {
            toast.error(
              error.response?.data?.message ||
                "Password change failed"
            );
          }
        }}
        className="space-y-5"
      >

        <input
          type="password"
          placeholder="Current Password"
          value={passwordData.currentPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              currentPassword: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          placeholder="New Password"
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              newPassword: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={passwordData.confirmPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              confirmPassword: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
        >
          Change Password
        </button>

      </form>

    </div>
  );
}

export default Profile;