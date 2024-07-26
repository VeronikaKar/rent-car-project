import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations";

const initialState = {
  items: [],
  loading: false,
  error: null,
  favorites: [],
  filters: {},
};

const slice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addFavorite(state, { payload }) {
      if (
        !Array.isArray(payload) &&
        !state.favorites.some((item) => item.id === payload.id)
      ) {
        state.favorites.push(payload);
      }
    },
    deleteFavorite(state, { payload }) {
      state.favorites = state.favorites.filter((item) => item.id !== payload);
    },
    setFilters(state, { payload }) {
      state.filters = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (Array.isArray(payload)) {
          state.items = [...state.items, ...payload];
        } else {
          state.items.push(payload);
        }
      })
      .addCase(fetchCars.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { addFavorite, deleteFavorite, setFilters } = slice.actions;
export const carsReducer = slice.reducer;
