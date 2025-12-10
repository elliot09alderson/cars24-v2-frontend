import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Accordion = () => {
  const accordionData = [
    {
      title: "What are government auctioned vehicles?",
      subheading:
        "Government auctioned vehicles are cars, bikes, and other vehicles that have been officially seized, confiscated, or retired by government departments such as banks, customs, income tax, police, or public sector units. These vehicles are then sold through authorized auctions at significantly lower prices than market value.",
    },
    {
      title: "Are these vehicles 100% legal to purchase?",
      subheading:
        "Yes, absolutely! All vehicles listed on KARLO are sourced from official government auctions conducted by authorized bodies. We hold a valid license to deal in government auctioned vehicles. Every vehicle comes with proper documentation including auction release certificate, NOC from the concerned department, and clear title transfer papers.",
    },
    {
      title: "Is there any tax or hidden charges on these vehicles?",
      subheading:
        "No, there are no taxes or hidden charges! Government auctioned vehicles are exempt from certain taxes as they are sold through official government channels. The price you see is the price you pay. We maintain complete transparency with no additional fees, road tax complications, or surprise charges at the time of delivery.",
    },
    {
      title: "What documents will I receive with the vehicle?",
      subheading:
        "You will receive all essential documents including: Original RC (Registration Certificate) transferred to your name, Auction Release Certificate from the government department, NOC (No Objection Certificate) from the concerned authority, Insurance transfer papers, PUC certificate, and complete service history (if available). All paperwork for ownership transfer is handled by our team.",
    },
    {
      title: "How is the condition of government auctioned vehicles?",
      subheading:
        "Vehicle conditions vary from excellent to good. Many are low-mileage vehicles from government offices, banks, or seized from defaulters. Each vehicle on KARLO undergoes a thorough 150+ point inspection. We provide detailed condition reports, high-quality photos, and complete transparency about any wear or repairs needed. What you see is what you get.",
    },
    {
      title: "Can I inspect the vehicle before purchasing?",
      subheading:
        "Yes, we encourage all buyers to physically inspect vehicles before purchase. You can visit our showroom or yard to examine the vehicle, take a test drive, and verify all documents. Our team will assist you with the inspection and answer any questions about the vehicle's history and condition.",
    },
    {
      title: "How do I transfer the vehicle to my name?",
      subheading:
        "We handle the entire RTO transfer process for you! Once payment is confirmed, our dedicated team manages all paperwork including RC transfer, address update, and new registration if required. The process typically takes 15-30 days depending on the RTO. You'll receive the transferred RC directly at your registered address.",
    },
    {
      title: "What payment methods are accepted?",
      subheading:
        "We accept multiple payment options for your convenience: Bank transfer (NEFT/RTGS/IMPS), Demand Draft, UPI payments, and Cheque. For high-value purchases, we also facilitate bank loan assistance through our partner financial institutions. A token amount is required to book the vehicle, with the balance payable before delivery.",
    },
    {
      title: "Is there any warranty on government auctioned vehicles?",
      subheading:
        "While government auctioned vehicles are sold on an 'as-is' basis from auctions, KARLO provides a 7-day return policy and 30-day engine & transmission warranty on select vehicles. We also offer optional extended warranty packages for additional peace of mind. All warranty terms are clearly mentioned on each vehicle listing.",
    },
    {
      title: "Why are government auction vehicles cheaper than market price?",
      subheading:
        "Government auctions are designed for quick disposal of vehicles, not profit maximization. Banks want to recover loan amounts, government departments need to clear inventory, and customs wants to auction seized goods efficiently. This creates an opportunity for buyers to get quality vehicles at 30-50% below market value. As licensed dealers, we pass these savings directly to you.",
    },
    {
      title: "Can I get finance/loan for purchasing these vehicles?",
      subheading:
        "Yes! We have tie-ups with leading banks and NBFCs who provide loans for government auctioned vehicles. Loan approval depends on vehicle age, your credit score, and income documents. Our finance team assists you with the entire loan process, documentation, and helps you get the best interest rates available.",
    },
    {
      title: "What types of vehicles are available?",
      subheading:
        "We have a wide variety of vehicles including: Hatchbacks, Sedans, SUVs, MUVs, Luxury cars, Commercial vehicles, and Two-wheelers. Brands include Maruti Suzuki, Hyundai, Honda, Toyota, Tata, Mahindra, and premium brands like BMW, Mercedes, and Audi. New inventory is added regularly as government auctions happen throughout the year.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <div className="lg:w-full h-auto px-4 lg:px-0 pb-10">
      <p className="lg:font-bold font-semibold text-xl lg:text-2xl py-10 text-gray-900">
        Frequently Asked Questions
      </p>
      <div className="flex flex-col gap-4">
        {accordionData.map((item, idx) => (
          <div
            onClick={() => setOpen((prev) => (prev === idx ? null : idx))}
            key={idx + "accordion"}
            className={`flex flex-col bg-white/90 backdrop-blur-sm p-4 lg:p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
              idx === open
                ? "shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-orange-200"
                : "shadow-[0_2px_10px_rgba(0,0,0,0.04)] border-gray-100 hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 lg:gap-4 flex-1">
                <span className={`w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center text-sm lg:text-base font-bold transition-all duration-300 ${
                  idx === open
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {idx + 1}
                </span>
                <p className={`lg:text-base text-sm font-semibold transition-colors duration-300 ${
                  idx === open ? "text-gray-900" : "text-gray-700"
                }`}>
                  {item.title}
                </p>
              </div>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                idx === open
                  ? "bg-orange-100 text-orange-500"
                  : "bg-gray-100 text-gray-500"
              }`}>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    idx === open ? "rotate-180" : ""
                  }`}
                  size={18}
                />
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                idx === open ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-11 lg:pl-14 pr-2">
                <p className="lg:text-base text-sm text-gray-600 leading-relaxed">
                  {item.subheading}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-10 p-6 lg:p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100">
        <h3 className="text-lg lg:text-xl font-bold text-center mb-6 text-gray-900">
          Why Trust KARLO?
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="p-4 bg-gradient-to-br from-orange-50 to-white rounded-2xl text-center">
            <p className="text-2xl lg:text-3xl font-bold text-orange-500">100%</p>
            <p className="text-xs lg:text-sm text-gray-600 mt-1">Legal & Official</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl text-center">
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">0%</p>
            <p className="text-xs lg:text-sm text-gray-600 mt-1">Hidden Charges</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-white rounded-2xl text-center">
            <p className="text-2xl lg:text-3xl font-bold text-orange-500">Licensed</p>
            <p className="text-xs lg:text-sm text-gray-600 mt-1">Govt. Authorized</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl text-center">
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">150+</p>
            <p className="text-xs lg:text-sm text-gray-600 mt-1">Point Inspection</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
