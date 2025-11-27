import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api.js";

// Initial filter state
const initialFilters = {
  search: "",
  brand: [],
  model: [],
  color: [],
  fuelType: [],
  transmission: [],
  bodyType: [],
  owners: [],
  seat: [],
  minPrice: 0,
  maxPrice: 10000000,
  minYear: 2000,
  maxYear: new Date().getFullYear(),
  minKmDriven: 0,
  maxKmDriven: 500000,
  assured: false,
  sortBy: "newest",
  sortOrder: "desc",
};

export const fetchVehicles = createAsyncThunk(
  "vehicles/fetch_vehicles",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/vehicles");
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

export const addVehicle = createAsyncThunk(
  "vehicles/add_vehicle",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/agent/vehicle", values);
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

export const filterVehicle = createAsyncThunk(
  "vehicles/filter_vehicle",
  async (filters, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Build query string from filters
      const params = new URLSearchParams();

      if (filters.search) params.append("search", filters.search);
      if (filters.brand?.length)
        params.append("brand", filters.brand.join(","));
      if (filters.model?.length)
        params.append("model", filters.model.join(","));
      if (filters.color?.length)
        params.append("color", filters.color.join(","));
      if (filters.fuelType?.length)
        params.append("fuelType", filters.fuelType.join(","));
      if (filters.transmission?.length)
        params.append("transmission", filters.transmission.join(","));
      if (filters.bodyType?.length)
        params.append("bodyType", filters.bodyType.join(","));
      if (filters.owners?.length)
        params.append("owners", filters.owners.join(","));
      if (filters.seat?.length) params.append("seat", filters.seat.join(","));
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.minYear) params.append("minYear", filters.minYear);
      if (filters.maxYear) params.append("maxYear", filters.maxYear);
      if (filters.minKmDriven) params.append("minKmDriven", filters.minKmDriven);
      if (filters.maxKmDriven) params.append("maxKmDriven", filters.maxKmDriven);
      if (filters.assured) params.append("assured", filters.assured);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

      const { data } = await api.get(`/vehicles/filter-data?${params.toString()}`);
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

export const searchVehicle = createAsyncThunk(
  "vehicles/search_vehicle",
  async (searchValue, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/vehicles/search/${searchValue}`);
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

export const fetchVehicleDetail = createAsyncThunk(
  "vehicles/fetch_vehicle_detail",
  async (slug, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/vehicles/detail/${slug}`);
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

export const fetchBrands = createAsyncThunk(
  "vehicles/fetch_brands",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/vehicles/brands");
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

export const fetchModelsByBrand = createAsyncThunk(
  "vehicles/fetch_models_by_brand",
  async (brand, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/vehicles/filter/${brand}`);
      return fulfillWithValue({ brand, models: data.data });
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

export const deleteVehicle = createAsyncThunk(
  "vehicles/deleteVehicle",
  async (slug, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/vehicles/${slug}`);
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    vehicleDetails: {},
    vehicles: [],
    brands: [],
    modelsByBrand: {},
    loading: false,
    errorMessage: "",
    successMessage: "",
    filters: initialFilters,
    pagination: {
      total: 0,
      page: 1,
      limit: 50,
      totalPages: 0,
    },
  },
  reducers: {
    clearMessage: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    // Update a single filter
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    // Update multiple filters at once
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    // Toggle array filter (add/remove from array)
    toggleArrayFilter: (state, action) => {
      const { key, value } = action.payload;
      const currentArray = state.filters[key] || [];
      const index = currentArray.indexOf(value);
      if (index === -1) {
        state.filters[key] = [...currentArray, value];
      } else {
        state.filters[key] = currentArray.filter((item) => item !== value);
      }
    },
    // Reset all filters
    resetFilters: (state) => {
      state.filters = initialFilters;
    },
    // Reset specific filter
    resetFilter: (state, action) => {
      const key = action.payload;
      state.filters[key] = initialFilters[key];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.fulfilled, (state, { payload }) => {
        state.vehicles = payload.data;
        state.successMessage = payload.message;
        state.loading = false;
      })
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVehicles.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || payload?.message;
        state.loading = false;
      })
      .addCase(fetchVehicleDetail.fulfilled, (state, { payload }) => {
        state.vehicleDetails = payload.data;
        state.successMessage = payload.message;
        state.loading = false;
      })
      .addCase(fetchVehicleDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVehicleDetail.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || payload?.message;
        state.loading = false;
      })
      .addCase(searchVehicle.fulfilled, (state, { payload }) => {
        state.vehicles = payload.data;
        state.successMessage = payload.message;
        state.loading = false;
      })
      .addCase(searchVehicle.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchVehicle.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || payload?.message;
        state.loading = false;
      })
      .addCase(addVehicle.fulfilled, (state, { payload }) => {
        state.vehicles = [...state.vehicles, payload.data];
        state.successMessage = payload.message;
        state.loading = false;
      })
      .addCase(addVehicle.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVehicle.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || payload?.message;
        state.loading = false;
      })
      .addCase(deleteVehicle.fulfilled, (state, { payload }) => {
        state.vehicles = state.vehicles.filter(
          (item) => item.slug !== payload.data?.slug
        );
        state.successMessage = payload.message;
        state.loading = false;
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVehicle.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || payload?.message;
        state.loading = false;
      })
      .addCase(filterVehicle.fulfilled, (state, { payload }) => {
        state.vehicles = payload.data;
        state.successMessage = payload.message;
        state.loading = false;
        if (payload.pagination) {
          state.pagination = payload.pagination;
        }
      })
      .addCase(filterVehicle.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterVehicle.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || payload?.message;
        state.loading = false;
      })
      .addCase(fetchBrands.fulfilled, (state, { payload }) => {
        state.brands = payload.data;
      })
      .addCase(fetchModelsByBrand.fulfilled, (state, { payload }) => {
        state.modelsByBrand[payload.brand] = payload.models;
      });
  },
});

export default vehicleSlice.reducer;

export const {
  clearMessage,
  setFilter,
  setFilters,
  toggleArrayFilter,
  resetFilters,
  resetFilter,
} = vehicleSlice.actions;
