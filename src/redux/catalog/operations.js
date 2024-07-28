import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://667d5847297972455f64b57d.mockapi.io/v1/",
});

const handleApiError = (error, thunkApi) => {
  let errorMessage;
  if (error.response) {
    if (error.response.data) {
      errorMessage = error.response.data;
    } else {
      errorMessage = `Error: ${error.response.status} ${error.response.statusText}`;
    }
  } else {
    errorMessage = error.message;
  }
  console.error("API Error:", errorMessage);
  return thunkApi.rejectWithValue(errorMessage);
};

export const fetchReferenceCatalog = createAsyncThunk(
  "cars/fetchReferenceCatalog",
  async (_, thunkApi) => {
    try {
      const response = await baseUrl.get("adverts/");
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkApi);
    }
  }
);

export const fetchInitialCatalog = createAsyncThunk(
  "cars/fetchInitialCatalog",
  async (_, thunkApi) => {
    try {
      const response = await baseUrl.get("adverts/", {
        params: {
          page: 1,
          limit: 12,
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkApi);
    }
  }
);

export const fetchMoreCars = createAsyncThunk(
  "cars/fetchMoreCars",
  async (page, thunkApi) => {
    try {
      const response = await baseUrl.get("adverts/", {
        params: {
          page,
          limit: 12,
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkApi);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkApi) => {
    try {
      const response = await baseUrl.get(`adverts/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error, thunkApi);
    }
  }
);

export const fetchCarsByQuery = createAsyncThunk(
  "cars/fetchCarsByQuery",
  async (params, thunkApi) => {
    try {
      const response = await baseUrl.get("adverts/", {
        params: {
          make: params.make,
          rentalPrice: params.rentalPrice,
        },
      });

      let data = response.data;

      if (params.from || params.to) {
        data = data.filter(
          (car) => car.mileage <= params.to && car.mileage >= params.from
        );
      }

      if (params.rentalPrice) {
        data = data.filter(
          (car) => +car.rentalPrice.slice(1) <= +params.rentalPrice
        );
      }

      return data;
    } catch (error) {
      return handleApiError(error, thunkApi);
    }
  }
);
