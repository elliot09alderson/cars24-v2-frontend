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
const customerSlice = createSlice({
  name: "customer",
  initialState: {
    requirements: [],
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
      .addCase(postRequirement.fulfilled, (state, { payload }) => {
        state.requirements = [...state.requirements, payload.data];
        // state.successMessage = payload.message;
        state.loading = false;
      })
      .addCase(postRequirement.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(postRequirement.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loading = false;
      });
  },
});
export default customerSlice.reducer;

export const { clearMessage } = customerSlice.actions;
