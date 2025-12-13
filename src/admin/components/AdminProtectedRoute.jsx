import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { admin, token } = useAdminAuth();

  if (!token || !admin) return <Navigate to="/admin/login" replace />;

  return children;
};

export default AdminProtectedRoute;
