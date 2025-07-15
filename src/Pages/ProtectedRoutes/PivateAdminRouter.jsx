import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateAdminRouter = ({ role }) => {
  console.log(role);
  if (role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default PrivateAdminRouter;
