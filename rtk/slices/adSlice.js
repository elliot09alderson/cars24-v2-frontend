import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api.js";

export const fetchAds = createAsyncThunk(
  "vehiclesads/fetch_ads",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/ads");
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);
export const postad = createAsyncThunk(
  "vehiclesads/post_ad",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/ad", values);
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);
const adSlice = createSlice({
  name: "ad",
  initialState: {
    activeSidebar: 0,
    ads: [],
    loading: false,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    clearMessage: (state) => {
      (state.errorMessage = ""), (state.successMessage = "");
    },
    seActiveSidebar: (state, { payload }) => {
      state.activeSidebar = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.fulfilled, (state, { payload }) => {
        state.ads = payload.data;
        // state.successMessage = payload.message;
        state.loading = false;
      })
      .addCase(fetchAds.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(fetchAds.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loading = false;
      })
      .addCase(postad.fulfilled, (state, { payload }) => {
        state.ads = [...state.ads, payload.data];
        state.successMessage = payload.message;
        state.loading = false;
      })
      .addCase(postad.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(postad.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loading = false;
      });
  },
});
export default adSlice.reducer;

export const { clearMessage, seActiveSidebar } = adSlice.actions;
