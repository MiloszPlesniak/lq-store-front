import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProductsList = createAsyncThunk(
  "product/getProductsList",
  async () => {
    try {
      const productsList = await axios.get(
        "http://localhost:3100/api/products/"
      ); //zapytanie o listę produktów
      return productsList;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const getProduct = createAsyncThunk("product/getProduct", async (id) => {
  try {
    const url = "http://localhost:3100/api/products/" + id;
    const product = await axios.get(url); // zapytanie o konkretny produkt

    return product;
  } catch (error) {
    throw error;
  }
});

export const calculateProduct = createAsyncThunk(
  "product/calculateProduct",
  async (product) => {
    try {
      const data = await axios.post(
        "http://localhost:3100/api/products/calculate",
        product
      );
      
      const response = data.data.message;

      return response;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (obj, thunkApi) => {
    try {
      const data = await axios.patch(
        "http://localhost:3100/api/products/" + obj.id,
        obj.product
      );
      

      return data.data;
    } catch (error) {
      console.log(error);

      thunkApi.rejectWithValue(error);
      throw error;
    }
  }
);
