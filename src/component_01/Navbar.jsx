import { ChevronDown, CircleUser, Heart, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { customer_logout } from "../../rtk/slices/authSlice";
import Swal from "sweetalert2";
import logo from "/logo/karlo.png";
const Navbar = () => {
  const financeData = [
    { text: "cars in madhyapradesh", path: "mp" },
    { text: "cars in gujrat", path: "gj" },
    { text: "cars in chhattisgarh", path: "/cg" },
    { text: "cars in maharastra", path: "/mh" },
    { text: "sell cars", path: "" },
    { text: "Buy used car", path: "" },
  ];
  const { userInfo } = useSelector((slice) => slice.auth);
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  function logout() {
    Swal.fire({
      title: "Are you sure ?",
      text: "you will be redirected to login page",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout !",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "logout",
          text: "logout successfully.",
          icon: "success",
        });

        dispatch(customer_logout());
      }
      setOpen(false);
    });
  }
  return (
    <div className="flex lg:px-34 px-0 shadow-md border border-b fixed z-70 bg-white border-gray-100 border-r-0 w-full lg:h-20 h-16 ">
      <div className="flex lg:gap-2 gap-0 items-center w-full  justify-center lg:justify-between ">
        <div className="cursor-pointer">
          <Link to={"/"}>
            <img className="lg:w-64 w-32  mt-1" src={logo} alt="" />
          </Link>
        </div>
        <div
          className={`lg:flex lg:gap-8 gap-4 hidden items-center  cursor-pointer`}
        >
          {financeData.map((item, idx) => (
            <Link key={idx + "link"} to={item.path}>
              <div className="gap-2 cursor-pointer after:absolute after:block  after:bottom-5 w-fit  after:w-0 hover:after:w-32 after:duration-500 after:h-1 after:bg-[#fc2e00] after:content-[''] ">
                <p className="lg:text-lg text-xs text-[#0F0F26f]">
                  {item.text}
                </p>
                {/* <ChevronDown className={`size-5 lg:flex hidden`} /> */}
              </div>
            </Link>
          ))}
          <div
            className="px-4 py-2 flex gap-4 rounded-xl bg-green-700 items-center text-white  "
            onClick={() => {
              window.location.href = "tel:+918770800807";
            }}
          >
            <Phone color="white" />
            8770800807
          </div>
        </div>
        {userInfo && userInfo.role == "agent" ? (
          <div className="bg-black text-white lg:px-6 min-w-20 flex items-center justify-center py-4 cursor-pointer  rounded-xl mr-4">
            <Link to={"/agent/myAds"}>
              <div className="gap-2  ">
                <p className="lg:text-lg w-fit text-xs text-[#0F0F26f]">
                  my ads
                </p>
                {/* <ChevronDown className={`size-5 lg:flex hidden`} /> */}
              </div>
            </Link>
          </div>
        ) : (
          <div></div>
        )}
        <div className={`flex  gap-4 items-center justify-center`}>
          <div className="flex lg:gap-5 gap-3  cursor-pointer">
            {userInfo && <Heart className="size-10" />}
            {userInfo && (
              <div className="relative">
                <img
                  src={userInfo.avatar}
                  onClick={() => setOpen(!open)}
                  className="object-cover h-10 w-10 rounded-full cursor-pointer"
                />
                {open && (
                  <div
                    className="absolute shadow-sm w-32 border-gray-300 border h-24 flex flex-col text-lg bg-white   rounded-2xl "
                    // onClick={() => setOpen(!open)}
                  >
                    <div className="px-4 py-2 border-b border-gray-300">
                      <Link to={"/agent/myads"}>profile</Link>
                    </div>
                    <div className="px-4 py-2" onClick={logout}>
                      logout
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {!userInfo && (
            <div className="flex  flex-row gap-4 cursor-pointer ">
              <div className="cursor-pointer  text-white">
                <Link
                  className="py-4 rounded-md px-6  bg-black"
                  to={"/register"}
                >
                  {" "}
                  Sign up
                </Link>
              </div>
              <div className="cursor-pointer ">
                <Link
                  to={"/login"}
                  className="py-4 rounded-md px-6  text-black bg-white border hover:border-2  border-black"
                >
                  {" "}
                  Log in
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
