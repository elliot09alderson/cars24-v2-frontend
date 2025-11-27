import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reset_password,
  verify_reset_token,
  messageClear,
} from "../../rtk/slices/authSlice.js";
import { Link, useParams, useNavigate } from "react-router-dom";
import home from "/cars/car1.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userType, token } = useParams();
  const [tokenValid, setTokenValid] = useState(null);
  const [passwordReset, setPasswordReset] = useState(false);

  const { loader, successMessage, errorMessage } = useSelector(
    (slice) => slice.auth
  );

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Verify token on component mount
  useEffect(() => {
    if (token && userType) {
      dispatch(verify_reset_token({ userType, token }))
        .unwrap()
        .then(() => setTokenValid(true))
        .catch(() => setTokenValid(false));
    }
  }, [token, userType, dispatch]);

  useEffect(() => {
    if (successMessage === "Password reset successful") {
      setPasswordReset(true);
    }
  }, [successMessage]);

  useEffect(() => {
    return () => {
      dispatch(messageClear());
    };
  }, [dispatch]);

  // Loading state while verifying token
  if (tokenValid === null) {
    return (
      <div
        className="w-full h-fit lg:h-screen bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0) 70%), url(${home})`,
        }}
      >
        <div className="backdrop-blur-2xl bg-white lg:absolute h-screen lg:w-[27vw] lg:h-[80vh] right-4 items-center lg:rounded-2xl flex flex-col gap-4 z-10 lg:px-16 px-8 justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Verifying reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (tokenValid === false) {
    return (
      <div
        className="w-full h-fit lg:h-screen bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0) 70%), url(${home})`,
        }}
      >
        <div className="backdrop-blur-2xl bg-white lg:absolute h-screen lg:w-[27vw] lg:h-[80vh] right-4 items-center lg:rounded-2xl flex flex-col gap-4 z-10 lg:px-16 px-8 justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Invalid or Expired Link
            </h2>
            <p className="text-gray-600 text-center text-sm">
              This password reset link is invalid or has expired. Please request
              a new one.
            </p>
            <Link
              to="/forgetPassword"
              className="px-6 py-3 bg-blue-600 text-white rounded-md mt-4"
            >
              Request New Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              RESET PASSWORD
            </h1>
            {!passwordReset && (
              <p className="text-gray-600 text-center text-sm pb-8">
                Enter your new password below.
              </p>
            )}
          </div>

          {passwordReset ? (
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
                Password Reset Successful
              </h2>
              <p className="text-gray-600 text-center text-sm">
                Your password has been successfully reset. You can now log in
                with your new password.
              </p>
              <Link
                to="/login"
                className="px-6 py-3 bg-blue-600 text-white rounded-md mt-4"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  dispatch(
                    reset_password({
                      token,
                      password: values.password,
                      userType,
                    })
                  );
                }}
              >
                {() => (
                  <Form className="flex flex-col gap-6">
                    <div>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="w-full pl-4 bg-white focus:ring-fuchsia-600 focus:ring-2 h-14 lg:h-12 rounded-md border border-gray-300 focus:outline-none"
                        placeholder="New password"
                      />
                      <ErrorMessage
                        className="text-sm pl-1 pt-1"
                        name="password"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>

                    <div>
                      <Field
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="w-full pl-4 bg-white focus:ring-fuchsia-600 focus:ring-2 h-14 lg:h-12 rounded-md border border-gray-300 focus:outline-none"
                        placeholder="Confirm new password"
                      />
                      <ErrorMessage
                        className="text-sm pl-1 pt-1"
                        name="confirmPassword"
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
                      className="w-full px-8 h-14 racing uppercase mt-4 lg:h-14 rounded-md border tracking-wide text-lg border-gray-300 bg-blue-600 text-white disabled:bg-blue-400"
                    >
                      {loader ? "Resetting..." : "Reset Password"}
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="flex justify-center mt-8 text-sm">
                <Link to="/login">
                  <h1 className="capitalize cursor-pointer italic text-blue-600 underline">
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

export default ResetPassword;
