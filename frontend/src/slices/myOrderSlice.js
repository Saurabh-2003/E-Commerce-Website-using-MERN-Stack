import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    loading:false,
    error:null,
    orders:[]
}

export const myOrderSlice= createSlice( {
    name : "myorders",
    initialState,
    reducers: {
        myOrdersRequest : (state, {payload}) => {
            state.loading = true
        },
        myOrdersSuccess: (state, { payload }) => {
            state.loading = false;
            state.orders = payload ? payload.orders : [];
          },          
        myOrdersFail : (state, {payload}) => {
            state.loading = false
            state.error = payload.error
        },
        clearOrderError : (state) => {
            state.error = null
        }
    }
})

export const {
    myOrdersRequest, 
    myOrdersSuccess,
    myOrdersFail,
    clearOrderError
}
= myOrderSlice.actions


export const getAllMyOrders = () => async(dispatch) => {
    try{    
        dispatch(myOrdersRequest())
        const config = { headers : {"Content-Type" : "application/json"}, withCredentials:true}

        const {data} = await axios.get('http://localhost:4000/api/v1/orders/me', config)
        dispatch(myOrdersSuccess({"orders" : data.orders}))

    }catch(error){
        dispatch(myOrdersFail({"error" :error.response.data.message}))
    }
}

export const clearMyOrdersError = () => (dispatch) => {
    dispatch(clearOrderError())
}


export default myOrderSlice.reducer