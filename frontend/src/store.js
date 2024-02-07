// store.js
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import { loadUser } from "./slices/userSlice.js";
import userSlice from "./slices/userSlice.js";
import profileSlice from './slices/profileSlice.js'
import cartSlice from "./slices/cartSlice.js";
import orderSlice from "./slices/orderSlice.js";
import myOrderSlice from "./slices/myOrderSlice.js";
import reviewSlice from "./slices/reviewSlice.js";
import adminProductsSlice from "./slices/adminProductsSlice.js"
import createProductSlice from "./slices/createProductSlice.js"
const store = configureStore({
  reducer: {
    products: productSlice,
    user: userSlice,
    profile:profileSlice,
    cart: cartSlice,
    order:orderSlice,
    myorders : myOrderSlice,
    newReview:reviewSlice,
    adminProducts:adminProductsSlice,
    createProduct:createProductSlice
  },
});

// Load user on store initialization
store.dispatch(loadUser());

export default store;
