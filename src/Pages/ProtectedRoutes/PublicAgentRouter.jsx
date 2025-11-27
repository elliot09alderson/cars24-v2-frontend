import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicAgentRouter = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // If agent is logged in, redirect to agent dashboard
  if (userInfo && userInfo.role === "agent") {
    return <Navigate to="/agent/myAds" replace />;
  }

  // If admin is logged in, redirect to admin dashboard
  if (userInfo && userInfo.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // If customer is logged in, redirect to home
  if (userInfo && userInfo.role === "customer") {
    return <Navigate to="/" replace />;
  }

  // Not logged in, show the login/register page
  return <Outlet />;
};

export default PublicAgentRouter;
