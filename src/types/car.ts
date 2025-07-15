export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  images: string[];
  description: string;
  mileage: number;
  fuelType: "Gasoline" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Manual" | "Automatic" | "CVT";
  engineSize: string;
  horsepower: number;
  color: string;
  bodyType:
    | "Sedan"
    | "SUV"
    | "Hatchback"
    | "Coupe"
    | "Convertible"
    | "Truck"
    | "Wagon";
  drivetrain: "FWD" | "RWD" | "AWD" | "4WD";
  features: string[];
  condition: "New" | "Used" | "Certified Pre-Owned";
  location: string;
  dealer: string;
  rating: number;
  reviews: number;
  isElectric?: boolean;
  range?: number; // for electric cars
  chargingTime?: string; // for electric cars
}

export interface CarFilters {
  make?: string;
  bodyType?: string;
  fuelType?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  yearRange?: {
    min: number;
    max: number;
  };
  condition?: string;
}
