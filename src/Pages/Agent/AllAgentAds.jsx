import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agent_myads } from "../../../rtk/slices/agentSlice";
import { formatNumberWithCommas } from "../../lib/utils";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";

const AllAgentAds = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(agent_myads());
  }, []);
  const { myAds } = useSelector((slice) => slice.agent);
  
  const downloadCSV = (data) => {
    if (!data || data.length === 0) return;
    const csv = Papa.unparse(data.map(item => ({
      Name: item.name,
      Brand: item.brand,
      Model: item.model,
      Year: item.year,
      Price: item.price,
      Location: item.location,
      "KM Driven": item.totalKmDriven,
      Fuel: item.fuelType,
      Transmission: item.transmission
    })));
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "agent_ads.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadPDF = (data) => {
    if (!data || data.length === 0) return;
    const doc = new jsPDF();
    doc.text("Agent Ads Report", 14, 22);
    
    const tableColumn = ["Name", "Brand", "Year", "Price", "Location", "Fuel"];
    const tableRows = [];

    data.forEach(item => {
      const rowData = [
        item.name,
        item.brand,
        item.year,
        formatNumberWithCommas(item.price),
        item.location,
        item.fuelType
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });
    doc.save("agent_ads.pdf");
  };

  return (
    <div className="xl:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-5 gap-4">
        <h1 className="text-5xl drop-shadow-lg text-center racing uppercase flex-grow md:text-left">
          Agent Ads
        </h1>
        <div className="flex gap-4">
           <button
            onClick={() => downloadCSV(myAds)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-md"
          >
            Export CSV
          </button>
          <button
            onClick={() => downloadPDF(myAds)}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-md"
          >
            Export PDF
          </button>
        </div>
      </div>

      <div className="my-10 flex gap-12 items-center flex-wrap lg:justify-start justify-center">
        {myAds?.map((item, idx) => (
          <Link key={item.slug + idx} to={`/vehicle/detail/${item.slug}`}>
            <div className="flex relative flex-col gap-4 w-[340px] bg-slate-800 hover:bg-slate-700 group duration-500 cursor-pointer text-white items-center p-4 rounded-xl justify-center shadow-xl border border-slate-700">
              <div className="h-8 w-fit px-4 flex items-center justify-center text-white bg-red-500 rounded-full text-xs absolute top-10 left-5 shadow-lg z-10">
                {item.commision}% commison excluded
              </div>
              <div className="racing tracking-wider text-xl mt-8 text-center h-14 flex items-center">{item.name}</div>
              <div className="w-full h-[200px] overflow-hidden rounded-xl">
                 <img
                  src={item.thumbnail}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  alt={item.slug}
                />
              </div>
              <div className="text-2xl font-bold text-orange-400">₹ {formatNumberWithCommas(item.price)}</div>
              <div className="bg-slate-900/80 backdrop-blur-md group-hover:bg-slate-800/90 py-4 w-full rounded-lg text-gray-300 flex flex-wrap items-center justify-between px-4 transition-colors">
                <div className="flex divide-y divide-gray-600 flex-col gap-2 text-xs w-[45%]">
                  <div className="py-1"><span className="font-semibold text-gray-400">Brand:</span> {item.brand}</div>
                  <div className="py-1"><span className="font-semibold text-gray-400">Year:</span> {item.year}</div>
                  <div className="py-1"><span className="font-semibold text-gray-400">Owners:</span> {item.owners}</div>
                  <div className="py-1"><span className="font-semibold text-gray-400">Loc:</span> {item.location}</div>
                  <div className="py-1"><span className="font-semibold text-gray-400">Color:</span> {item.color}</div>
                </div>
                <div className="flex divide-y flex-col gap-2 text-xs divide-gray-600 w-[45%] text-right">
                   <div className="py-1">
                    {item.totalKmDriven}{" "}
                    <span className="text-gray-500">kms</span>
                  </div>
                  {item.bodyType && <div className="py-1 capitalize">{item.bodyType}</div>}
                  <div className="py-1 capitalize">{item.transmission} </div>
                  <div className="py-1 capitalize">
                    {item.fuelType}{" "}
                    <span className="text-gray-500">fuel</span>
                  </div>
                  <div className="py-1">{item.seat} seater</div>
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
