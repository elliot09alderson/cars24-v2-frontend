import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api.js";

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
  async (
    {
      brand,
      model,
      color,
      minPrice,
      maxPrice,
      minKmDriven,
      maxKmDriven,

      fuelType,
      owners,
      serialNo,
      transmission,
      seater,
      minYear,
      maxYear,
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/vehicles/filter-data?brand=${brand}&model=${model}&color=${color}&minPrice=${minPrice}&maxPrice=${maxPrice}&minKmDriven=${minKmDriven}&maxKmDriven=${maxKmDriven}&minYear=${minYear}&maxYear=${maxYear}&fuelType=${fuelType}&owners=${owners}&serialNo=${serialNo}&transmission=${transmission}&seater=${seater}`
      );
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
    loading: false,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    clearMessage: (state) => {
      (state.errorMessage = ""), (state.successMessage = "");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.fulfilled, (state, { payload }) => {
        state.vehicles = payload.data;
        state.successMessage = payload.message;
        state.loading = false;
      })
      .addCase(fetchVehicles.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(fetchVehicles.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loading = false;
      })
      .addCase(fetchVehicleDetail.fulfilled, (state, { payload }) => {
        state.vehicleDetails = payload.data;
        state.successMessage = payload.message;
        state.loading = false;
      })
      .addCase(fetchVehicleDetail.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(fetchVehicleDetail.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loading = false;
      })
      .addCase(searchVehicle.fulfilled, (state, { payload }) => {
        state.vehicles = payload.data;
        state.successMessage = payload.message;
        state.loading = false;
      })
      .addCase(searchVehicle.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(searchVehicle.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loading = false;
      })
      .addCase(addVehicle.fulfilled, (state, { payload }) => {
        state.vehicles = [...state.vehicles, payload.data];
        state.successMessage = payload.message;
        state.loading = false;
      })
      .addCase(addVehicle.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addVehicle.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loading = false;
      })
      .addCase(deleteVehicle.fulfilled, (state, { payload }) => {
        state.vehicles = state.vehicles.filter(
          (item) => item.slug != state.data
        );
        state.successMessage = payload.message;
        state.loading = false;
      })
      .addCase(deleteVehicle.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteVehicle.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loading = false;
      })
      .addCase(filterVehicle.fulfilled, (state, { payload }) => {
        state.vehicles = payload.data;
        state.successMessage = payload.message;
        state.loading = false;
      })
      .addCase(filterVehicle.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(filterVehicle.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loading = false;
      });
  },
});
export default vehicleSlice.reducer;

export const { clearMessage } = vehicleSlice.actions;
