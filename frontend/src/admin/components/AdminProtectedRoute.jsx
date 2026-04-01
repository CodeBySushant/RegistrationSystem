import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { token, admin } = useAuth();

  // Not logged in as admin
  if (!token || !admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
