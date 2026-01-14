import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { customer_register } from "../../rtk/slices/authSlice";
import { toast } from "react-toastify";
import { Mail, Lock, User, Phone, Loader2, ChevronRight, Camera } from "lucide-react";
import home from "/cars/car5.jpg";
import defaultAvatar from "/image/user.webp";
import logo from "/logo/karlo.png";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState(null);
  const { loader, successMessage, errorMessage } = useSelector(
    (slice) => slice.auth
  );

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [successMessage, errorMessage]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    image: Yup.mixed()
      .nullable()
      .test(
        "fileType",
        "Unsupported file format",
        (value) =>
          !value || ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      ),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("image", file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirmPassword);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("image", values.image);

    try {
        await dispatch(customer_register(formData)).unwrap();
        navigate("/login");
    } catch (error) {
        // Error handling is managed by the useEffect listening to state or the slice
        console.error("Registration failed:", error);
    }
  };

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
              Join the <span className="text-orange-500">Karlo Family.</span>
            </h1>
            <p className="text-xl text-gray-300">
              Create an account to start your journey. Buy, sell, and experience the best car marketplace in Chhattisgarh.
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

      {/* Right Panel - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-6 bg-white p-8 lg:p-0 rounded-2xl shadow-xl shadow-gray-200/50 lg:shadow-none">
          <div className="space-y-2">
            <div className="lg:hidden flex justify-center mb-6">
                <img src={logo} alt="KARLO" className="h-10 w-auto" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 racing">Register</h2>
            <p className="text-gray-500">Create your account to get started</p>
          </div>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              phoneNumber: "",
              image: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ setFieldValue, isSubmitting, errors, touched }) => (
              <Form className="space-y-4">
                
                {/* Image Upload */}
                <div className="flex justify-center mb-6">
                  <div className="relative group cursor-pointer">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => handleImageChange(event, setFieldValue)}
                    />
                    <label htmlFor="image" className="cursor-pointer block">
                      <div className="h-24 w-24 rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-orange-100 transition-all">
                        <img
                          src={previewImage || defaultAvatar}
                          alt="Profile Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full shadow-lg group-hover:bg-orange-600 transition-colors">
                        <Camera className="w-4 h-4" />
                      </div>
                    </label>
                  </div>
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-xs text-red-500 text-center mt-2 absolute transform translate-y-24"
                  />
                </div>

                {/* Name */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="size-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <Field
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className={`w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all ${
                            errors.name && touched.name ? "border-red-500 ring-red-500/20" : ""
                        }`}
                    />
                    <ErrorMessage name="name" component="p" className="text-xs text-red-500 ml-1 mt-1" />
                </div>

                {/* Email */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="size-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <Field
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className={`w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all ${
                            errors.email && touched.email ? "border-red-500 ring-red-500/20" : ""
                        }`}
                    />
                    <ErrorMessage name="email" component="p" className="text-xs text-red-500 ml-1 mt-1" />
                </div>

                {/* Phone */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="size-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <Field
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        className={`w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all ${
                            errors.phoneNumber && touched.phoneNumber ? "border-red-500 ring-red-500/20" : ""
                        }`}
                    />
                    <ErrorMessage name="phoneNumber" component="p" className="text-xs text-red-500 ml-1 mt-1" />
                </div>

                {/* Password Info */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {/* Password */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="size-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                        <Field
                            type="password"
                            name="password"
                            placeholder="Password"
                            className={`w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all ${
                                errors.password && touched.password ? "border-red-500 ring-red-500/20" : ""
                            }`}
                        />
                        <ErrorMessage name="password" component="p" className="text-xs text-red-500 ml-1 mt-1" />
                    </div>

                    {/* Confirm Password */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="size-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                        <Field
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className={`w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all ${
                                errors.confirmPassword && touched.confirmPassword ? "border-red-500 ring-red-500/20" : ""
                            }`}
                        />
                        <ErrorMessage name="confirmPassword" component="p" className="text-xs text-red-500 ml-1 mt-1" />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || loader}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-black active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:pointer-events-none shadow-lg shadow-gray-200 mt-4"
                >
                    {(isSubmitting || loader) ? (
                        <Loader2 className="size-6 animate-spin" />
                    ) : (
                        <>
                            <span>Register</span>
                            <ChevronRight className="size-5" />
                        </>
                    )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center pt-2">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-orange-500 hover:text-orange-600 underline underline-offset-4 decoration-2 decoration-orange-500/30"
              >
                Login
              </Link>
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 italic">
            <p className="text-center text-xs text-gray-400">
              By registering, you agree to KARLO's{" "}
              <Link to="#" className="underline">Terms of Service</Link> and <Link to="#" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
