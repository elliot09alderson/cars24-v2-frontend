import { Car } from "@/types/car";

// Car image URLs from Unsplash
const carImages = [
  "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", // Tesla white
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop", // BMW white
  "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop", // Audi gray
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop", // Mercedes black
  "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=800&h=600&fit=crop", // Porsche red
  "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop", // Toyota silver
  "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&h=600&fit=crop", // Honda blue
  "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop", // Ford yellow
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop", // Chevrolet red
  "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop", // Lexus white
  "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop", // Tesla black
  "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=800&h=600&fit=crop", // Tesla blue
  "https://images.unsplash.com/photo-1580414269330-8b1a4fb7b96e?w=800&h=600&fit=crop", // BMW interior
  "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=600&fit=crop", // Audi
  "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&h=600&fit=crop", // Audi Q7
  "https://images.unsplash.com/photo-1617886322207-f9c2bb0b2f47?w=800&h=600&fit=crop", // Mercedes
  "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&h=600&fit=crop", // Mercedes interior
  "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=800&h=600&fit=crop", // Porsche side
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop", // Sports car
  "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800&h=600&fit=crop", // Toyota
  "https://images.unsplash.com/photo-1550355191-aa8a80b41353?w=800&h=600&fit=crop", // Car detail
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop", // Red car
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", // White car
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop", // Car front
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop", // Blue car
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop", // Yellow car
  "https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?w=800&h=600&fit=crop", // Silver car
  "https://images.unsplash.com/photo-1494976688153-4639165c4bfd?w=800&h=600&fit=crop", // Gray car
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop", // Luxury car
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&h=600&fit=crop", // Sports car
  "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&h=600&fit=crop", // Car wheel
  "https://images.unsplash.com/photo-1549924138-48ce6ccbb7c4?w=800&h=600&fit=crop", // Black car
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop", // Red sports car
  "https://images.unsplash.com/photo-1567310043607-c6d4e71fc1cb?w=800&h=600&fit=crop", // Modern car
  "https://images.unsplash.com/photo-1595431006830-8b4519cae25a?w=800&h=600&fit=crop", // SUV
  "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=600&fit=crop", // Electric car
  "https://images.unsplash.com/photo-1600863271886-d4bd99e99b77?w=800&h=600&fit=crop", // Car interior
  "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&h=600&fit=crop", // Luxury SUV
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop", // Modern sedan
  "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&h=600&fit=crop", // Car detail
  "https://images.unsplash.com/photo-1618192750354-8e6a7c62d222?w=800&h=600&fit=crop", // Car profile
  "https://images.unsplash.com/photo-1627463148967-3a83458ca570?w=800&h=600&fit=crop", // Electric vehicle
  "https://images.unsplash.com/photo-1635910160061-0c7223e0b2e4?w=800&h=600&fit=crop", // Luxury car
  "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&h=600&fit=crop", // Car lights
  "https://images.unsplash.com/photo-1570105041904-2ba4a2a92b22?w=800&h=600&fit=crop", // Modern car
  "https://images.unsplash.com/photo-1551834372-ca5b85b8fd3d?w=800&h=600&fit=crop", // Sports car
  "https://images.unsplash.com/photo-1583267746964-c41b82df7846?w=800&h=600&fit=crop", // Convertible
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop", // Hatchback
  "https://images.unsplash.com/photo-1568844293986-8d0400bd4a46?w=800&h=600&fit=crop", // Coupe
  "https://images.unsplash.com/photo-1572312284222-7a3a7f0b0b9f?w=800&h=600&fit=crop", // Wagon
  "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&h=600&fit=crop", // Truck
];

