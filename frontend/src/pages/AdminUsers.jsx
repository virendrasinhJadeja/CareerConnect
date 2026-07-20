import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import {
  FaUsers,
  FaSearch,
  FaTrash,
  FaUserGraduate,
  FaBuilding,
  FaUserShield,
} from "react-icons/fa";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data.users);
      setFilteredUsers(res.data.users);
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/admin/users/${id}`);

      toast.success(res.data.message);

      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete Failed"
      );
    }
  };

  const handleSearch = (value) => {
    setSearch(value);

    const filtered = users.filter((user) =>
      user.fullName.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase()) ||
      user.role.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  const getBadge = (role) => {
    if (role === "student") {
      return (
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          Student
        </span>
      );
    }

    if (role === "recruiter") {
      return (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          Recruiter
        </span>
      );
    }

    return (
      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
        Admin
      </span>
    );
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            User Management
          </h1>

          <p className="text-gray-500">
            Manage Students, Recruiters and Admins
          </p>
        </div>

        <div className="bg-blue-600 text-white px-6 py-4 rounded-xl shadow">
          <div className="flex items-center gap-3">
            <FaUsers size={28} />
            <div>
              <p>Total Users</p>
              <h2 className="text-2xl font-bold">
                {users.length}
              </h2>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <div className="relative">

          <FaSearch
            className="absolute top-4 left-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by Name, Email or Role..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full border rounded-lg pl-12 p-3"
          />

        </div>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">College / Company</th>
              <th className="p-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr
                key={user._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">

                  <div className="flex items-center gap-3">

                    <div className="bg-blue-100 p-3 rounded-full">

                      {user.role === "student" && (
                        <FaUserGraduate />
                      )}

                      {user.role === "recruiter" && (
                        <FaBuilding />
                      )}

                      {user.role === "admin" && (
                        <FaUserShield />
                      )}

                    </div>

                    <div>

                      <p className="font-bold">
                        {user.fullName}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {getBadge(user.role)}
                </td>

                <td className="p-4">
                  {user.role === "student"
                    ? user.college || "-"
                    : user.company || "-"}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminUsers;