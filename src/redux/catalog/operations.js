// redux/operations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://667d5847297972455f64b57d.mockapi.io/v1/";

export const fetchCars = createAsyncThunk(
  "cars/fetchFiltered",
  async ({ page = 1, filters }, thunkAPI) => {
    try {
      const { make, priceRange, mileageRange } = filters;

      const params = {
        page,
        limit: 12,
        ...(make && { make }),
        ...(priceRange && {
          rentalPrice_gte: parseFloat(priceRange.min.replace("$", "")),
          rentalPrice_lte: parseFloat(priceRange.max.replace("$", "")),
        }),
        ...(mileageRange && {
          mileage_gte: mileageRange.min,
          mileage_lte: mileageRange.max,
        }),
      };

      const response = await axios.get("adverts", { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
