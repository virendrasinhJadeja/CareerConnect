import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data.users);
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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        User Management
      </h1>

      <div className="bg-white shadow rounded-xl p-6">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Role</th>
              <th className="border p-3">College / Company</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border p-3">
                  {user.fullName}
                </td>

                <td className="border p-3">
                  {user.email}
                </td>

                <td className="border p-3">
                  {user.role}
                </td>

                <td className="border p-3">
                  {user.role === "student"
                    ? user.college
                    : user.company}
                </td>

                <td className="border p-3">
  <button
    onClick={() => deleteUser(user._id)}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
  >
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