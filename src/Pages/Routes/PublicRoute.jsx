import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // If user is logged in, redirect based on role
  if (userInfo) {
    if (userInfo.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (userInfo.role === "agent") {
      return <Navigate to="/agent/myAds" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
