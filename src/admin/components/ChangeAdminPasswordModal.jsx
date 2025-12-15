import { useState } from "react";

const ChangeAdminPasswordModal = ({ admin, onClose }) => {
  const [password, setPassword] = useState("");

  const submit = () => {
    // API: POST /api/admin/change-password/:id
    console.log("Change password for", admin._id, password);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="font-semibold mb-4">
          Change Password — {admin.username}
        </h3>

        <input
          type="password"
          className="input mb-4"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button className="btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={submit}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeAdminPasswordModal;
