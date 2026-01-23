import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterVehicle,
  toggleArrayFilter,
  setFilter,
  setFilters,
  resetFilters,
  fetchBrands,
  fetchModelsByBrand,
} from "../../../../../rtk/slices/vehicleSlice.js";
import PriceRangeSlider from "../SidebarSec/MultiRangeSlider.tsx";
import { debounce } from "lodash";
import {
  ChevronDown,
  ToggleLeft,
  ToggleRight,
  Search,
  X,
  RotateCcw,
} from "lucide-react";

// Filter Section Component
const FilterSection = ({ title, isOpen, onToggle, children }) => (
  <div className="border-b border-gray-200">
    <div
      className="flex justify-between items-center py-4 cursor-pointer"
      onClick={onToggle}
    >
      <p className="text-lg font-semibold">{title}</p>
      <ChevronDown
        className={`bg-gray-100 rounded-full p-1 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </div>
    {isOpen && <div className="pb-4">{children}</div>}
  </div>
);

// Checkbox Filter Item - Green Theme
const CheckboxItem = ({ label, checked, onChange, count, icon }) => (
  <div
    className={`flex items-center justify-between py-2.5 px-3 rounded-xl cursor-pointer transition-all duration-200 ${
      checked
        ? "bg-gray-900 text-white shadow-md"
        : "bg-gray-50 hover:bg-orange-50 border border-gray-100"
    }`}
    onClick={onChange}
  >
    <div className="flex items-center gap-3">
      <div className={`size-4 rounded border-2 flex items-center justify-center transition-colors ${
        checked ? "bg-white border-white" : "border-gray-300 bg-white"
      }`}>
        {checked && (
          <svg className="size-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      {icon && <img className="w-6 h-5 object-cover rounded" src={icon} alt="" />}
      <span className="text-sm font-medium">{label}</span>
    </div>
    {count !== undefined && (
      <span className={`text-xs ${checked ? "text-gray-100" : "text-gray-400"}`}>({count})</span>
    )}
  </div>
);

// Card Filter Item (for body type, seats, color) - Green Theme
const CardItem = ({ label, selected, onClick, icon, count }) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
      selected
        ? "bg-gray-900 text-white shadow-lg scale-105"
        : "bg-gray-50 hover:bg-orange-50 border border-gray-100"
    }`}
  >
    {icon && <img className={`w-12 h-8 object-contain mb-1 ${selected ? "brightness-0 invert" : ""}`} src={icon} alt="" />}
    <p className="text-xs font-semibold text-center">{label}</p>
    {count !== undefined && (
      <p className={`text-xs ${selected ? "text-gray-100" : "text-gray-400"}`}>({count})</p>
    )}
  </div>
);

