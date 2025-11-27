import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgot_password, messageClear } from "../../rtk/slices/authSlice.js";
import { Link } from "react-router-dom";
import home from "/cars/car1.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

  return (
    <div
      className="w-full h-fit lg:h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0) 70%), url(${home})`,
      }}
    >
      <div className="backdrop-blur-2xl bg-white lg:absolute h-screen lg:w-[27vw] lg:h-[80vh] right-4 items-center lg:rounded-2xl flex flex-col gap-4 z-10 lg:px-16 px-8">
        <div className="py-4 mt-20 w-full">
          <div className="flex flex-col gap-4 w-full">
            <h1 className="text-black text-center racing text-2xl font-racing lg:text-3xl font-bold pb-4">
              FORGOT PASSWORD
            </h1>
            {!emailSent && (
              <p className="text-gray-600 text-center text-sm pb-8">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            )}
          </div>

          {emailSent ? (
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Check your email
              </h2>
              <p className="text-gray-600 text-center text-sm">
                If an account exists with that email, we've sent a password
                reset link. Please check your inbox and spam folder.
              </p>
              <Link
                to="/login"
                className="text-green-600 underline italic mt-4"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              {/* User Type Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Account Type
                </label>
                <div className="flex gap-4">
                  {["customer", "agent", "admin"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedUserType(type)}
                      className={`px-4 py-2 rounded-md border capitalize transition-colors ${
                        selectedUserType === type
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-green-400"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
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
                {() => (
                  <Form className="flex flex-col gap-8">
                    <div>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="w-full pl-4 bg-white focus:ring-green-600 focus:ring-2 h-14 lg:h-12 rounded-md border border-gray-300 focus:outline-none"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        className="text-sm pl-1 pt-1"
                        name="email"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>

                    {errorMessage && (
                      <div className="text-red-500 text-sm text-center">
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loader}
                      className="w-full px-8 h-14 racing uppercase mt-4 lg:h-14 rounded-md border tracking-wide text-lg border-gray-300 bg-green-600 hover:bg-green-700 text-white disabled:bg-green-400 transition-colors"
                    >
                      {loader ? "Sending..." : "Send Reset Link"}
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="flex justify-center mt-8 text-sm">
                <Link to="/login">
                  <h1 className="capitalize cursor-pointer italic text-green-600 underline">
                    Back to Login
                  </h1>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
