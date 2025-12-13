import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_BASE = "http://localhost:5000"; // adjust if needed

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // 🔁 Restore session on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // ✅ REAL LOGIN (BACKEND VERIFIED)
  const login = async (username, password) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // 🔐 Allow ONLY ADMIN & SUPERADMIN
      if (!["ADMIN", "SUPERADMIN"].includes(data.admin.role)) {
        throw new Error("Unauthorized role");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.admin));

      setToken(data.token);
      setUser(data.admin);
      setIsAuthenticated(true);

      return { success: true };
    } catch (err) {
      logout();
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
