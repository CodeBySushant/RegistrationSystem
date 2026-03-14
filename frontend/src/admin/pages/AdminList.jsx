import React, { useEffect, useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminList = () => {
  const { token, admin } = useAdminAuth();
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
  const res = await fetch("http://localhost:5000/api/admin/all-admins", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (data.success) setAdmins(data.admins);
};


  const deleteAdmin = async (id) => {
  if (!window.confirm("Delete this admin?")) return;

  const res = await fetch(
    `http://localhost:5000/api/admin/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  if (data.success) fetchAdmins();
};


  useEffect(() => {
    fetchAdmins();
  }, []);

  if (admin?.role !== "SUPERADMIN") {
    return <h1 className="text-red-600 text-xl">Access Denied</h1>;
  }

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Admin Users</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Ward</th>
            <th className="p-2">Role</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((a) => (
            <tr key={a.id} className="border-t">
              <td className="p-2">{a.name}</td>
              <td className="p-2">{a.ward_number}</td>
              <td className="p-2">{a.role}</td>
              <td className="p-2">
                <button
                  onClick={() => deleteAdmin(a.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminList;
