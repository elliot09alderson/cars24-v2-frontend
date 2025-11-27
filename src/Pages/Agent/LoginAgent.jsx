import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  agent_login,
  customer_login,
  customer_logout,
} from "../../../rtk/slices/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "/logo/karlo.png";
import building from "/cars/car2.jpg";

import { toast } from "react-toastify";
import { LogIn, Milestone } from "lucide-react";
const LoginAgent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const navigate = useNavigate();

  return (
    <div
      className=" w-full  h-fit  lg:h-screen bg-cover bg-center relative  flex items-center justify-center "
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 70%), url(${building})`,
      }}
    >
      <div className=" hidden lg:flex relative text-4xl   text-white md:w-[400px] lg:w-full w-full h-full ">
        <div className="absolute bottom-20  text-2xl text-white gap-12  w-full hidden lg:flex  ">
          <h1 className="lg:w-[400px] ml-24 ">
            Hundereds of Users of Chhattisgarh used Karlo to buy their first
            Car.
          </h1>
          <div className="flex gap-5 items-center lg:w-[400px] justify-between font-semibold  text-base  self-end">
            <div>1000+ Active and Trusted Ads</div>
            <div>Easy Purchase</div>
            <div>Powerful Dashboard</div>
          </div>
        </div>
      </div>
      <div className=" backdrop-blur-3xl bg-white  lg:absolute  h-full lg:h-[90vh] lg:w-[27vw] md:w-[40vw] w-full top-4  right-4  items-center  lg:rounded-lg p-10 flex flex-col gap-4 z-10 lg:px-16 px-10 ">
        <div className="py-4  mt-0 w-full">
          <div className="flex flex-col gap-4">
            <img src={logo} alt="" className="w-32 mb-2" />

            <h1 className="text-black  racing text-2xl lg:text-3xl font-bold pb-12">
              Agent Login
            </h1>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const result = await dispatch(agent_login(values)).unwrap();
                if (result) {
                  toast.success("Login successful!");
                  navigate("/agent/myAds");
                }
              } catch (error) {
                toast.error(error?.error || "Login failed. Please try again.");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col lg:gap-8 gap-5 ">
                <div>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full pl-4 bg-white focus:ring-green-600 focus:ring-2 h-12 lg:h-12  rounded-md border border-gray-300 focus:outline-none"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-xs lg:text-sm"
                    style={{ color: "red" }}
                  />
                </div>

                <div>
                  <Field
                    type="password"
                    id="password"
                    className="w-full pl-4  focus:ring-green-600 focus:ring-2 h-12 lg:h-12  rounded-md border border-gray-300 focus:outline-none"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-xs lg:text-sm"
                    style={{ color: "red" }}
                  />
                </div>

                <button
                  type="submit"
                  // disabled={isSubmitting}
                  className="w-full px-8 lg:h-12 h-12 mt-4 rounded-md border tracking-wide text-lg  border-gray-300 bg-green-600 hover:bg-green-700 text-white transition-colors"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
          <div className="flex justify-between gap-8 mt-8 text-sm">
            <Link to="/forgetPassword">
              <h1 className="capitalize cursor-pointer text-green-600 underline">
                forgot password ?
              </h1>
            </Link>
            <Link
              to="/agent/register"
              className="flex gap-2 items-center underline text-green-600"
            >
              <Milestone />
              <h1 className="capitalize cursor-pointer ">Register</h1>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 lg:bottom-4 lg:left-10 px-8 lg:block hidden  lg:px-5 text-xs lg:text-lg  bg-white mb-8 ">
          <h1 className="text-sm text-gray-400 tracking-wide">
            By continuing you agree to our{" "}
            <Link to="/">
              <span className="text-green-600 cursor-pointer">
                privacy policy
              </span>
            </Link>{" "}
            and{" "}
            <Link to="/">
              <span className="text-green-600 cursor-pointer">terms of use</span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoginAgent;
