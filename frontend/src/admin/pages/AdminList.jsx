import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ChangeAdminPasswordModal from "../components/ChangeAdminPasswordModal";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminList = () => {
  const { token, user } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [msg, setMsg] = useState("");

  const fetchAdmins = async () => {
    const res = await fetch(`${API}/api/admin/all-admins`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) setAdmins(data.admins);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const showMsg = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 3000);
  };

  const deleteAdmin = async (id) => {
    if (!window.confirm("Delete this admin?")) return;
    const res = await fetch(`${API}/api/admin/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      showMsg("Admin deleted successfully");
      fetchAdmins();
    }
  };

  const promote = async (id) => {
    if (!window.confirm("Promote this admin to SUPERADMIN?")) return;
    const res = await fetch(`${API}/api/admin/promote/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      showMsg(data.message);
      fetchAdmins();
    }
  };

  const demote = async (id) => {
    if (!window.confirm("Demote this SUPERADMIN to Admin?")) return;
    const res = await fetch(`${API}/api/admin/demote/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      showMsg(data.message);
      fetchAdmins();
    }
  };

  const toggleStatus = async (id, isActive) => {
    const action = isActive ? "Freeze" : "Activate";
    if (!window.confirm(`${action} this admin?`)) return;
    const res = await fetch(`${API}/api/admin/status/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive: !isActive }),
    });
    const data = await res.json();
    if (data.success) {
      showMsg(`Admin ${action}d successfully`);
      fetchAdmins();
    }
  };

  if (user?.role !== "SUPERADMIN") {
    return <h1 className="text-red-600 text-xl">Access Denied</h1>;
  }

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Admin Users</h1>

      {msg && (
        <div className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded">
          {msg}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Username</th>
              <th className="p-3">Ward</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((a) => (
              <tr key={a.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{a.name}</td>
                <td className="p-3">{a.username}</td>
                <td className="p-3">{a.ward_number ?? "—"}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    a.role === "SUPERADMIN"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {a.role}
                  </span>
                </td>
                <td className="p-3">
                  {a.is_active ? (
                    <span className="text-green-600 font-medium">Active</span>
                  ) : (
                    <span className="text-red-600 font-medium">Frozen</span>
                  )}
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => setSelectedAdmin(a)}
                    className="px-3 py-1 text-xs border border-gray-400 rounded hover:bg-gray-100"
                  >
                    Change Password
                  </button>

                  {a.role === "ADMIN" ? (
                    <button
                      onClick={() => promote(a.id)}
                      className="px-3 py-1 text-xs border border-blue-400 text-blue-600 rounded hover:bg-blue-50"
                    >
                      Promote
                    </button>
                  ) : (
                    <button
                      onClick={() => demote(a.id)}
                      className="px-3 py-1 text-xs border border-yellow-400 text-yellow-600 rounded hover:bg-yellow-50"
                    >
                      Demote
                    </button>
                  )}

                  <button
                    onClick={() => toggleStatus(a.id, a.is_active)}
                    className={`px-3 py-1 text-xs rounded ${
                      a.is_active
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-green-100 text-green-600 hover:bg-green-200"
                    }`}
                  >
                    {a.is_active ? "Freeze" : "Activate"}
                  </button>

                  <button
                    onClick={() => deleteAdmin(a.id)}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedAdmin && (
        <ChangeAdminPasswordModal
          admin={selectedAdmin}
          token={token}
          onClose={() => setSelectedAdmin(null)}
          onSuccess={() => {
            showMsg("Password changed successfully");
            setSelectedAdmin(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminList;