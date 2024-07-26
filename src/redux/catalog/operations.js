// redux/operations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://667d5847297972455f64b57d.mockapi.io/v1/",
});

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async ({ page, filters }, thunkAPI) => {
    try {
      const response = await baseUrl.get("adverts", {
        params: {
          page: page,
          limit: 12,
          ...filters,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
