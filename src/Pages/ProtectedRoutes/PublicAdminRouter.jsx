import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicAdminRouter = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // If admin is logged in, redirect to admin dashboard
  if (userInfo && userInfo.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // If other user types are logged in, redirect appropriately
  if (userInfo && userInfo.role === "agent") {
    return <Navigate to="/agent/myAds" replace />;
  }

  if (userInfo && userInfo.role === "customer") {
    return <Navigate to="/" replace />;
  }

  // Not logged in, show the login page
  return <Outlet />;
};

export default PublicAdminRouter;
