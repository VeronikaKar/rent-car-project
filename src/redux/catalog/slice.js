// carsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCarById,
  fetchCarsByQuery,
  fetchReferenceCatalog,
  fetchInitialCatalog,
  fetchMoreCars,
} from "./operations";

const initialState = {
  catalog: [],
  refCatalog: [],
  catalogCount: 0,
  favorites: [],
  car: null,
  value: "",
  isLimit: false,
  isLoading: false,
  isError: null,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    increaseCatalogCount: (state, { payload }) => {
      state.catalogCount += payload;
    },
    saveValue: (state, { payload }) => {
      state.value = payload;
    },
    addToFavorites: (state, { payload }) => {
      const carToAdd = state.catalog.find((car) => car.id === payload);
      if (carToAdd && !state.favorites.some((car) => car.id === payload)) {
        state.favorites.push(carToAdd);
      }
    },
    removeFromFavorites: (state, { payload }) => {
      state.favorites = state.favorites.filter((car) => car.id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReferenceCatalog.fulfilled, (state, { payload }) => {
        state.refCatalog = payload;
        state.isError = null;
      })
      .addCase(fetchInitialCatalog.fulfilled, (state, { payload }) => {
        state.isLimit = false;
        state.isLoading = false;
        state.catalog = payload;
        state.isError = null;
      })
      .addCase(fetchInitialCatalog.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchInitialCatalog.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = error.message;
      })
      .addCase(fetchMoreCars.fulfilled, (state, { payload }) => {
        if (
          payload.length === 0 ||
          state.catalogCount === state.refCatalog.length
        ) {
          state.isLimit = true;
        }
        state.catalog = [...state.catalog, ...payload];
        state.isError = null;
      })
      .addCase(fetchMoreCars.rejected, (state, { error }) => {
        state.isError = error.message;
      })
      .addCase(fetchCarById.fulfilled, (state, { payload }) => {
        state.car = payload;
        state.isError = null;
      })
      .addCase(fetchCarById.rejected, (state, { error }) => {
        state.isError = error.message;
      })
      .addCase(fetchCarsByQuery.fulfilled, (state, { payload }) => {
        state.isLimit = payload.length < 12;
        state.catalog = payload;
        state.isError = null;
      })
      .addCase(fetchCarsByQuery.rejected, (state, { error }) => {
        state.isError = error.message;
      });
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  saveValue,
  increaseCatalogCount,
} = carsSlice.actions;

export const carsReducer = carsSlice.reducer;
