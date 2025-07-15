import { configureStore } from "@reduxjs/toolkit";
import vehicleSlice from "../slices/vehicleSlice.js";
import adSlice from "../slices/adSlice.js";
import authSlice from "../slices/authSlice.js";
import customerSlice from "../slices/customerSlice.js";
import agentSlice from "../slices/agentSlice.js";
export const store = configureStore({
  reducer: {
    vehicle: vehicleSlice,
    ad: adSlice,
    auth: authSlice,
    customer: customerSlice,
    agent: agentSlice,
  },
});
