import { createSlice } from "@reduxjs/toolkit";
import { getProduct, getProductsList, calculateProduct } from "./thunk";

const initialState = {
  productList: [],
  product: {},
  caclulation: null,
  price: {},
  isLoading: null,
  error: {},
};

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    itsLoading: (state, { payload }) => {
      state.isLoading = true;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(getProductsList.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getProductsList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getProductsList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.productList = payload.data;
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.product = payload.data;
      })
      .addCase(getProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getProduct.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(calculateProduct.pending, (state, { payload }) => {
        state.isLoading = true;
        state.caclulation = null;
      })
      .addCase(calculateProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;

        state.caclulation = null;
      })
      .addCase(calculateProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.caclulation = payload;
        state.price = payload;
      });
  },
});
export const { itsLoading } = productsSlice.actions;
export default productsSlice.reducer;
// przy każdym wejsciu na mena bedzie pobierana lista produktów
