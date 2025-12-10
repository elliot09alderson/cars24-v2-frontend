import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api.js";

export const postRequirement = createAsyncThunk(
  "post/requirement",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/requirement", values);
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

// Get customer profile
export const getCustomerProfile = createAsyncThunk(
  "customer/getProfile",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/customer/profile");
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

// Update customer profile
export const updateCustomerProfile = createAsyncThunk(
  "customer/updateProfile",
  async (formData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put("/customer/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

// Get wishlist
export const getWishlist = createAsyncThunk(
  "customer/getWishlist",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/customer/wishlist");
      return fulfillWithValue(data);
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

// Add to wishlist
export const addToWishlist = createAsyncThunk(
  "customer/addToWishlist",
  async (vehicleId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/wishlist", { vehicleId });
      return fulfillWithValue({ ...data, vehicleId });
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

// Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  "customer/removeFromWishlist",
  async (vehicleId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/customer/wishlist/${vehicleId}`);
      return fulfillWithValue({ ...data, vehicleId });
    } catch (error) {
      const errorData = error.response?.data || {
        message: "Something went wrong",
      };
      return rejectWithValue(errorData);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    requirements: [],
    profile: null,
    wishlist: [],
    loading: false,
    profileLoading: false,
    wishlistLoading: false,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    clearMessage: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // Post requirement
      .addCase(postRequirement.fulfilled, (state, { payload }) => {
        state.requirements = [...state.requirements, payload.data];
        state.loading = false;
      })
      .addCase(postRequirement.pending, (state) => {
        state.loading = true;
      })
      .addCase(postRequirement.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || payload?.error;
        state.loading = false;
      })

      // Get profile
      .addCase(getCustomerProfile.fulfilled, (state, { payload }) => {
        state.profile = payload.customer;
        state.wishlist = payload.customer?.wishlist || [];
        state.profileLoading = false;
      })
      .addCase(getCustomerProfile.pending, (state) => {
        state.profileLoading = true;
      })
      .addCase(getCustomerProfile.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || payload?.error;
        state.profileLoading = false;
      })

      // Update profile
      .addCase(updateCustomerProfile.fulfilled, (state, { payload }) => {
        state.profile = payload.customer;
        state.successMessage = payload.message;
        state.profileLoading = false;
      })
      .addCase(updateCustomerProfile.pending, (state) => {
        state.profileLoading = true;
      })
      .addCase(updateCustomerProfile.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || payload?.error;
        state.profileLoading = false;
      })

      // Get wishlist
      .addCase(getWishlist.fulfilled, (state, { payload }) => {
        state.wishlist = payload.wishlist;
        state.wishlistLoading = false;
      })
      .addCase(getWishlist.pending, (state) => {
        state.wishlistLoading = true;
      })
      .addCase(getWishlist.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || payload?.error;
        state.wishlistLoading = false;
      })

      // Add to wishlist
      .addCase(addToWishlist.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.wishlistLoading = false;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.wishlistLoading = true;
      })
      .addCase(addToWishlist.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || payload?.error;
        state.wishlistLoading = false;
      })

      // Remove from wishlist
      .addCase(removeFromWishlist.fulfilled, (state, { payload }) => {
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== payload.vehicleId
        );
        state.successMessage = payload.message;
        state.wishlistLoading = false;
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.wishlistLoading = true;
      })
      .addCase(removeFromWishlist.rejected, (state, { payload }) => {
        state.errorMessage = payload?.message || payload?.error;
        state.wishlistLoading = false;
      });
  },
});

export default customerSlice.reducer;
export const { clearMessage } = customerSlice.actions;
