import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchCars } from "./operations";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    favorites: [],
    error: null,
    loading: false,
    page: 1,
    filters: {
      make: "",
      minPrice: "",
      maxPrice: "",
      minMileage: "",
      maxMileage: "",
    },
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
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
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

export const { addFavorite, removeFavorite, resetCars, setPage, setFilters } =
  carsSlice.actions;

export const carsReducer = carsSlice.reducer;


export const selectFilteredCars = createSelector(
  (state) => state.cars.items,
  (state) => state.cars.filters,
  (items, filters) => {
    const { make, minPrice, maxPrice, minMileage, maxMileage } = filters;

    return items.filter((car) => {
      const matchesMake = !make || car.make === make;
      const matchesMinPrice = !minPrice || car.rentalPrice >= minPrice;
      const matchesMaxPrice = !maxPrice || car.rentalPrice <= maxPrice;
      const matchesMinMileage = !minMileage || car.mileage >= minMileage;
      const matchesMaxMileage = !maxMileage || car.mileage <= maxMileage;

      return (
        matchesMake &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinMileage &&
        matchesMaxMileage
      );
    });
  }
);

export const selectCarsPage = (state) => state.cars.page;

export default carsSlice.reducer;