export const mockCars: Car[] = [
  {
    id: "1",
    make: "Tesla",
    model: "Model S",
    year: 2024,
    price: 89990,
    image: carImages[0],
    images: [carImages[0], carImages[10], carImages[11]],
    description:
      "The Tesla Model S is a luxury electric sedan with incredible performance and cutting-edge technology.",
    mileage: 0,
    fuelType: "Electric",
    transmission: "Automatic",
    engineSize: "Electric Motor",
    horsepower: 670,
    color: "Pearl White",
    bodyType: "Sedan",
    drivetrain: "AWD",
    features: [
      "Autopilot",
      "Premium Interior",
      "Glass Roof",
      "Supercharging",
      "Advanced Safety Features",
      "17-inch Touchscreen",
    ],
    condition: "New",
    location: "San Francisco, CA",
    dealer: "Tesla San Francisco",
    rating: 4.8,
    reviews: 156,
    isElectric: true,
    range: 405,
    chargingTime: "30 minutes (80%)",
  },
  {
    id: "2",
    make: "BMW",
    model: "M3",
    year: 2023,
    price: 72900,
    image: carImages[1],
    images: [carImages[1], carImages[12], carImages[13]],
    description:
      "The BMW M3 delivers pure driving excitement with exceptional performance and luxury.",
    mileage: 5420,
    fuelType: "Gasoline",
    transmission: "Manual",
    engineSize: "3.0L Twin-Turbo I6",
    horsepower: 473,
    color: "Alpine White",
    bodyType: "Sedan",
    drivetrain: "RWD",
    features: [
      "M Performance Package",
      "Carbon Fiber Interior",
      "Adaptive Suspension",
      "Premium Sound System",
      "Navigation",
      "Leather Seats",
    ],
    condition: "Used",
    location: "Los Angeles, CA",
    dealer: "BMW of Beverly Hills",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: "3",
    make: "Audi",
    model: "Q7",
    year: 2024,
    price: 67500,
    image: carImages[2],
    images: [carImages[2], carImages[13], carImages[14]],
    description:
      "The Audi Q7 is a premium SUV that combines luxury, technology, and versatility.",
    mileage: 0,
    fuelType: "Gasoline",
    transmission: "Automatic",
    engineSize: "3.0L V6 TFSI",
    horsepower: 335,
    color: "Quantum Gray",
    bodyType: "SUV",
    drivetrain: "AWD",
    features: [
      "Virtual Cockpit",
      "Quattro AWD",
      "Premium Plus Package",
      "Bang & Olufsen Sound",
      "Panoramic Sunroof",
      "Advanced Driver Assistance",
    ],
    condition: "New",
    location: "New York, NY",
    dealer: "Audi Manhattan",
    rating: 4.6,
    reviews: 134,
  },
  {
    id: "4",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2023,
    price: 48900,
    image: carImages[3],
    images: [carImages[3], carImages[15], carImages[16]],
    description:
      "The Mercedes-Benz C-Class offers luxury and sophistication in a compact sedan.",
    mileage: 12500,
    fuelType: "Gasoline",
    transmission: "Automatic",
    engineSize: "2.0L Turbo I4",
    horsepower: 255,
    color: "Black",
    bodyType: "Sedan",
    drivetrain: "RWD",
    features: [
      "MBUX Infotainment",
      "LED Headlights",
      "Premium Package",
      "Heated Seats",
      "Wireless Charging",
      "Driver Assistance Package",
    ],
    condition: "Certified Pre-Owned",
    location: "Miami, FL",
    dealer: "Mercedes-Benz of Miami",
    rating: 4.5,
    reviews: 67,
  },
  {
    id: "5",
    make: "Porsche",
    model: "911",
    year: 2024,
    price: 128700,
    image: carImages[4],
    images: [carImages[4], carImages[17], carImages[18]],
    description:
      "The iconic Porsche 911 delivers legendary performance and timeless design.",
    mileage: 0,
    fuelType: "Gasoline",
    transmission: "Manual",
    engineSize: "3.0L Twin-Turbo H6",
    horsepower: 379,
    color: "Guards Red",
    bodyType: "Coupe",
    drivetrain: "RWD",
    features: [
      "Sport Chrono Package",
      "PASM Suspension",
      "Sport Seats Plus",
      "Porsche Communication Management",
      "LED Matrix Headlights",
      "Bose Surround Sound",
    ],
    condition: "New",
    location: "Chicago, IL",
    dealer: "Porsche Chicago",
    rating: 4.9,
    reviews: 203,
  },
  {
    id: "6",
    make: "Toyota",
    model: "Camry",
    year: 2023,
    price: 28500,
    image: carImages[5],
    images: [carImages[5], carImages[19]],
    description:
      "The Toyota Camry offers reliability, comfort, and efficiency in a midsize sedan.",
    mileage: 8900,
    fuelType: "Gasoline",
    transmission: "Automatic",
    engineSize: "2.5L I4",
    horsepower: 203,
    color: "Silver",
    bodyType: "Sedan",
    drivetrain: "FWD",
    features: [
      "Toyota Safety Sense",
      "Apple CarPlay",
      "LED Headlights",
      "Dual-Zone Climate",
    ],
    condition: "Used",
    location: "Seattle, WA",
    dealer: "Toyota of Seattle",
    rating: 4.4,
    reviews: 142,
  },
  {
    id: "7",
    make: "Honda",
    model: "Civic",
    year: 2024,
    price: 24200,
    image: carImages[6],
    images: [carImages[6]],
    description:
      "The Honda Civic is a compact car that combines efficiency with modern technology.",
    mileage: 0,
    fuelType: "Gasoline",
    transmission: "CVT",
    engineSize: "2.0L I4",
    horsepower: 158,
    color: "Blue",
    bodyType: "Sedan",
    drivetrain: "FWD",
    features: ["Honda Sensing", "Touchscreen Display", "Remote Start"],
    condition: "New",
    location: "Denver, CO",
    dealer: "Honda of Denver",
    rating: 4.3,
    reviews: 98,
  },
  {
    id: "8",
    make: "Ford",
    model: "Mustang",
    year: 2023,
    price: 39900,
    image: carImages[7],
    images: [carImages[7]],
    description:
      "The Ford Mustang is an American icon with powerful performance and bold styling.",
    mileage: 15600,
    fuelType: "Gasoline",
    transmission: "Manual",
    engineSize: "5.0L V8",
    horsepower: 450,
    color: "Yellow",
    bodyType: "Coupe",
    drivetrain: "RWD",
    features: ["Performance Package", "Recaro Seats", "Track Apps"],
    condition: "Used",
    location: "Detroit, MI",
    dealer: "Ford of Detroit",
    rating: 4.6,
    reviews: 87,
  },
  {
    id: "9",
    make: "Chevrolet",
    model: "Corvette",
    year: 2024,
    price: 68400,
    image: carImages[8],
    images: [carImages[8]],
    description:
      "The Chevrolet Corvette delivers supercar performance with American engineering.",
    mileage: 0,
    fuelType: "Gasoline",
    transmission: "Automatic",
    engineSize: "6.2L V8",
    horsepower: 495,
    color: "Red",
    bodyType: "Coupe",
    drivetrain: "RWD",
    features: [
      "Z51 Performance Package",
      "Magnetic Ride Control",
      "Performance Exhaust",
    ],
    condition: "New",
    location: "Dallas, TX",
    dealer: "Chevrolet of Dallas",
    rating: 4.8,
    reviews: 76,
  },
  {
    id: "10",
    make: "Lexus",
    model: "RX",
    year: 2023,
    price: 52900,
    image: carImages[9],
    images: [carImages[9]],
    description:
      "The Lexus RX offers luxury, reliability, and comfort in a premium SUV package.",
    mileage: 7800,
    fuelType: "Gasoline",
    transmission: "Automatic",
    engineSize: "3.5L V6",
    horsepower: 295,
    color: "White",
    bodyType: "SUV",
    drivetrain: "AWD",
    features: [
      "Lexus Safety System+",
      "Mark Levinson Audio",
      "Premium Package",
    ],
    condition: "Used",
    location: "Phoenix, AZ",
    dealer: "Lexus of Phoenix",
    rating: 4.5,
    reviews: 112,
  },
];

