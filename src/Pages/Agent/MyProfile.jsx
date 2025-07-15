import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agent_detail, agent_myads } from "../../../rtk/slices/agentSlice.js";
import { HiLocationMarker } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import user from "/image/user.webp";

import { Triangle } from "react-loader-spinner";

import profile from "/sprofile.png";
import ad from "/sad.png";
import createad from "/4040274.jpg";
import moment from "moment";
import Swal from "sweetalert2";
import { Blinds, LogOut, X } from "lucide-react";
import { agent_logout } from "../../../rtk/slices/authSlice";
import AgentAllAds from "./AllAgentAds.jsx";

import { seActiveSidebar } from "../../../rtk/slices/adSlice.js";
const MyProfile = () => {
  const dispatch = useDispatch();
  const [openSidebar, setOpenSidebar] = useState(false);
  const { loader, adsInfo, agentInfo, errorMessage, successMessage } =
    useSelector((slice) => slice.agent);
  const { userInfo } = useSelector((slice) => slice.auth);

  const { activeSidebar } = useSelector((slice) => slice.ad);
  const [AllAdsData, setAllAdsData] = useState([]);

  useEffect(() => {
    console.log(activeSidebar);
    dispatch(agent_myads());
    console.log(userInfo);
  }, [activeSidebar]);

  const navigate = useNavigate();

  const xyz = true;
  if (loader) {
    return (
      <div className="w-full h-screen flex-col bg-slate-900 text-white flex items-center justify-center">
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <h2 className="text-4xl mt-8 ">loading ....</h2>
      </div>
    );
  }

  return (
    <div className="w-full lg:flex-row flex-col flex h-full lg:h-screen ">
      <div
        className={`lg:w-[17%] w-full${
          openSidebar ? " hidden h-screen w-[90vw]  z-50 " : " hidden "
        }   h-screen bg-white border border-r-gray-300 shadow-md lg:flex top-0 left-0     justify-center   flex-col  gap-20   px-4 lg:pl-12 pl-4   `}
      >
        <Link
          to={"/agent/post/vehicle"}
          className={` ${
            activeSidebar == -1 && " border bg-gray-100"
          } p-4 flex  border-2 border-amber-200 shadow-md hover:border hover:bg-gray-100   text-black items-center lg:my-0 my-4 gap-3 rounded-md cursor-pointer  text-xl font-lg`}
        >
          <img
            src={createad}
            alt=""
            className="size-8 rounded-full object-cover"
          />
          <h1>Upload Vehicle </h1>
        </Link>

        <div className=" flex flex-col lg:gap-5 gap-2 mb-6 lg:mb-0 ">
          {[
            { name: "Profile", img: profile },
            { name: "All Ads", img: ad },
          ].map((item, idx) => (
            <div
              onClick={() => dispatch(seActiveSidebar(idx))}
              className={` ${
                activeSidebar == idx && "  bg-gray-200"
              } p-4 flex   hover:bg-gray-100 items-center gap-3 rounded-md  cursor-pointer  text-xl font-lg`}
            >
              <img
                src={item?.img}
                alt=""
                className="size-8 rounded-full object-cover"
              />
              <h1>{item?.name}</h1>
            </div>
          ))}
        </div>
        <div
          onClick={() => {
            dispatch(seActiveSidebar(9));

            Swal.fire({
              title: "Are you sure ?",
              text: "You will be redirected to login activeSidebar!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Log out!",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Log Out!",
                  text: "Agent logout successfully.",
                  icon: "success",
                });
                dispatch(agent_logout());
              }
            });
          }}
          className={` ${
            activeSidebar == 9 && " border bg-gray-100 "
          } p-4 flex  hover:border hover:bg-gray-100   border-2 border-red-200 shadow-md items-center gap-3 rounded-md cursor-pointer  text-xl font-lg`}
        >
          <LogOut />
          <h1>Log Out</h1>
        </div>
      </div>
      {
        <div
          className={`lg:w-[17%] bg-white h-screen ${
            openSidebar ? "    bg-red-500 w-full  px-4  " : " w-0  p-0"
          }    overflow-hidden absolute duration-700 lg:hidden  z-50  border border-r-gray-300 shadow-md flex top-0 left-0    justify-center   flex-col  lg:pl-12  py-20 `}
        >
          <Link
            to={"/agent/post"}
            className={` ${
              activeSidebar == 1 && " border bg-gray-100"
            } p-4 flex  border-2 border-amber-200 shadow-md  hover:border hover:bg-gray-100   text-black items-center lg:my-0 my-4 gap-3 rounded-md cursor-pointer  text-xl font-lg`}
          >
            <img
              src={createad}
              alt=""
              className="size-8 rounded-full object-cover"
            />
            <h1>Upload Vehicle</h1>
          </Link>

          <div className=" flex flex-col lg:gap-5 gap-2 mb-6 lg:mb-0 ">
            {[
              { name: "Profile", img: profile },
              { name: "All Ads", img: ad },
            ].map((item, idx) => (
              <div
                onClick={() => dispatch(seActiveSidebar(idx))}
                className={` ${
                  activeSidebar == idx && " border bg-gray-100"
                } p-4 flex   hover:bg-gray-100 items-center gap-3 rounded-md  cursor-pointer  text-xl font-lg`}
              >
                <img
                  src={item?.img}
                  alt=""
                  className="size-8 rounded-full object-cover"
                />
                <h1>{item?.name}</h1>
              </div>
            ))}
          </div>
          <div
            onClick={() => {
              dispatch(seActiveSidebar(9));

              Swal.fire({
                title: "Are you sure ?",
                text: "You will be redirected to login activeSidebar!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Log out!",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Log Out!",
                    text: "Agent logout successfully.",
                    icon: "success",
                  });
                  dispatch(agent_logout());
                }
              });
            }}
            className={` ${
              activeSidebar == 9 && " border bg-gray-100 "
            } p-4 flex  hover:border hover:bg-gray-100   border-2 border-red-200 shadow-md items-center gap-3 rounded-md cursor-pointer  text-xl font-lg`}
          >
            <LogOut />
            <h1>Log Out</h1>
          </div>
        </div>
      }
      <div className="lg:w-[83%] w-full relative lg:flex-row flex-col h-full lg:h-screen overflow-y-scroll ">
        <div
          className="w-12 h-12 fixed  right-5 z-50 top-5 bg-slate-800 rounded-full cursor-pointer p-1 lg:hidden flex items-center justify-center text-white"
          onClick={() => setOpenSidebar((prev) => !prev)}
        >
          {openSidebar ? <X /> : <Blinds />}
        </div>
        {activeSidebar == 0 && (
          <div className="flex items-center  gap-14">
            <div
              className={`  flex flex-col  mx-auto p-12  items-center justify-center ${
                !adsInfo?.isVerified ? "bg-white" : "bg-indigo-100"
              } rounded-lg shadow-md relative overflow-hidden w-full h-full lg:h-screen`}
            >
              {!adsInfo?.isVerified && (
                <div className="text-3xl  py-4 rounded-lg bg-gray-200 font-bold w-full left-0 text-center">
                  <h1 className=" ">Account not Verified !!</h1>
                  <span className="text-sm">
                    upload documents{" "}
                    <Link
                      className="text-sm underline text-blue-600"
                      to={"/agent/upload-document"}
                    >
                      {" "}
                      here{" "}
                    </Link>
                  </span>
                </div>
              )}

              <div className="flex items-center  lg:flex-row flex-col p-12 gap-12">
                <div className="flex flex-col items-center  justify-center">
                  <div className="flex items-center  lg:flex-row flex-col justify-center  ">
                    {/* <!-- Avatar --> */}
                    <img
                      src={userInfo?.avatar ? userInfo?.avatar : user}
                      alt="Agent Avatar"
                      className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border object-cover border-gray-300"
                    />

                    <div className="flex-col justify-center lg:pl-8  pl-0 flex lg:items-start items-center ">
                      <h2 className="text-3xl capitalize font-semibold text-gray-800">
                        {userInfo?.name}
                      </h2>
                      <p className="text-sm  text-gray-500">{adsInfo?.role}</p>
                    </div>
                  </div>

                  <div className="mt-4 gap-5 lg:gap-8  flex flex-col space-y-2 border lg:w-96  bg-slate-300 lg:p-20 p-8 pt-10 w-80 rounded-2xl">
                    <p className="">
                      <strong>Email :</strong> {userInfo?.email}
                    </p>
                    <p className="">
                      <strong>Phone :</strong> {userInfo?.phoneNumber}
                    </p>
                    <p className="">
                      <strong>Whatsapp :</strong>{" "}
                      {userInfo?.whatsappNumber || userInfo?.phoneNumber}
                    </p>
                    <p className="">
                      <strong>Verified :</strong>{" "}
                      {userInfo?.isVerified ? "Yes" : "No"}
                    </p>
                    <p className="">
                      <strong>Joined At :</strong>{" "}
                      {moment(userInfo?.createdAt).fromNow()}
                    </p>
                  </div>
                </div>

                <div className="mt-4  gap-5  h-full flex flex-col lg:w-96  p-8 pt-10 w-80 space-y-2 border bg-slate-300 lg:p-20 rounded-2xl">
                  <p className="">
                    <strong>Car Ads :</strong> {userInfo?.myCarAds?.length}
                  </p>
                  <p className="">
                    <strong>Truck Ads :</strong> {userInfo?.myTruckAds?.length}
                  </p>
                  <p className="">
                    <strong>Two Wheeler Ads :</strong>{" "}
                    {userInfo?.myTwoWheelerAds?.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={`${openSidebar ? " select-none " : ""}`}>
          {activeSidebar == 1 && <AgentAllAds data={AllAdsData} />}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
