import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicAdminRouter = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo && userInfo?.role !== "admin") {
    return <Outlet />;
    // return <Navigate to="/admin/login" replace />;
  }
  if (userInfo?.role == "customer") {
    return <Navigate to={"/"} />;
  }
};

export default PublicAdminRouter;
