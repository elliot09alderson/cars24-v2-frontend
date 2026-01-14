import { useState } from "react";
import { Car } from "@/types/car";
import { allCars } from "@/data/cars";
import CarCarousel from "./CarCarousel";


export default function CarShowcase() {
  const handleCarSelect = () => {
    const element = document.getElementById("requirement-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-premium-950">
      {/* Premium Car Carousel */}
      <CarCarousel cars={allCars} onCarSelect={handleCarSelect} />
    </div>
  );
}
