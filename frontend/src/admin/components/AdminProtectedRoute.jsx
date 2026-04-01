import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { token, user } = useAuth();

  if (!token || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  // 🔐 Only allow ADMIN and SUPERADMIN
  if (!["ADMIN", "SUPERADMIN"].includes(user.role)) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;