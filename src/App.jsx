import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Register from "./Register/Register";
import NotFound from "./components/NotFound";
import Login from "./Login/Login";
import Footer from "./component_01/Footer";
import PublicRoute from "./Pages/Routes/PublicRoute";
import PublicAdminRouter from "./Pages/ProtectedRoutes/PublicAdminRouter";
import AdminLogin from "./Pages/ADMIN/Auth/AdminLogin";
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
import LoginAgent from "./Pages/Agent/LoginAgent";
import PublicAgentRouter from "./Pages/ProtectedRoutes/PublicAgentRouter";
import VehicleDetails from "./Pages/Details/VehicleDetails";
import Admin from "./Pages/Admin";
import MyProfile from "./Pages/Agent/MyProfile";
import Index from "./Pages/Index.tsx";
const App = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    dispatch(check_session());
  }, []);

  const dispatch = useDispatch();
  const { userInfo, successMessage, errorMessage, loader } = useSelector(
    (slice) => slice.auth
  );

  console.log(userInfo);
  useEffect(() => {
    dispatch(check_session());

    if (successMessage) {
      toast.success(successMessage);
      // dispatch(messageClear());
    } else if (errorMessage) {
      toast.error(errorMessage);
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
        {
          element: <PublicAdminRouter />,
          children: [
            {
              path: "login",
              element: <AdminLogin />,
            },
          ],
        },

        {
          path: "",

          children: [
            {
              element: <PrivateAdminRouter />,
              children: [
                {
                  index: true,
                  element: <Admin />,
                },
                // {
                //   path: "allAgent",
                //   element: <GetAllAgent />,
                // },
                // {
                //   path: "allBlockAgent",
                //   element: <GetAllBlockedAgent />,
                // },
              ],
            },
          ],
        },
      ],
    },

    {
      path: "/agent",
      children: [
        {
          element: <PublicAgentRouter />,
          children: [
            { path: "register", element: <RegisterAgent /> },
            { path: "login", element: <LoginAgent /> },
          ],
        },

        {
          path: "myAds",

          children: [
            {
              element: <PivateAgentRouter />,
              children: [
                {
                  index: true,
                  element: <MyProfile />,
                },
              ],
            },
          ],
        },

        {
          path: "post",

          children: [
            {
              element: <PivateAgentRouter />,
              children: [
                {
                  index: true,
                  element: <PostAds />,
                },
                {
                  path: "ad",
                  element: <PostAds />,
                  //  element: <PostFlat />,
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

    {
      path: "/ads",
      element: <Ads />,
    },

    {
      path: "/vehicle/detail/:slug",
      element: <VehicleDetails />,
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
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
};

export default App;
