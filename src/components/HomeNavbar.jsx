import React from "react";
import { Link } from "react-router-dom";
import karlo from "/logo/karlo.png";
import { useSelector } from "react-redux";
const HomeNavbar = () => {
  const { userInfo } = useSelector((slice) => slice.auth);
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
    <div>
      <div className="flex fixed top-0 left-0 lg:flex-row flex-col  h-[120px] z-100 w-full backdrop-blur-2xl rounded-b-xl bg-white/50 mt-0 items-center justify-between   lg:px-12 py-5">
        <div className="flex gap-2 ">
          {/* <img src="" alt="logo" /> */}
          <Link to={"/"} className="lg:text-3xl text-lg font-bold">
            <h1> KARLO</h1>
            {/* <img src={karlo} alt="karlo image" className="w-64" /> */}
          </Link>
        </div>
        <div className="flex lg:gap-6  gap-2  text-sm items-center">
          <Link
            to="/agent/post/vehicle"
            className="p-4 lg:px-10  px-8  text-white rounded-xl text-sm lg:text-xl bg-black cursor-pointer"
          >
            Sell
          </Link>
          <Link
            to="/ads"
            className="p-4 lg:px-10 text-white rounded-xl text-sm lg:text-xl bg-black cursor-pointer"
          >
            See Ads
          </Link>
          {userInfo ? (
            <div
              className="p-4   px-5 lg:px-10 text-gray-800 rounded-xl bg-gray-300 font-semibiold lg:text-xl text-sm  cursor-pointer"
              onClick={logout}
            >
              Logout :
            </div>
          ) : (
            <Link
              to={"/login"}
              className="p-4 lg:px-10 text-gray-800 rounded-xl bg-gray-300 font-semibiold text-sm w-fit lg:text-xl  cursor-pointer"
            >
              Login :
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
