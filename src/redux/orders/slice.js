import { createSlice } from "@reduxjs/toolkit";
import { addOrder, getOrdersList } from "./thunk";
const initialState = {
  shopingCartList: [],
  orders: [],
  error: null,
  isLoading: false,
  
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      state.shopingCartList.push(payload);
    },
    deleteFromCart: (state, { payload }) => {
      const arr = state.shopingCartList;
      arr.splice(payload, 1);
      state.shopingCartList = arr;
    },
    clearCart: (state) => {
      state.shopingCartList = [];
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(addOrder.pending, (state) => {
      state.isLoading = true;
    }).addCase(addOrder.fulfilled, (state) => {
    state.isLoading = false;
    state.error = null;
  }).addCase(addOrder.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
  }).addCase(getOrdersList.pending, (state) => {
    state.isLoading = true;
  }).addCase(getOrdersList.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.orders = payload;
    state.error = null;
  }).addCase(getOrdersList.rejected, (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
  });
  },})
export const { addToCart, deleteFromCart, clearCart } = ordersSlice.actions;
export default ordersSlice.reducer;
