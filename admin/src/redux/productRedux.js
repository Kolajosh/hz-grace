import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE A PRODUCT
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteProductFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE A PRODUCT
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        (state.products[
          state.products.findIndex((item) => item._id === action.payload.id)
        ] = action.payload.product)
      );
    },
    updateProductFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //ADD A PRODUCT
    addProductStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      addProductSuccess: (state, action) => {
        state.isFetching = false;
        state.products.push(action.payload)
      },
      addProductFailed: (state) => {
        state.isFetching = false;
        state.error = true;
      },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailed,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailed,
  updateProductStart,
  updateProductSuccess,
  updateProductFailed,
  addProductStart,
  addProductSuccess,
  addProductFailed,
} = productSlice.actions;

export default productSlice.reducer;
