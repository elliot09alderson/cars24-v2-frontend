import { useState } from "react";
import { Car } from "@/types/car";
import { allCars } from "@/data/cars";
import CarCarousel from "./CarCarousel";
import CarDetail from "./CarDetail";

export default function CarShowcase() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car);
  };

  const handleCloseDetail = () => {
    setSelectedCar(null);
  };

  return (
    <div className="min-h-screen bg-premium-950">
      {/* Premium Car Carousel */}
      <CarCarousel cars={allCars} onCarSelect={handleCarSelect} />

      {/* Car Detail Modal */}
      <CarDetail
        car={selectedCar}
        isOpen={!!selectedCar}
        onClose={handleCloseDetail}
      />
    </div>
  );
}
