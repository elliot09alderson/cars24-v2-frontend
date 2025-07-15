import React from "react";
import Ads from "../CarSection/Ads";

import Card_Cars from "../CarSection/Card_Cars";
import Accordion from "../CarSection/Accordion";
const CarContainer = () => {
  return (
    <div className="ml-4 overflow-y-scroll">
      <Ads />

      <Card_Cars />

      <Accordion />
    </div>
  );
};

export default CarContainer;