const Sidebar = () => {
  const dispatch = useDispatch();
  const { filters, brands, modelsByBrand, vehicles, loading } = useSelector(
    (state) => state.vehicle
  );

  // Section open states
  const [sections, setSections] = useState({
    search: true,
    priceRange: true,
    fuelType: false,
    bodyType: false,
    color: false,
    transmission: false,
    owners: false,
    seats: false,
  });

  const [toggleFilter, setToggleFilter] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [expandedBrands, setExpandedBrands] = useState({});

  // Local state for range sliders (using original format)
  const [priceValues, setPriceValues] = useState([500, 4000000]);
  const [yearValues, setYearValues] = useState([2000, 2025]);
  const [kmsValues, setKmsValues] = useState([0, 500000]);

  // Ref to track if it's the initial mount
  const isInitialMount = useRef(true);
  const isRangeSliderInit = useRef(true);

  // Fetch brands on mount and initial filter
  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(filterVehicle(filters));
  }, []);

  // Debounced filter dispatch
  const debouncedFilter = useCallback(
    debounce((newFilters) => {
      dispatch(filterVehicle(newFilters));
    }, 500),
    [dispatch]
  );

  // Apply filters when they change (skip initial mount since we already called filterVehicle above)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    debouncedFilter(filters);
    return () => debouncedFilter.cancel();
  }, [filters, debouncedFilter]);

  // Apply range slider values with debounce (skip initial mount)
  useEffect(() => {
    if (isRangeSliderInit.current) {
      isRangeSliderInit.current = false;
      return;
    }
    const timer = setTimeout(() => {
      dispatch(
        setFilters({
          minPrice: priceValues[0],
          maxPrice: priceValues[1],
          minYear: yearValues[0],
          maxYear: yearValues[1],
          minKmDriven: kmsValues[0],
          maxKmDriven: kmsValues[1],
        })
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [priceValues, yearValues, kmsValues, dispatch]);

  // Handle search input with debounce
  const handleSearchChange = useCallback(
    debounce((value) => {
      dispatch(setFilter({ key: "search", value }));
    }, 500),
    [dispatch]
  );

  const toggleSection = (section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleToggleFilter = (key, value) => {
    dispatch(toggleArrayFilter({ key, value }));
  };

  const handleBrandExpand = (brand) => {
    if (!modelsByBrand[brand]) {
      dispatch(fetchModelsByBrand(brand));
    }
    setExpandedBrands((prev) => ({ ...prev, [brand]: !prev[brand] }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setSearchInput("");
    setPriceValues([500, 4000000]);
    setYearValues([2000, 2025]);
    setKmsValues([0, 500000]);
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.brand.length) count += filters.brand.length;
    if (filters.model.length) count += filters.model.length;
    if (filters.fuelType.length) count += filters.fuelType.length;
    if (filters.transmission.length) count += filters.transmission.length;
    if (filters.bodyType.length) count += filters.bodyType.length;
    if (filters.color.length) count += filters.color.length;
    if (filters.owners.length) count += filters.owners.length;
    if (filters.seat.length) count += filters.seat.length;
    return count;
  };

  // Filter Data
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG", "LPG"];
  const transmissions = ["manual", "automatic"];
  const bodyTypes = [
    { name: "suv", label: "SUV", icon: "https://media.cars24.com/india/buy/facets_v4/body_type/22072024/SUV.png" },
    { name: "sedan", label: "Sedan", icon: "https://media.cars24.com/india/buy/facets_v4/body_type/22072024/Sedan.png" },
    { name: "hatchback", label: "Hatchback", icon: "https://media.cars24.com/india/buy/facets_v4/body_type/22072024/Hatchback.png" },
  ];
  const colors = [
    { name: "Red", hex: "#EF4444" },
    { name: "Blue", hex: "#3B82F6" },
    { name: "Black", hex: "#1F2937" },
    { name: "White", hex: "#F9FAFB" },
    { name: "Silver", hex: "#9CA3AF" },
    { name: "Grey", hex: "#6B7280" },
    { name: "Green", hex: "#10B981" },
    { name: "Yellow", hex: "#F59E0B" },
    { name: "Orange", hex: "#F97316" },
    { name: "Brown", hex: "#92400E" },
  ];
  const ownerOptions = [
    { value: "1stOwner", label: "1st Owner" },
    { value: "2ndOwner", label: "2nd Owner" },
    { value: "3rdOwner", label: "3rd Owner" },
    { value: "4thOwner", label: "4th Owner" },
  ];
  const seatOptions = [4, 5, 6, 7, 8, 9];

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="lg:w-80 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20 p-5 sticky top-28">
      {/* Header */}
      <div
        className="flex items-center justify-between py-3 cursor-pointer border-b border-gray-100 mb-3"
        onClick={() => setToggleFilter((prev) => !prev)}
      >
        <div className="flex items-center gap-3">
          <p className="text-xl font-bold text-gray-800">Filters</p>
          {activeFilterCount > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full min-w-[24px] text-center">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {activeFilterCount > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleResetFilters();
              }}
              className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </button>
          )}
          <div className={`p-1 rounded-lg transition-colors ${toggleFilter ? "bg-orange-500" : "bg-gray-200"}`}>
            {toggleFilter ? (
              <ToggleRight className="size-6 text-white" />
            ) : (
              <ToggleLeft className="size-6 text-gray-500" />
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm mb-4 px-1">
        <span className="text-gray-500">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin"></span>
              Searching...
            </span>
          ) : (
            <>
              Found <span className="font-bold text-orange-500">{vehicles.length}</span> vehicles
            </>
          )}
        </span>
      </div>

      {toggleFilter && (
        <div className="space-y-2">
          {/* Search */}
          <FilterSection
            title="Search"
            isOpen={sections.search}
            onToggle={() => toggleSection("search")}
          >
            {/* Search Input - Dark Theme */}
            <div className="relative">
              <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-gray-900 focus-within:shadow-md transition-all duration-300">
                <div className="pl-4 pr-2">
                  <Search className="text-gray-400 size-5" />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    handleSearchChange(e.target.value);
                  }}
                  className="w-full py-3 pr-10 text-sm bg-transparent focus:outline-none placeholder:text-gray-400"
                  placeholder="Search brand, model, location..."
                />
                {searchInput && (
                  <button
                    onClick={() => {
                      setSearchInput("");
                      dispatch(setFilter({ key: "search", value: "" }));
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <X className="text-gray-500 hover:text-gray-900 size-4" />
                  </button>
                )}
              </div>
              {searchInput && (
                <p className="text-xs text-gray-500 mt-2 pl-1">
                  Searching for "{searchInput}"...
                </p>
              )}
            </div>

            {/* Quick Search Tags */}
            <div className="mt-4">
              <p className="text-xs text-gray-500 font-semibold mb-2">POPULAR SEARCHES</p>
              <div className="flex flex-wrap gap-2">
                {["Maruti", "Hyundai", "Honda", "Tata", "SUV", "Sedan"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchInput(tag);
                      dispatch(setFilter({ key: "search", value: tag }));
                    }}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-orange-500 hover:text-white rounded-full transition-all duration-200 border border-gray-200 hover:border-orange-500"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Selection */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 font-semibold mb-3">ALL BRANDS</p>
              <div className="max-h-60 overflow-y-auto space-y-1 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {brands.map((brand) => (
                  <div key={brand}>
                    <div className="flex items-center justify-between">
                      <CheckboxItem
                        label={brand.charAt(0).toUpperCase() + brand.slice(1)}
                        checked={filters.brand.includes(brand)}
                        onChange={() => handleToggleFilter("brand", brand)}
                      />
                      <ChevronDown
                        className={`size-5 cursor-pointer transition-transform ${
                          expandedBrands[brand] ? "rotate-180 text-orange-500" : "text-gray-400"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBrandExpand(brand);
                        }}
                      />
                    </div>
                    {expandedBrands[brand] && modelsByBrand[brand] && (
                      <div className="ml-6 mt-1 space-y-1">
                        {modelsByBrand[brand].map((model) => (
                          <CheckboxItem
                            key={model}
                            label={model}
                            checked={filters.model.includes(model)}
                            onChange={() => handleToggleFilter("model", model)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FilterSection>

          {/* Price & Range Filters - Using Original Slider */}
          <FilterSection
            title="Price & Range"
            isOpen={sections.priceRange}
            onToggle={() => toggleSection("priceRange")}
          >
            <PriceRangeSlider
              heading="Price Range"
              min={500}
              max={4000000}
              localValues={priceValues}
              measurementText={"₹"}
              setLocalValues={setPriceValues}
            />
            <PriceRangeSlider
              heading="KMs Driven"
              min={0}
              max={500000}
              localValues={kmsValues}
              measurementText={"km"}
              setLocalValues={setKmsValues}
            />
            <PriceRangeSlider
              heading="Model Year"
              min={2000}
              max={2025}
              localValues={yearValues}
              measurementText={"year"}
              setLocalValues={setYearValues}
            />
          </FilterSection>

          {/* Fuel Type */}
          <FilterSection
            title="Fuel Type"
            isOpen={sections.fuelType}
            onToggle={() => toggleSection("fuelType")}
          >
            <div className="space-y-2">
              {fuelTypes.map((fuel) => (
                <CheckboxItem
                  key={fuel}
                  label={fuel}
                  checked={filters.fuelType.includes(fuel)}
                  onChange={() => handleToggleFilter("fuelType", fuel)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Body Type */}
          <FilterSection
            title="Body Type"
            isOpen={sections.bodyType}
            onToggle={() => toggleSection("bodyType")}
          >
            <div className="grid grid-cols-3 gap-2">
              {bodyTypes.map((body) => (
                <CardItem
                  key={body.name}
                  label={body.label}
                  icon={body.icon}
                  selected={filters.bodyType.includes(body.name)}
                  onClick={() => handleToggleFilter("bodyType", body.name)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Color */}
          <FilterSection
            title="Color"
            isOpen={sections.color}
            onToggle={() => toggleSection("color")}
          >
            <div className="grid grid-cols-5 gap-3">
              {colors.map((color) => (
                <div
                  key={color.name}
                  onClick={() => handleToggleFilter("color", color.name)}
                  className={`flex flex-col items-center p-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    filters.color.includes(color.name)
                      ? "bg-gray-900 scale-110 shadow-lg"
                      : "hover:bg-orange-50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full mb-1 shadow-sm ${
                      filters.color.includes(color.name)
                        ? "ring-2 ring-white ring-offset-2 ring-offset-orange-600"
                        : "border-2 border-gray-200"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className={`text-xs font-medium ${
                    filters.color.includes(color.name) ? "text-white" : "text-gray-600"
                  }`}>{color.name}</span>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Transmission */}
          <FilterSection
            title="Transmission"
            isOpen={sections.transmission}
            onToggle={() => toggleSection("transmission")}
          >
            <div className="flex gap-3">
              {transmissions.map((trans) => (
                <button
                  key={trans}
                  onClick={() => handleToggleFilter("transmission", trans)}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                    filters.transmission.includes(trans)
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-gray-50 text-gray-700 hover:bg-orange-50 border border-gray-100"
                  }`}
                >
                  {trans.charAt(0).toUpperCase() + trans.slice(1)}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Owners */}
          <FilterSection
            title="Owners"
            isOpen={sections.owners}
            onToggle={() => toggleSection("owners")}
          >
            <div className="space-y-2">
              {ownerOptions.map((owner) => (
                <CheckboxItem
                  key={owner.value}
                  label={owner.label}
                  checked={filters.owners.includes(owner.value)}
                  onChange={() => handleToggleFilter("owners", owner.value)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Seats */}
          <FilterSection
            title="Seats"
            isOpen={sections.seats}
            onToggle={() => toggleSection("seats")}
          >
            <div className="grid grid-cols-3 gap-2">
              {seatOptions.map((seat) => (
                <button
                  key={seat}
                  onClick={() => handleToggleFilter("seat", seat)}
                  className={`py-3 rounded-xl font-semibold transition-all duration-200 ${
                    filters.seat.includes(seat)
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-gray-50 text-gray-700 hover:bg-orange-50 border border-gray-100"
                  }`}
                >
                  {seat} Seater
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Sort By */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm font-semibold mb-3">Sort By</p>
            <div className="relative">
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split("-");
                  dispatch(setFilters({ sortBy, sortOrder }));
                }}
                className="w-full py-3 px-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors font-medium text-gray-700 cursor-pointer appearance-none"
              >
                <option value="newest-desc">Newest First</option>
                <option value="oldest-asc">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Year: Newest</option>
                <option value="year-asc">Year: Oldest</option>
                <option value="km-asc">KM: Low to High</option>
                <option value="km-desc">KM: High to Low</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="size-5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
