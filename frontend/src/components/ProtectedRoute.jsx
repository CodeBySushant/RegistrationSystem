// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated ? children : <Navigate to="/" replace />;
// };

// export default ProtectedRoute;


// Authentication Disable
const ProtectedRoute = ({ children }) => {
  return children; // ✅ allow everything
};

export default ProtectedRoute;