import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [], // Array to hold car ads
    favorites: [], // Array to hold favorite car IDs
    error: null, // Error message if something goes wrong
    page: 1, // Current page for pagination
  },
  reducers: {
    addFavorite: (state, action) => {
      const carId = action.payload;
      if (!state.favorites.includes(carId)) {
        state.favorites.push(carId);
      }
    },
    removeFavorite: (state, action) => {
      const carId = action.payload;
      state.favorites = state.favorites.filter((id) => id !== carId);
    },
    resetCars: (state) => {
      state.items = [];
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload];
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { addFavorite, removeFavorite, resetCars, setPage } =
  carsSlice.actions;

export const carsReducer = carsSlice.reducer;
export default carsSlice.reducer;
