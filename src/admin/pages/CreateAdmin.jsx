import React, { useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";

const CreateAdmin = () => {
  const { token, admin } = useAdminAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    ward_number: "",
    position: "",
    username: "",
    password: "",
    role: "admin",
  });

  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/admin/create-admin", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMsg(data.message);

    if (data.success) {
      setForm({
        name: "",
        email: "",
        phone: "",
        ward_number: "",
        position: "",
        username: "",
        password: "",
        role: "admin",
      });
    }
  };

  if (admin?.role !== "SUPERADMIN") {
    return <h1 className="text-red-600 text-xl">Access Denied</h1>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Create New Admin</h1>

      {msg && <p className="text-blue-600 mb-3">{msg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "phone", "position", "username", "password"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        ))}

        <input
          type="number"
          placeholder="Ward Number"
          value={form.ward_number}
          onChange={(e) => setForm({ ...form, ward_number: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="admin">Ward Admin</option>
          <option value="superadmin">Superadmin</option>
        </select>

        <button className="bg-blue-600 text-white p-2 rounded w-full">
          Create Admin
        </button>
      </form>
    </div>
  );
};

export default CreateAdmin;
