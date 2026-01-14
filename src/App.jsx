import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Register from "./Register/Register";
import NotFound from "./components/NotFound";
import Login from "./Login/CommonLogin";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ResetPassword from "./ResetPassword/ResetPassword";
import PublicRoute from "./Pages/Routes/PublicRoute";
import PublicAdminRouter from "./Pages/ProtectedRoutes/PublicAdminRouter";
import AdminLogin from "./Login/CommonLogin";
import { check_session, messageClear } from "../rtk/slices/authSlice";
import PrivateAdminRouter from "./Pages/ProtectedRoutes/PivateAdminRouter";
import CarContainer from "./Pages/Home/Sections/CarContainer/CarContainer";
import Home from "./Pages/Home";
import { toast } from "react-toastify";
import PostAds from "./Pages/Home/Sections/POST/PostAds";
import Hondacity from "./Pages/Details/VehicleDetails";
import Ads from "./Pages/Ads";
import Lenis from "@studio-freight/lenis";
import PostVehicle from "./Pages/Home/Sections/POST/PostVehicle";
import PivateAgentRouter from "./Pages/ProtectedRoutes/PrivateAgentRouter";
import RegisterAgent from "./Pages/Agent/RegisterAgent";
import LoginAgent from "./Login/CommonLogin";
import PublicAgentRouter from "./Pages/ProtectedRoutes/PublicAgentRouter";
import VehicleDetails from "./Pages/Details/VehicleDetails";
import MyProfile from "./Pages/Agent/MyProfile";
import CustomerProfile from "./Pages/Customer/CustomerProfile";
import Index from "./Pages/Index.tsx";

// Agent Panel Components
import AgentLayout from "./Pages/Agent/Components/AgentLayout";
import AgentDashboard from "./Pages/Agent/Dashboard/AgentDashboard";
import AgentVehicles from "./Pages/Agent/Vehicles/AgentVehicles";

// Admin Panel Components
import AdminLayout from "./Pages/ADMIN/Components/AdminLayout";
import AdminDashboard from "./Pages/ADMIN/Dashboard/AdminDashboard";
import AdminVehicles from "./Pages/ADMIN/Vehicles/AdminVehicles";
import AdminAgents from "./Pages/ADMIN/Agents/AdminAgents";
import AdminCustomers from "./Pages/ADMIN/Customers/AdminCustomers";
import AdminSettings from "./Pages/ADMIN/Settings/AdminSettings";
const App = () => {
  const dispatch = useDispatch();
  const { userInfo, successMessage, errorMessage, loader } = useSelector(
    (slice) => slice.auth
  );

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    dispatch(check_session());
  }, []);

  console.log(userInfo);
  
  useEffect(() => {
    if (successMessage) {
      // Filter out login-related success messages if any slip through
      if (!successMessage.toLowerCase().includes("login") && !successMessage.toLowerCase().includes("welcome")) {
        toast.success(successMessage);
      }
      dispatch(messageClear());
    } else if (errorMessage) {
      // Don't show toast for session check errors (unauthorized)
      if (!errorMessage.toLowerCase().includes('unauthorized')) {
        toast.error(errorMessage);
      }
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const router = createBrowserRouter([
    {
      path: "/",
      // element: <Home />,
      element: <Index />,
    },
    {
      path: "admin",
      children: [
        // Public admin routes (login)
        {
          element: <PublicAdminRouter />,
          children: [
            {
              path: "login",
              element: <AdminLogin />,
            },
          ],
        },
        // Protected admin routes with layout
        {
          element: <PrivateAdminRouter />,
          children: [
            {
              element: <AdminLayout />,
              children: [
                {
                  index: true,
                  element: <AdminDashboard />,
                },
                {
                  path: "vehicles",
                  element: <AdminVehicles />,
                },
                {
                  path: "agents",
                  element: <AdminAgents />,
                },
                {
                  path: "customers",
                  element: <AdminCustomers />,
                },
                {
                  path: "settings",
                  element: <AdminSettings />,
                },
              ],
            },
          ],
        },
      ],
    },

    {
      path: "/agent",
      children: [
        // Public agent routes (login/register)
        {
          element: <PublicAgentRouter />,
          children: [
            { path: "register", element: <RegisterAgent /> },
            { path: "login", element: <LoginAgent /> },
          ],
        },
        // Protected agent routes with layout
        {
          element: <PivateAgentRouter />,
          children: [
            {
              element: <AgentLayout />,
              children: [
                {
                  path: "dashboard",
                  element: <AgentDashboard />,
                },
                {
                  path: "myAds",
                  element: <AgentDashboard />,
                },
                {
                  path: "vehicles",
                  element: <AgentVehicles />,
                },
                {
                  path: "post",
                  children: [
                    {
                      index: true,
                      element: <PostAds />,
                    },
                    {
                      path: "ad",
                      element: <PostAds />,
                    },
                    {
                      path: "vehicle",
                      element: <PostVehicle />,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      path: "/ads",
      element: <Ads />,
    },

    {
      path: "/vehicle/detail/:slug",
      element: <VehicleDetails />,
    },

    {
      path: "/profile",
      element: <CustomerProfile />,
    },

    {
      path: "/",
      element: <PublicRoute />, // Public routes wrapper
      children: [
        {
          path: "login",
          element: <Login />,
        },

        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/forgetPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password/:userType/:token",
      element: <ResetPassword />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
