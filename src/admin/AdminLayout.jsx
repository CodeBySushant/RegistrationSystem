import { Link, Outlet } from "react-router-dom";
import { useAdminAuth } from "./context/AdminAuthContext";

const AdminLayout = () => {
  const { admin, logout } = useAdminAuth();

  return (
    <div className="min-h-screen flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        
        <h1 className="text-2xl font-bold">Admin Panel</h1>

        <nav className="flex flex-col space-y-3">

          <Link to="/admin" className="hover:text-blue-400">Dashboard</Link>

          {/* Only Superadmin can see these */}
          {admin?.role === "SUPERADMIN" && (
            <>
              <Link to="/admin/create-admin" className="hover:text-blue-400">Create Admin</Link>
              <Link to="/admin/admin-list" className="hover:text-blue-400">View Admins</Link>
            </>
          )}

          <Link to="/admin/settings" className="hover:text-blue-400">Settings</Link>

          <button
            onClick={logout}
            className="text-left text-red-400 hover:text-red-300 mt-6"
          >
            Logout
          </button>
        </nav>

      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
