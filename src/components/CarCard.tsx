import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car } from "@/types/car";
import {
  Heart,
  Star,
  Fuel,
  Gauge,
  Calendar,
  MapPin,
  Zap,
  Eye,
} from "lucide-react";
import { useState } from "react";

interface CarCardProps {
  car: Car;
  onClick: (car: Car) => void;
  index: number;
}

export default function CarCard({ car, onClick, index }: CarCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("en-US").format(mileage);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <Card className="overflow-hidden bg-premium-900/50 backdrop-blur-sm border border-premium-700/50 hover:border-brand-500/50 transition-all duration-500 h-full flex flex-col hover:shadow-2xl hover:shadow-brand-500/10">
        <div className="relative overflow-hidden">
          {/* Image Container */}
          <div className="relative h-48 bg-premium-800">
            <motion.img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                // Fallback to a placeholder image if the original fails
                const target = e.target as HTMLImageElement;
                target.src = `https://via.placeholder.com/800x600/1e293b/3b82f6?text=${encodeURIComponent(
                  car.make + " " + car.model,
                )}`;
                setImageLoaded(true);
              }}
              loading="lazy"
            />

            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-premium-800 via-premium-700 to-premium-800 animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-brand-400 text-sm font-medium">
                    Loading...
                  </div>
                </div>
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-premium-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Condition Badge */}
            <div className="absolute top-3 left-3">
              <Badge
                className={`font-semibold border-0 ${
                  car.condition === "New"
                    ? "bg-emerald-500/20 text-emerald-400 backdrop-blur-sm"
                    : car.condition === "Certified Pre-Owned"
                      ? "bg-brand-500/20 text-brand-400 backdrop-blur-sm"
                      : "bg-amber-500/20 text-amber-400 backdrop-blur-sm"
                }`}
              >
                {car.condition}
              </Badge>
            </div>

            {/* Electric Badge */}
            {car.isElectric && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-0 backdrop-blur-sm font-semibold">
                  <Zap className="w-3 h-3 mr-1" />
                  Electric
                </Badge>
              </div>
            )}

            {/* Heart Icon */}
            <motion.button
              className="absolute top-3 right-3 p-2 rounded-full bg-premium-900/80 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-premium-800"
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ right: car.isElectric ? "60px" : "12px" }}
            >
              <Heart
                className={`w-4 h-4 transition-colors duration-200 ${
                  isLiked
                    ? "text-red-400 fill-red-400"
                    : "text-gray-400 hover:text-red-400"
                }`}
              />
            </motion.button>

            {/* View Details Button */}
            <motion.button
              className="absolute bottom-3 right-3 px-4 py-2 bg-brand-500 text-white rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 hover:bg-brand-600 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                onClick(car);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-4 h-4" />
              Details
            </motion.button>
          </div>

          <CardContent className="p-6 flex-1 flex flex-col bg-premium-900/30 backdrop-blur-sm">
            {/* Price */}
            <div className="flex items-center justify-between mb-3">
              <motion.h3
                className="text-2xl font-bold text-brand-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {formatPrice(car.price)}
              </motion.h3>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-gray-300">
                  {car.rating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500">({car.reviews})</span>
              </div>
            </div>

            {/* Car Title */}
            <motion.h4
              className="text-xl font-bold text-white mb-2 min-h-[3.5rem] flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="line-clamp-2">
                {car.year} {car.make} {car.model}
              </span>
            </motion.h4>

            {/* Car Info Grid */}
            <motion.div
              className="grid grid-cols-2 gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Gauge className="w-4 h-4 text-brand-400" />
                <span>{formatMileage(car.mileage)} mi</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Fuel className="w-4 h-4 text-emerald-400" />
                <span>{car.fuelType}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>{car.year}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>{car.location}</span>
              </div>
            </motion.div>

            {/* Features Preview - Fixed Height */}
            <motion.div
              className="flex flex-wrap gap-1 mb-4 min-h-[2.5rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {car.features.slice(0, 3).map((feature, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs px-2 py-1 bg-premium-800/50 text-gray-300 border-premium-600"
                >
                  {feature}
                </Badge>
              ))}
              {car.features.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-1 bg-brand-500/20 text-brand-400 border-brand-500/30"
                >
                  +{car.features.length - 3} more
                </Badge>
              )}
            </motion.div>

            {/* Electric Car Info - Fixed Height */}
            <div className="mb-4">
              {car.isElectric && car.range ? (
                <motion.div
                  className="flex items-center justify-between p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">
                      {car.range} mi range
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400">
                    {car.chargingTime}
                  </span>
                </motion.div>
              ) : (
                <div className="h-[3.25rem]"></div>
              )}
            </div>

            {/* Spacer to push dealer info to bottom */}
            <div className="flex-1"></div>

            {/* Dealer Info - Always at bottom */}
            <motion.div
              className="pt-4 border-t border-premium-700 mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-sm text-gray-500">{car.dealer}</p>
            </motion.div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
