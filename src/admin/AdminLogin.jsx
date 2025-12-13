import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "./context/AdminAuthContext";

const AdminLogin = () => {
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form.username, form.password);

    if (result.success) {
      navigate("/admin");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <label>Username</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <label>Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