// Generate additional cars to reach 60 total
const additionalCars: Car[] = [];
const baseCars = mockCars.slice(0, 10);

const makes = [
  "Tesla",
  "BMW",
  "Audi",
  "Mercedes-Benz",
  "Porsche",
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "Lexus",
];
const models = [
  "Model S",
  "M3",
  "Q7",
  "C-Class",
  "911",
  "Camry",
  "Civic",
  "Mustang",
  "Corvette",
  "RX",
];
const locations = [
  "Boston, MA",
  "Atlanta, GA",
  "Portland, OR",
  "Austin, TX",
  "Nashville, TN",
  "Las Vegas, NV",
  "Orlando, FL",
  "Charlotte, NC",
  "Salt Lake City, UT",
  "Minneapolis, MN",
];
const colors = [
  "White",
  "Black",
  "Silver",
  "Gray",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Purple",
];

for (let i = 0; i < 50; i++) {
  const baseIndex = i % 10;
  const baseCar = baseCars[baseIndex];
  const imageIndex = (i + 10) % carImages.length;

  const newCar: Car = {
    ...baseCar,
    id: `${10 + i + 1}`,
    make: makes[i % makes.length],
    model:
      `${models[i % models.length]} ${i % 5 === 0 ? "Sport" : i % 3 === 0 ? "Luxury" : ""}`.trim(),
    year: 2020 + (i % 5),
    price:
      Math.round((baseCar.price + (Math.random() - 0.5) * 20000) / 1000) * 1000,
    image: carImages[imageIndex],
    images: [
      carImages[imageIndex],
      carImages[(imageIndex + 1) % carImages.length],
    ],
    mileage: i % 3 === 0 ? 0 : Math.floor(Math.random() * 50000),
    color: colors[i % colors.length],
    condition: ["New", "Used", "Certified Pre-Owned"][
      Math.floor(Math.random() * 3)
    ] as any,
    location: locations[i % locations.length],
    dealer: `${makes[i % makes.length]} of ${locations[i % locations.length].split(",")[0]}`,
    reviews: Math.floor(Math.random() * 200) + 10,
    rating: 4.0 + Math.random() * 1.0,
  };
  additionalCars.push(newCar);
}

export const allCars: Car[] = [...mockCars, ...additionalCars];
