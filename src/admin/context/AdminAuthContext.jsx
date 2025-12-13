import React, { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    return localStorage.getItem("admin-auth") ? true : false;
  });

  // DEFAULT ADMIN CREDENTIALS
  const DEFAULT_USER = "admin";
  const DEFAULT_PASS = "admin123";

  const login = (username, password) => {
    if (username === DEFAULT_USER && password === DEFAULT_PASS) {
      setAdmin(true);
      localStorage.setItem("admin-auth", "true");
      return { success: true };
    }
    return { success: false, message: "Invalid username or password" };
  };

  const logout = () => {
    setAdmin(false);
    localStorage.removeItem("admin-auth");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
