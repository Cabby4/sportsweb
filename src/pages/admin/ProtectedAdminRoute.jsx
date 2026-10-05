import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const token = localStorage.getItem("cabbyToken");
  const user = JSON.parse(
    localStorage.getItem("cabbyUser") || "null"
  );

  if (!token || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user.role !== "admin") {
    localStorage.removeItem("cabbyToken");
    localStorage.removeItem("cabbyUser");

    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;