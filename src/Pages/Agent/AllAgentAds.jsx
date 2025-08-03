import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agent_myads } from "../../../rtk/slices/agentSlice";
import { formatNumberWithCommas } from "../../lib/utils";
import { Link } from "react-router-dom";

const AllAgentAds = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(agent_myads);
  }, []);
  const { myAds } = useSelector((slice) => slice.agent);
  console.log(myAds);
  return (
    <div className="xl:px-12">
      <h1 className="text-5xl py-5 drop-shadow-lg text-center racing uppercase">
        Agent Ads
      </h1> 

      <div className="my-20 flex gap-12 items-center flex-wrap lg:justify-start  justify-center ">
        {myAds?.map((item, idx) => (
          <Link key={item.slug + idx} to={`/vehicle/detail/${item.slug}`}>
            <div className="flex relative flex-col gap-4 w-[340px] bg-slate-800 hover:bg-slate-700 group duration-500 cursor-pointer text-white items-center p-4 rounded-xl justify-center">
              <div className="h-8 w-fit px-4 flex items-center justify-center text-white bg-red-500 rounded-full text-xs absolute top-10 left-5">
                {item.commision}% commison excluded
              </div>
              {/* <div>
              ₹{formatNumberWithCommas((item.price * item.commision) / 100)}
            </div> */}
              <div className="racing tracking-wider">{item.name}</div>
              <img
                src={item.thumbnail}
                className="w-[300px] object-cover rounded-xl"
                alt={item.slug}
              />
              <div className="">₹ {formatNumberWithCommas(item.price)}</div>
              <div className="bg-slate-900 backdrop-blur-xl group-hover:bg-slate-800 py-4 w-full rounded-md text-white flex flex-wrap items-center justify-between px-4">
                <div className="flex divide-y divide-gray-400 flex-col gap-2 text-xs">
                  <div>{item.brand}</div>
                  <div>{item.year}</div>
                  <div>{item.owners}</div>
                  <div>{item.location}</div>
                  <div>{item.color}</div>
                </div>
                <div className="flex divide-y flex-col gap-2 text-xs  divide-gray-400">
                  <div>
                    {item.totalKmDriven}{" "}
                    <span className="text-gray-400">kms driven </span>
                  </div>
                  {item.bodyType && <div>{item.bodyType}</div>}
                  <div>{item.transmission} </div>
                  <div>
                    {item.fuelType}{" "}
                    <span className="text-gray-400 text-end ml-1">fuel</span>
                  </div>
                  <div>{item.seat} seater</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllAgentAds;
