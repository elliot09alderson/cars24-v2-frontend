import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgot_password, messageClear } from "../../rtk/slices/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import home from "/cars/car1.jpg";
import logo from "/logo/karlo.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail, Loader2, ChevronRight, User, Shield, Briefcase, ArrowLeft, CheckCircle2 } from "lucide-react";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [emailSent, setEmailSent] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("customer");

  const { loader, successMessage, errorMessage } = useSelector(
    (slice) => slice.auth
  );

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  useEffect(() => {
    if (successMessage) {
      setEmailSent(true);
    }
  }, [successMessage]);

  useEffect(() => {
    return () => {
      dispatch(messageClear());
    };
  }, [dispatch]);

  const roles = [
    { id: "customer", label: "Customer", icon: User },
    { id: "agent", label: "Agent", icon: Briefcase },
    { id: "admin", label: "Admin", icon: Shield },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Left Panel - Hero Image & Content */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black text-white">
        <img
          src={home}
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
              Recover your <span className="text-orange-500">Access.</span>
            </h1>
            <p className="text-xl text-gray-300">
              Don't worry, it happens. We'll help you get back to finding your dream car in no time.
            </p>
            <div className="flex gap-10 pt-4">
              <div className="space-y-1">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm text-gray-400 uppercase tracking-widest">Secure Recovery</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm text-gray-400 uppercase tracking-widest">Support Team</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} KARLO. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Panel - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8 bg-white p-8 lg:p-0 rounded-2xl shadow-xl shadow-gray-200/50 lg:shadow-none">
          <div className="space-y-2">
            <div className="lg:hidden flex justify-center mb-8">
              <img src={logo} alt="KARLO" className="h-10 w-auto" />
            </div>
            
            {emailSent ? (
               <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-2">
                     <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 racing">Check your email</h2>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    We've sent a password reset link to your email. Please check your inbox and spam folder.
                  </p>
               </div>
            ) : (
                <>
                    <h2 className="text-3xl font-bold text-gray-900 racing">Forgot Password?</h2>
                    <p className="text-gray-500">
                        Enter your email and we'll send you instructions to reset your password.
                    </p>
                </>
            )}
          </div>

          {!emailSent && (
              <>
                 {/* Role Selector */}
                <div className="grid grid-cols-3 gap-3 p-1 bg-gray-100 rounded-xl">
                    {roles.map((r) => (
                    <button
                        key={r.id}
                        onClick={() => setSelectedUserType(r.id)}
                        className={`flex flex-col items-center gap-2 py-3 px-2 rounded-lg transition-all duration-300 ${
                        selectedUserType === r.id
                            ? "bg-white text-orange-600 shadow-sm"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                        }`}
                    >
                        <r.icon className={`size-5 ${selectedUserType === r.id ? "text-orange-500" : "text-gray-400"}`} />
                        <span className="text-xs font-semibold uppercase tracking-wider">{r.label}</span>
                    </button>
                    ))}
                </div>

                <Formik
                    initialValues={{ email: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                    dispatch(
                        forgot_password({
                        email: values.email,
                        userType: selectedUserType,
                        })
                    );
                    }}
                >
                    {({ isSubmitting }) => (
                    <Form className="space-y-6">
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
                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                />
                            </div>
                            <ErrorMessage name="email" component="p" className="text-xs text-red-500 ml-1" />
                        </div>

                         {errorMessage && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-500 text-sm flex items-center gap-2">
                                <span className="font-medium">Error:</span> {errorMessage}
                            </div>
                         )}

                        <button
                        type="submit"
                        disabled={loader}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-black active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:pointer-events-none shadow-lg shadow-gray-200"
                        >
                        {(loader) ? (
                            <Loader2 className="size-6 animate-spin" />
                        ) : (
                            <>
                                <span>Send Reset Link</span>
                                <ChevronRight className="size-5" />
                            </>
                        )}
                        </button>
                    </Form>
                    )}
                </Formik>
              </>
          )}

          <div className="text-center">
            <Link
                to="/login"
                className="inline-flex items-center gap-2 font-bold text-gray-500 hover:text-gray-900 transition-colors"
                >
                <ArrowLeft className="size-4" />
                <span>Back to Login</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 italic">
            <p className="text-center text-xs text-gray-400">
              Need help? accuracy contact <Link to="#" className="underline">Support</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
