import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { admin_login, agent_login, customer_login } from "../../rtk/slices/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { LogIn, Mail, Lock, Shield, User, Briefcase, Loader2, ChevronRight } from "lucide-react";
import logo from "/logo/karlo.png";
import bgImage from "/cars/car1.jpg";

const CommonLogin = () => {
  const location = useLocation();
  const [role, setRole] = useState("customer"); // 'admin', 'agent', 'customer'
  
  useEffect(() => {
    if (location.pathname.includes("admin")) {
      setRole("admin");
    } else if (location.pathname.includes("agent")) {
      setRole("agent");
    } else {
      setRole("customer");
    }
  }, [location]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const roles = [
    { id: "customer", label: "Customer", icon: User, color: "orange" },
    { id: "agent", label: "Agent", icon: Briefcase, color: "blue" },
    { id: "admin", label: "Admin", icon: Shield, color: "red" },
  ];

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      let result;
      if (role === "admin") {
        result = await dispatch(admin_login(values)).unwrap();
        if (result?.admin) {
          // toast.success("Admin Login successful!");
          navigate("/admin");
        }
      } else if (role === "agent") {
        result = await dispatch(agent_login(values)).unwrap();
        if (result) {
          // toast.success("Agent Login successful!");
          navigate("/agent/dashboard");
        }
      } else {
        result = await dispatch(customer_login(values)).unwrap();
        if (result) {
          // toast.success("Welcome back!");
          navigate("/ads");
        }
      }
    } catch (error) {
      // toast.error(error?.error || error?.message || "Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  const getInitialValues = () => {
    switch (role) {
      case "admin":
        return { email: "karlo@admin.com", password: "Deadpool@123" };
      case "agent":
        return { email: "karlo@agent.com", password: "Deadpool@123" };
      default:
        return { email: "karlo@user.com", password: "Deadpool@123" };
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Left Panel - Hero Image & Content */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black text-white">
        <img
          src={bgImage}
          alt="Luxury Car"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 transition-transform duration-10000 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-16 h-full">
          <div>
            <img src={logo} alt="KARLO" className="h-12 w-auto" />
          </div>

          <div className="max-w-xl space-y-6">
            <h1 className="text-5xl font-bold leading-tight racing">
              Chhattisgarh's Most Trusted 
              <span className="text-orange-500"> Car Marketplace.</span>
            </h1>
            <p className="text-xl text-gray-300">
              Join thousands of users who found their dream four-wheeler on KARLO. 
              Simple, secure, and government licensed.
            </p>
            <div className="flex gap-10 pt-4">
              <div className="space-y-1">
                <p className="text-3xl font-bold">1000+</p>
                <p className="text-sm text-gray-400 uppercase tracking-widest">Active Ads</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold">50+</p>
                <p className="text-sm text-gray-400 uppercase tracking-widest">Verified Agents</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} KARLO. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8 bg-white p-8 lg:p-0 rounded-2xl shadow-xl shadow-gray-200/50 lg:shadow-none">
          <div className="space-y-2">
            <div className="lg:hidden flex justify-center mb-8">
               <img src={logo} alt="KARLO" className="h-10 w-auto" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 racing">Sign In</h2>
            <p className="text-gray-500">Choose your account type and enter details</p>
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-3 p-1 bg-gray-100 rounded-xl">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex flex-col items-center gap-2 py-3 px-2 rounded-lg transition-all duration-300 ${
                  role === r.id
                    ? "bg-white text-orange-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                }`}
              >
                <r.icon className={`size-5 ${role === r.id ? "text-orange-500" : "text-gray-400"}`} />
                <span className="text-xs font-semibold uppercase tracking-wider">{r.label}</span>
              </button>
            ))}
          </div>

          {/* Login Form */}
          <Formik
            initialValues={getInitialValues()}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="size-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all ${
                        errors.email && touched.email ? "border-red-500 ring-red-500/20" : ""
                      }`}
                    />
                  </div>
                  <ErrorMessage name="email" component="p" className="text-xs text-red-500 ml-1" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <Link to="/forgetPassword" title="Forgot Password" className="text-xs font-semibold text-orange-500 hover:text-orange-600">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="size-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <Field
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all ${
                        errors.password && touched.password ? "border-red-500 ring-red-500/20" : ""
                      }`}
                    />
                  </div>
                  <ErrorMessage name="password" component="p" className="text-xs text-red-500 ml-1" />
                </div>

                <div className="flex items-center gap-2 px-1">
                  <input
                    type="checkbox"
                    id="remember"
                    className="size-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 transition-all cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">
                    Remember me for 30 days
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || loader}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-black active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:pointer-events-none shadow-lg shadow-gray-200"
                >
                  {(isSubmitting || loader) ? (
                    <Loader2 className="size-6 animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ChevronRight className="size-5" />
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          {role === "customer" && (
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="font-bold text-orange-500 hover:text-orange-600 underline underline-offset-4 decoration-2 decoration-orange-500/30">
                  Register Now
                </Link>
              </p>
            </div>
          )}

          {role === "agent" && (
            <div className="text-center">
              <p className="text-gray-600">
                Want to become an agent?{" "}
                <Link to="/agent/register" className="font-bold text-orange-500 hover:text-orange-600 underline underline-offset-4 decoration-2 decoration-orange-500/30">
                  Join Karlo
                </Link>
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100 italic">
            <p className="text-center text-xs text-gray-400">
              By continuing, you agree to KARLO's{" "}
              <Link to="#" className="underline">Terms of Service</Link> and <Link to="#" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonLogin;
