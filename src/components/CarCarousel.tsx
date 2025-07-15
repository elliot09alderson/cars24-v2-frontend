import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car } from "@/types/car";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Play,
  ArrowRight,
  MapPin,
  Calendar,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

interface CarCarouselProps {
  cars: Car[];
  onCarSelect: (car: Car) => void;
}

export default function CarCarousel({ cars, onCarSelect }: CarCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentCar = cars[currentIndex];

  const nextCar = () => {
    setCurrentIndex((prev) => (prev + 1) % cars.length);
  };

  const prevCar = () => {
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance effect
  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % cars.length);
      }, 8000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlay, cars.length]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price * 90);
  };

  if (!currentCar) return null;

  return (
    <div className="relative w-full h-screen bg-black/50 overflow-hidden">
      {/* Fixed Header */}

      {/* Main Hero Section */}
      <div className="relative h-full ">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="relative h-full"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${currentCar.image})`,
                filter: "brightness(0.9) contrast(1.1)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
            </div>

            {/* Content Overlay */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="space-y-8"
                  >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      {currentCar.condition}
                    </div>

                    {/* Main Heading */}
                    <div>
                      <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                        {currentCar.make}
                      </h1>
                      <h2 className="text-3xl lg:text-4xl font-light text-white/90 mt-2">
                        {currentCar.model} {currentCar.year}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-white/80 leading-relaxed max-w-md">
                      {currentCar.description}
                    </p>

                    {/* Specs */}
                    <div className="flex items-center gap-8 text-white">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {currentCar.horsepower}
                        </div>
                        <div className="text-sm text-white/70">HP</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {currentCar.engineSize.replace("L", "")}L
                        </div>
                        <div className="text-sm text-white/70">Engine</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {currentCar.transmission === "Manual" ? "6MT" : "8AT"}
                        </div>
                        <div className="text-sm text-white/70">Trans</div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-4">
                      <Button
                        size="lg"
                        className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-4"
                        onClick={() => onCarSelect(currentCar)}
                      >
                        Configure Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Video
                      </Button>
                    </div>
                  </motion.div>

                  {/* Right Content - Pricing Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="lg:justify-self-end"
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-md">
                      <div className="space-y-6">
                        {/* Price */}
                        <div>
                          <div className="text-sm text-gray-600 font-medium">
                            Starting from
                          </div>
                          <div className="text-4xl font-bold text-black">
                            {formatPrice(currentCar.price)}
                          </div>
                          <div className="text-sm text-gray-600">
                            MSRP excluding options
                          </div>
                        </div>

                        {/* Key Features */}
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-3">
                            Key Features
                          </div>
                          <div className="space-y-2">
                            {currentCar.features
                              .slice(0, 4)
                              .map((feature, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center text-sm text-gray-700"
                                >
                                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                                  {feature}
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Location */}
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-2" />
                            {currentCar.location}
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {currentCar.dealer}
                          </div>
                        </div>

                        {/* Contact Options */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs"
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs"
                          >
                            <Mail className="w-3 h-3 mr-1" />
                            Email
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs"
                          >
                            <Calendar className="w-3 h-3 mr-1" />
                            Visit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevCar}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-40"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextCar}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-40"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
          <div className="flex items-center gap-4">
            {/* Slide Indicators */}
            <div className="flex items-center gap-2">
              {cars.slice(0, 8).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
              {cars.length > 8 && (
                <div className="text-white/70 text-sm font-medium ml-2">
                  {currentIndex + 1} / {cars.length}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-white/30" />

            {/* Auto-play Toggle */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isAutoPlay ? "bg-white text-black" : "bg-white/20 text-white"
              }`}
            >
              <Play className="w-4 h-4" />
            </button>

            {/* Model Selector */}
            <div className="flex items-center gap-2 ml-4">
              <div className="text-white/70 text-sm">Model:</div>
              <select
                value={currentIndex}
                onChange={(e) => goToSlide(parseInt(e.target.value))}
                className="bg-white/10 text-white text-sm rounded px-2 py-1 border border-white/20 backdrop-blur-sm"
              >
                {cars.map((car, index) => (
                  <option key={car.id} value={index} className="text-black">
                    {car.make} {car.model}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / cars.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
