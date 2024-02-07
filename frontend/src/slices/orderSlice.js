import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    loading :false,
    order : null,
    error:null
}
const orderSlice = createSlice( {
    name:'order',
    initialState,
    reducers :{
        createOrderRequest : (state) => {
            state.loading = true
        },
        createOrderSuccess : (state, {payload}) => {
            state.loading = false
            state.order = payload.data
        },
        createOrderFail : (state, {payload}) => {
            state.loading = true,
            state.error = payload.error
        },
        clearErrors : (state) => {
            state.error = null
        }
    }
})

export const  {createOrderRequest, createOrderSuccess, createOrderFail, clearErrors} = orderSlice.actions

//create an order :
export const createOrder  = (order) => async(dispatch) => {
    try{
        dispatch(createOrderRequest())
        const config = { headers : {"Content-Type" : "application/json"}, withCredentials:true}
        const {data} = await axios.post("http://localhost:4000/api/v1/order/new", order, config)
        dispatch(createOrderSuccess({ data}))
    }catch(error){
        dispatch(clearErrors({"error":error.response.data.message}))
    }
}

//clear errors : 
export const clearError = () => async (dispatch) => {
    dispatch(clearErrors());
  };

export default orderSlice.reducer