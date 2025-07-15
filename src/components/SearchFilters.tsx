import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CarFilters } from "@/types/car";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: CarFilters) => void;
  onClearFilters: () => void;
  resultCount: number;
}

export default function SearchFilters({
  onSearch,
  onFilter,
  onClearFilters,
  resultCount,
}: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<CarFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key: keyof CarFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
    onClearFilters();
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 mb-12"
    >
      <Card className="border-0 bg-premium-900/50 backdrop-blur-sm border border-premium-700/50 shadow-2xl">
        <CardContent className="p-8">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search luxury vehicles by make, model, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base border-2 border-premium-700 bg-premium-800/50 text-white placeholder:text-gray-400 focus:border-brand-500 focus:ring-brand-500/20"
              />
            </div>
            <Button
              type="submit"
              className="h-14 px-8 bg-brand-500 hover:bg-brand-600 text-white font-medium"
            >
              Search
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-14 px-6 border-premium-600 bg-premium-800/50 text-gray-300 hover:bg-premium-700 hover:text-white"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-2 bg-brand-500 text-white border-0">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </form>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <motion.p
              className="text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Showing{" "}
              <span className="font-semibold text-brand-400">
                {resultCount}
              </span>{" "}
              premium vehicles
            </motion.p>

            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-400 hover:text-white hover:bg-premium-800"
              >
                <X className="w-4 h-4 mr-1" />
                Clear filters
              </Button>
            )}
          </div>

          {/* Filters Panel */}
          <motion.div
            initial={false}
            animate={{
              height: showFilters ? "auto" : 0,
              opacity: showFilters ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-8 border-t border-premium-700 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Make Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Make
                  </label>
                  <Select
                    value={filters.make || "all"}
                    onValueChange={(value) =>
                      handleFilterChange(
                        "make",
                        value === "all" ? undefined : value,
                      )
                    }
                  >
                    <SelectTrigger className="border-premium-600 bg-premium-800/50 text-white focus:border-brand-500">
                      <SelectValue placeholder="Any Make" />
                    </SelectTrigger>
                    <SelectContent className="bg-premium-800 border-premium-600">
                      <SelectItem
                        value="all"
                        className="text-white hover:bg-premium-700"
                      >
                        Any Make
                      </SelectItem>
                      <SelectItem
                        value="Tesla"
                        className="text-white hover:bg-premium-700"
                      >
                        Tesla
                      </SelectItem>
                      <SelectItem
                        value="BMW"
                        className="text-white hover:bg-premium-700"
                      >
                        BMW
                      </SelectItem>
                      <SelectItem
                        value="Audi"
                        className="text-white hover:bg-premium-700"
                      >
                        Audi
                      </SelectItem>
                      <SelectItem
                        value="Mercedes-Benz"
                        className="text-white hover:bg-premium-700"
                      >
                        Mercedes-Benz
                      </SelectItem>
                      <SelectItem
                        value="Porsche"
                        className="text-white hover:bg-premium-700"
                      >
                        Porsche
                      </SelectItem>
                      <SelectItem
                        value="Toyota"
                        className="text-white hover:bg-premium-700"
                      >
                        Toyota
                      </SelectItem>
                      <SelectItem
                        value="Honda"
                        className="text-white hover:bg-premium-700"
                      >
                        Honda
                      </SelectItem>
                      <SelectItem
                        value="Ford"
                        className="text-white hover:bg-premium-700"
                      >
                        Ford
                      </SelectItem>
                      <SelectItem
                        value="Chevrolet"
                        className="text-white hover:bg-premium-700"
                      >
                        Chevrolet
                      </SelectItem>
                      <SelectItem
                        value="Lexus"
                        className="text-white hover:bg-premium-700"
                      >
                        Lexus
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Body Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Body Type
                  </label>
                  <Select
                    value={filters.bodyType || "all"}
                    onValueChange={(value) =>
                      handleFilterChange(
                        "bodyType",
                        value === "all" ? undefined : value,
                      )
                    }
                  >
                    <SelectTrigger className="border-premium-600 bg-premium-800/50 text-white focus:border-brand-500">
                      <SelectValue placeholder="Any Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-premium-800 border-premium-600">
                      <SelectItem
                        value="all"
                        className="text-white hover:bg-premium-700"
                      >
                        Any Type
                      </SelectItem>
                      <SelectItem
                        value="Sedan"
                        className="text-white hover:bg-premium-700"
                      >
                        Sedan
                      </SelectItem>
                      <SelectItem
                        value="SUV"
                        className="text-white hover:bg-premium-700"
                      >
                        SUV
                      </SelectItem>
                      <SelectItem
                        value="Hatchback"
                        className="text-white hover:bg-premium-700"
                      >
                        Hatchback
                      </SelectItem>
                      <SelectItem
                        value="Coupe"
                        className="text-white hover:bg-premium-700"
                      >
                        Coupe
                      </SelectItem>
                      <SelectItem
                        value="Convertible"
                        className="text-white hover:bg-premium-700"
                      >
                        Convertible
                      </SelectItem>
                      <SelectItem
                        value="Truck"
                        className="text-white hover:bg-premium-700"
                      >
                        Truck
                      </SelectItem>
                      <SelectItem
                        value="Wagon"
                        className="text-white hover:bg-premium-700"
                      >
                        Wagon
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Fuel Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Fuel Type
                  </label>
                  <Select
                    value={filters.fuelType || "all"}
                    onValueChange={(value) =>
                      handleFilterChange(
                        "fuelType",
                        value === "all" ? undefined : value,
                      )
                    }
                  >
                    <SelectTrigger className="border-premium-600 bg-premium-800/50 text-white focus:border-brand-500">
                      <SelectValue placeholder="Any Fuel" />
                    </SelectTrigger>
                    <SelectContent className="bg-premium-800 border-premium-600">
                      <SelectItem
                        value="all"
                        className="text-white hover:bg-premium-700"
                      >
                        Any Fuel
                      </SelectItem>
                      <SelectItem
                        value="Gasoline"
                        className="text-white hover:bg-premium-700"
                      >
                        Gasoline
                      </SelectItem>
                      <SelectItem
                        value="Electric"
                        className="text-white hover:bg-premium-700"
                      >
                        Electric
                      </SelectItem>
                      <SelectItem
                        value="Hybrid"
                        className="text-white hover:bg-premium-700"
                      >
                        Hybrid
                      </SelectItem>
                      <SelectItem
                        value="Diesel"
                        className="text-white hover:bg-premium-700"
                      >
                        Diesel
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Condition Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Condition
                  </label>
                  <Select
                    value={filters.condition || "all"}
                    onValueChange={(value) =>
                      handleFilterChange(
                        "condition",
                        value === "all" ? undefined : value,
                      )
                    }
                  >
                    <SelectTrigger className="border-premium-600 bg-premium-800/50 text-white focus:border-brand-500">
                      <SelectValue placeholder="Any Condition" />
                    </SelectTrigger>
                    <SelectContent className="bg-premium-800 border-premium-600">
                      <SelectItem
                        value="all"
                        className="text-white hover:bg-premium-700"
                      >
                        Any Condition
                      </SelectItem>
                      <SelectItem
                        value="New"
                        className="text-white hover:bg-premium-700"
                      >
                        New
                      </SelectItem>
                      <SelectItem
                        value="Used"
                        className="text-white hover:bg-premium-700"
                      >
                        Used
                      </SelectItem>
                      <SelectItem
                        value="Certified Pre-Owned"
                        className="text-white hover:bg-premium-700"
                      >
                        Certified Pre-Owned
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price Range */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Min Price"
                    value={filters.priceRange?.min || ""}
                    onChange={(e) =>
                      handleFilterChange("priceRange", {
                        ...filters.priceRange,
                        min: parseInt(e.target.value) || 0,
                      })
                    }
                    className="border-premium-600 bg-premium-800/50 text-white placeholder:text-gray-400 focus:border-brand-500"
                  />
                  <Input
                    type="number"
                    placeholder="Max Price"
                    value={filters.priceRange?.max || ""}
                    onChange={(e) =>
                      handleFilterChange("priceRange", {
                        ...filters.priceRange,
                        max: parseInt(e.target.value) || 999999,
                      })
                    }
                    className="border-premium-600 bg-premium-800/50 text-white placeholder:text-gray-400 focus:border-brand-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
