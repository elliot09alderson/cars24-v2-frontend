import { useDispatch, useSelector } from "react-redux";
import { admin_login } from "../../../../rtk/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { LogIn, Mail, Lock, Shield, Car, Loader2 } from "lucide-react";
import logo from "/logo/karlo.png";

const AdminLogin = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-black text-white flex-col justify-between p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 border border-white rounded-full"></div>
          <div className="absolute bottom-40 right-10 w-96 h-96 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-white rounded-full"></div>
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <img src={logo} alt="KARLO" className="h-12" />
        </div>

        {/* Center Content */}
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/10 rounded-2xl">
              <Shield className="size-8" />
            </div>
            <h1 className="text-4xl font-bold">Admin Portal</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-md">
            Manage your vehicle inventory, agents, and customers from one powerful dashboard.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="space-y-2">
              <Car className="size-6 text-gray-400" />
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-gray-400">Vehicles Listed</p>
            </div>
            <div className="space-y-2">
              <Shield className="size-6 text-gray-400" />
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm text-gray-400">Secure & Official</p>
            </div>
            <div className="space-y-2">
              <LogIn className="size-6 text-gray-400" />
              <p className="text-3xl font-bold">4</p>
              <p className="text-sm text-gray-400">States Licensed</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} KARLO. Government Licensed Vehicle Dealer.</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center">
            <img src={logo} alt="KARLO" className="h-10" />
          </div>

          {/* Header */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full text-sm font-medium text-orange-600 mb-4">
              <Shield className="size-4" />
              Admin Access Only
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Login Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const result = await dispatch(admin_login(values)).unwrap();
                if (result?.admin) {
                  toast.success("Login successful!");
                  navigate("/admin");
                }
              } catch (error) {
                toast.error(error?.error || error?.message || "Login failed. Please check your credentials.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="size-5 text-gray-400" />
                    </div>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                        errors.email && touched.email
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-gray-600"
                      }`}
                      placeholder="admin@karlo.com"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="size-5 text-gray-400" />
                    </div>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className={`w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                        errors.password && touched.password
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-gray-600"
                      }`}
                      placeholder="Enter your password"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-600"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link
                    to="/forgetPassword"
                    className="text-sm font-medium text-orange-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || loader}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gray-600/30"
                >
                  {(isSubmitting || loader) ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="size-5" />
                      Sign In
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 text-gray-500">Need help?</span>
            </div>
          </div>

          {/* Support Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Contact support at{" "}
              <a
                href="mailto:support@karlo.com"
                className="font-medium text-orange-500 hover:underline"
              >
                support@karlo.com
              </a>
            </p>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <Link to="/" className="text-orange-500 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/" className="text-orange-500 hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
