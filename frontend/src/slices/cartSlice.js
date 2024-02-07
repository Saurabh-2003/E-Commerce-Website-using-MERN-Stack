import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    cartItems : localStorage.getItem('cartItems') ? 
                JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingInfo: localStorage.getItem('shippingInfo') ? 
                    JSON.parse(localStorage.getItem('shippingInfo')) : {},
}
export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers :  {
        addToCart: (state, {payload}) => {
            const item = payload.item;
            const itemExist = state.cartItems.find(
                (i) => i.product === item.product
            );

            if(itemExist){
                state.cartItems = state.cartItems.map((i) => 
                i.product === itemExist.product ? item: i
                )
            }else{
                state.cartItems= [...state.cartItems, item]
            }

        },

        removeCartItem : (state, {payload}) => {
            state.cartItems  = state.cartItems.filter((i) => 
            i.product !== payload.id
            )
        },

        saveShippingInfo: (state, {payload}) => {
            state.shippingInfo = payload.data
        },

    }
})

export const {
    addToCart,
    removeCartItem,
    saveShippingInfo,
} = cartSlice.actions


// Add Items to the Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
    dispatch(
        addToCart({
            item: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity,
            },
        })
    );

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove Items from the Cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
    dispatch(removeCartItem({ id: data.product._id }));
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save the Shipping Info
export const saveTheShippingInfo = (data) => async (dispatch) => {
    dispatch(saveShippingInfo({ data }));
    localStorage.setItem("shippingInfo", JSON.stringify(data));
};

  
export default cartSlice.reducer