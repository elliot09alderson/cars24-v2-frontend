import { BadgeCheck, Heart, PhoneCall } from "lucide-react";
import React, { useState, useEffect } from "react";
import direct from "/public/image/direct.png";
import checklist from "/public/image/checklist.png";
import { formatNumberWithCommas } from "../../../lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist, getWishlist } from "../../../../rtk/slices/customerSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Book_free = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((slice) => slice.auth);
  const { wishlist } = useSelector((slice) => slice.customer);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.role === "customer") {
      dispatch(getWishlist());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (wishlist && data?._id) {
      const found = wishlist.some((item) => item._id === data._id);
      setIsInWishlist(found);
    }
  }, [wishlist, data]);

  const handleWishlistToggle = async () => {
    if (!userInfo) {
      toast.info("Please login to add to wishlist");
      navigate("/login");
      return;
    }

    if (userInfo.role !== "customer") {
      toast.info("Only customers can add to wishlist");
      return;
    }

    setWishlistLoading(true);
    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist(data._id)).unwrap();
        setIsInWishlist(false);
        toast.success("Removed from wishlist");
      } else {
        await dispatch(addToWishlist(data._id)).unwrap();
        setIsInWishlist(true);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
    setWishlistLoading(false);
  };

  return (
    <div className="flex gap-4 bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/30 flex-col w-full sticky top-28 relative">
      <div className="flex flex-col gap-3 px-5 lg:px-6 py-8">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="lg:text-2xl text-xl font-semibold leading-tight text-gray-900">
              {data?.name} {data?.serialNo}
            </h1>
            {userInfo?.role == "agent" && (
              <span className="w-fit px-3 py-1 text-white bg-red-500 rounded-full text-xs font-medium">
                {data.commision}% commison included
              </span>
            )}
          </div>
          <button
            onClick={handleWishlistToggle}
            disabled={wishlistLoading}
            className={`p-2 rounded-xl transition-all duration-300 shrink-0 ${
              isInWishlist
                ? "bg-red-50 text-red-500"
                : "bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500"
            } ${wishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`size-6 ${isInWishlist ? "fill-current" : ""}`} />
          </button>
        </div>
        <p className="text-2xl font-semibold capitalize mt-2">{data.transmission}</p>
        <div className="flex flex-wrap items-center text-gray-600 gap-2 w-full">
          <span className="py-1.5 px-3 rounded-lg bg-gray-100 font-medium text-xs lg:text-sm whitespace-nowrap">
            {formatNumberWithCommas(data?.totalKmDriven)} km
          </span>
          <span className="py-1.5 px-3 rounded-lg bg-gray-100 font-medium text-xs lg:text-sm whitespace-nowrap">
            {data?.owners}
          </span>
          <span className="py-1.5 px-3 rounded-lg bg-gray-100 font-medium text-xs lg:text-sm whitespace-nowrap">
            {data?.transmission ? data.transmission : "Manual"}
          </span>
          <span className="py-1.5 px-3 rounded-lg bg-gray-100 font-medium text-xs lg:text-sm whitespace-nowrap">
            {data?.fuelType}
          </span>
          <span className="py-1.5 px-3 rounded-lg bg-gray-100 font-medium text-xs lg:text-sm whitespace-nowrap">
            {data?.serialNo}
          </span>
        </div>
        <div className="flex justify-between pt-2">
          <div className="flex items-center gap-2">
            <img className="size-4 text-[#D46231]" src={direct} alt="" />
            <p className="text-[#717272] border-b border-dashed font-semibold text-lg">
              {data?.location}
            </p>
          </div>
          <div className="flex items-center gap-2 text-[#D46231]">
            <PhoneCall className="size-4 " />
            <p className="text-[#D46231] font-semibold">Call Hub</p>
          </div>
        </div>
        <div className="flex justify-between rounded-l-lg bg-linear-to-r  from-gray-100 to-white px-2  p-1 ">
          {data?.assured && (
            <div className="flex gap-2 items-center">
              <img className="size-4" src={checklist} alt="" />
              <p>KARLO Assured</p>
            </div>
          )}
          <p className="border-b border-dashed text-xs font-semibold">
            Know benefits
          </p>
        </div>
        <div
          className="flex flex-col rounded-xl 
        p-4 border-gray-200 pt-2 mt-3 border-t border  gap-2"
        >
          <div className="flex bg-[#F5F5F5]  justify-between px-3 items-center py-3 ">
            <div className="flex flex-col gap-2">
              <p className="lg:text-lg   text-sm font-semibold">
                ₹
                {formatNumberWithCommas(
                  data?.price + (data?.price * data.commision) / 100
                )}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                +7,796 other charges
              </p>
            </div>
            <p className="text-sm lg:text-lg font-semibold">Price breakup →</p>
          </div>
          <div className="flex  justify-between px-3 items-center">
            <div className="flex flex-col gap-4">
              <p>EMI starts at</p>
              <p className="text-xl font-semibold">
                ₹{formatNumberWithCommas(Math.round(data?.price / 36))}/mo
              </p>
            </div>
            <p className="text-sm lg:text-lg font-semibold">
              Check eligibility →
            </p>
          </div>
        </div>

        <div className="p-3 text-center bg-[#EF6E0B] rounded-xl mt-34  text-white font-semibold text-lg cursor-pointer hover:bg-[#EF6E0B]/80 duration-400">
          Book free test drive
        </div>
      </div>
    </div>
  );
};

export default Book_free;
