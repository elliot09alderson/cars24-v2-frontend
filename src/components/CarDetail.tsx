import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Car } from "@/types/car";
import {
  X,
  Star,
  Fuel,
  Gauge,
  Calendar,
  MapPin,
  Zap,
  Phone,
  Mail,
  Heart,
  Share,
  Settings,
  Shield,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface CarDetailProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CarDetail({ car, isOpen, onClose }: CarDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!car) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("en-US").format(mileage);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + car.images.length) % car.images.length,
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[65vh]   p-0 bg-premium-950 border-premium-700">
        <DialogHeader className="sr-only">
          <DialogTitle>
            {car.make} {car.model} {car.year} - Details
          </DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col lg:flex-row h-full"
        >
          {/* Image Section */}
          <div className="lg:w-1/2 relative bg-premium-900">
            <div className="relative h-80 lg:h-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={car.images[currentImageIndex]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {car.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-premium-900/80 hover:bg-premium-800/80 text-white backdrop-blur-sm border-premium-700"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-premium-900/80 hover:bg-premium-800/80 text-white backdrop-blur-sm border-premium-700"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}

              {/* Image Indicators */}
              {car.images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {car.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-brand-400"
                          : "bg-white/30"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-6 left-6 flex gap-3">
                <Badge
                  className={`font-semibold border-0 backdrop-blur-sm ${
                    car.condition === "New"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : car.condition === "Certified Pre-Owned"
                        ? "bg-brand-500/20 text-brand-400"
                        : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {car.condition}
                </Badge>
                {car.isElectric && (
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-0 backdrop-blur-sm font-semibold">
                    <Zap className="w-3 h-3 mr-1" />
                    Electric
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-premium-900/80 hover:bg-premium-800/80 text-white backdrop-blur-sm border-premium-700"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-red-400 text-red-400" : ""}`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-premium-900/80 hover:bg-premium-800/80 text-white backdrop-blur-sm border-premium-700"
                >
                  <Share className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-8 overflow-y-auto bg-premium-950">
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <motion.h1
                    className="text-4xl font-bold text-white leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {car.year} {car.make}
                    <span className="text-brand-400">{` ${car.model}`}</span>
                  </motion.h1>
                  {/* <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-gray-400 hover:text-white hover:bg-premium-800"
                  >
                    <X className="w-6 h-6" />
                  </Button> */}
                </div>

                <motion.div
                  className="flex items-center gap-6 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-5xl font-bold text-brand-400">
                    {formatPrice(car.price)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <span className="text-xl font-semibold text-white">
                      {car.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-400">
                      ({car.reviews} reviews)
                    </span>
                  </div>
                </motion.div>

                <motion.p
                  className="text-gray-300 leading-relaxed text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {car.description}
                </motion.p>
              </div>

              <Separator className="bg-premium-700" />

              {/* Key Specs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-white">
                  <Settings className="w-6 h-6 text-brand-400" />
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-4 bg-premium-900/50 rounded-xl border border-premium-700">
                    <Gauge className="w-6 h-6 text-brand-400" />
                    <div>
                      <div className="font-semibold text-white">Mileage</div>
                      <div className="text-gray-400">
                        {formatMileage(car.mileage)} miles
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-premium-900/50 rounded-xl border border-premium-700">
                    <Fuel className="w-6 h-6 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-white">Fuel Type</div>
                      <div className="text-gray-400">{car.fuelType}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-premium-900/50 rounded-xl border border-premium-700">
                    <Calendar className="w-6 h-6 text-purple-400" />
                    <div>
                      <div className="font-semibold text-white">Year</div>
                      <div className="text-gray-400">{car.year}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-premium-900/50 rounded-xl border border-premium-700">
                    <Settings className="w-6 h-6 text-orange-400" />
                    <div>
                      <div className="font-semibold text-white">
                        Transmission
                      </div>
                      <div className="text-gray-400">{car.transmission}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Electric Car Details */}
              {car.isElectric && car.range && (
                <motion.div
                  className="p-6 bg-emerald-500/10 rounded-xl border border-emerald-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="font-semibold text-emerald-400 mb-4 flex items-center gap-3 text-lg">
                    <Zap className="w-6 h-6" />
                    Electric Vehicle Details
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <span className="text-emerald-300 font-medium">
                        Range:
                      </span>
                      <span className="ml-3 text-emerald-400 font-semibold">
                        {car.range} kms
                      </span>
                    </div>
                    <div>
                      <span className="text-emerald-300 font-medium">
                        Charging:
                      </span>
                      <span className="ml-3 text-emerald-400 font-semibold">
                        {car.chargingTime}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Features */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-white">
                  <Award className="w-6 h-6 text-brand-400" />
                  Features & Equipment
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {car.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-brand-500/10 rounded-lg border border-brand-500/20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                    >
                      <div className="w-2 h-2 bg-brand-400 rounded-full" />
                      <span className="text-brand-300 font-medium">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div> */}

              {/* Dealer Info */}
              <motion.div
                className="p-6 bg-premium-900/50 rounded-xl border border-premium-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-white">
                  <Shield className="w-6 h-6 text-brand-400" />
                  Dealer Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-white">{car.dealer}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400">{car.location}</span>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Button className="flex-1 bg-brand-500 hover:bg-brand-600 text-white py-4 text-lg font-semibold">
                  <Phone className="w-5 h-5 mr-3" />
                  Call Dealer
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-premium-600 bg-premium-900/50 text-white hover:bg-premium-800 py-4 text-lg font-semibold"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Email Dealer
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
