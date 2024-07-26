import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    favorites: [],
    error: null,
    loading: false,
    page: 1,
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
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload];
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { addFavorite, removeFavorite, resetCars, setPage } =
  carsSlice.actions;

export const carsReducer = carsSlice.reducer;
export default carsSlice.reducer;
