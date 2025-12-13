import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "./context/AdminAuthContext";
import { ShieldCheck } from "lucide-react";

const AdminLogin = () => {
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(form.username, form.password);
    if (result.success) {
      navigate("/admin");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900 px-4">
      
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 w-full max-w-md shadow-xl">
        
        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-16 h-16 text-blue-300" />
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
          <p className="text-blue-200 mt-2">Secure Access • Municipality System</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-center text-red-400 font-semibold bg-red-900/40 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="text-white text-sm">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 bg-white/10 text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>

    </div>
  );
};

export default AdminLogin;
