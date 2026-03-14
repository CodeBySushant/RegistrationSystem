import { useState } from "react";
import ChangeAdminPasswordModal from "./ChangeAdminPasswordModal";

const admins = [
  { _id: "1", name: "Ram", username: "ram", ward: 1, role: "admin", isActive: true },
  { _id: "2", name: "Shyam", username: "shyam", ward: 2, role: "super_admin", isActive: true },
];

const AdminTable = () => {
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const promote = (id) => {
    // API: PATCH /api/admin/promote/:id
    console.log("Promote", id);
  };

  const demote = (id) => {
    // API: PATCH /api/admin/demote/:id
    console.log("Demote", id);
  };

  const toggleStatus = (id, active) => {
    // API: PATCH /api/admin/status/:id
    console.log(active ? "Freeze" : "Activate", id);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th>Username</th>
            <th>Ward</th>
            <th>Role</th>
            <th>Status</th>
            <th className="text-right p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((a) => (
            <tr key={a._id} className="border-b">
              <td className="p-3">{a.name}</td>
              <td>{a.username}</td>
              <td>{a.ward}</td>
              <td>
                <span className="px-2 py-1 rounded bg-gray-100 text-xs">
                  {a.role}
                </span>
              </td>
              <td>
                {a.isActive ? (
                  <span className="text-green-600">Active</span>
                ) : (
                  <span className="text-red-600">Frozen</span>
                )}
              </td>

              <td className="p-3 text-right space-x-2">
                <button
                  className="btn-outline"
                  onClick={() => setSelectedAdmin(a)}
                >
                  Change Password
                </button>

                {a.role === "admin" ? (
                  <button className="btn-outline" onClick={() => promote(a._id)}>
                    Promote
                  </button>
                ) : (
                  <button className="btn-outline" onClick={() => demote(a._id)}>
                    Demote
                  </button>
                )}

                <button
                  className="btn-danger"
                  onClick={() => toggleStatus(a._id, a.isActive)}
                >
                  {a.isActive ? "Freeze" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAdmin && (
        <ChangeAdminPasswordModal
          admin={selectedAdmin}
          onClose={() => setSelectedAdmin(null)}
        />
      )}
    </div>
  );
};

export default AdminTable;
