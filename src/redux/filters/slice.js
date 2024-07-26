import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  make: null,
  priceRange: { min: null, max: null },
  mileageRange: { min: null, max: null },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCarMake: (state, { payload }) => {
      state.make = payload;
    },
    setPriceRange: (state, { payload }) => {
      state.priceRange = payload;
    },
    setMileageRange: (state, { payload }) => {
      state.mileageRange = payload;
    },
  },
});

export const { setCarMake, setPriceRange, setMileageRange } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
