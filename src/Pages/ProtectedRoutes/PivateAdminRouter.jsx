import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateAdminRouter = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // If not logged in or not admin, redirect to login
  if (!userInfo || userInfo.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default PrivateAdminRouter;
