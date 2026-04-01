import { useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ChangeAdminPasswordModal = ({ admin, token, onClose, onSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const res = await fetch(`${API}/api/admin/change-password/${admin.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      onSuccess();
    } else {
      setError(data.message || "Failed to update password");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
        <h3 className="font-semibold text-lg mb-4">
          Change Password — {admin.username}
        </h3>

        <input
          type="password"
          className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="New Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeAdminPasswordModal;