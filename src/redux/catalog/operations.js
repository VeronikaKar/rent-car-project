import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://667d5847297972455f64b57d.mockapi.io/v1/",
});

// Fetch all reference catalog data
export const fetchReferenceCatalog = createAsyncThunk(
  "cars/fetchReferenceCatalog",
  async (_, thunkApi) => {
    try {
      const { data } = await baseUrl.get("adverts/");
      return data;
    } catch (error) {
      console.error(
        "Error fetching reference catalog:",
        error.response ? error.response.data : error.message
      );
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Fetch initial catalog data with pagination
export const fetchInitialCatalog = createAsyncThunk(
  "cars/fetchInitialCatalog",
  async (_, thunkApi) => {
    try {
      const { data } = await baseUrl.get("adverts/", {
        params: {
          page: 1,
          limit: 12,
        },
      });
      return data;
    } catch (error) {
      console.error(
        "Error fetching initial catalog:",
        error.response ? error.response.data : error.message
      );
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Fetch more autos for pagination
export const fetchMoreCars = createAsyncThunk(
  "cars/fetchMoreCars",
  async (page, thunkApi) => {
    try {
      const { data } = await baseUrl.get("adverts/", {
        params: {
          page,
          limit: 12,
        },
      });
      return data;
    } catch (error) {
      console.error(
        "Error fetching more cars:",
        error.response ? error.response.data : error.message
      );
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Fetch a specific auto by its ID
export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkApi) => {
    try {
      const { data } = await baseUrl.get(`adverts/${id}`);
      return data;
    } catch (error) {
      console.error(
        `Error fetching car with ID ${id}:`,
        error.response ? error.response.data : error.message
      );
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Fetch autos based on query parameters
export const fetchCarsByQuery = createAsyncThunk(
  "cars/fetchCarsByQuery",
  async (params, thunkApi) => {
    try {
      const { data } = await baseUrl.get("adverts/", {
        params: {
          make: params.make,
          rentalPrice: params.rentalPrice,
        },
      });

      if (params.from || params.to) {
        const filteredData = data.filter(
          (car) => car.mileage <= params.to && car.mileage >= params.from
        );
        return filteredData;
      }

      if (params.rentalPrice) {
        return data.filter(
          (car) => +car.rentalPrice.slice(1) <= +params.rentalPrice
        );
      }

      return data;
    } catch (error) {
      console.error(
        "Error fetching cars by query:",
        error.response ? error.response.data : error.message
      );
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
