import React, { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("admin-token") || "");

  useEffect(() => {
    if (!token) return;

    const storedAdmin = JSON.parse(localStorage.getItem("admin-info"));
    if (storedAdmin) setAdmin(storedAdmin);
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      // Save token + admin data
      localStorage.setItem("admin-token", data.token);
      localStorage.setItem("admin-info", JSON.stringify(data.admin));

      setToken(data.token);
      setAdmin(data.admin);

      return { success: true };
    } catch (err) {
      return { success: false, message: "Server error" };
    }
  };

  const logout = () => {
    localStorage.removeItem("admin-token");
    localStorage.removeItem("admin-info");
    setAdmin(null);
    setToken("");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
