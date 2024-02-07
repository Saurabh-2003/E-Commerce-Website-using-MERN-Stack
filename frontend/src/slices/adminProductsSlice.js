import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    products : [],
    loading:false,
    success: false,
    error:null
}
const adminProductsSlice  = createSlice({
    name:'adminProducts',
    initialState,
    reducers : {
        getAdminAllProductsRequest : (state, {paylaod})=>{
            state.loading = true
        },
        getAdminAllProductsSuccess : (state, {payload}) => {
            state.success = payload.data.success
            state.products = payload.data.products
        },
        getAdminAllProductsFail: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },
        getAdminAllProductsReset : (state, {payload}) => {
            state.success = false
        }
    }
})

export const {getAdminAllProductsRequest, getAdminAllProductsSuccess, getAdminAllProductsFail, getAdminAllProductsReset} = adminProductsSlice.actions


// Get All the Products :

export const getProductsForAdmin = () => async(dispatch) => {
    try{
        dispatch(getAdminAllProductsRequest());
        const config = {withCredentials:true}
        const data = await axios.get('http://localhost:4000/api/v1/admin/products', config);
        dispatch(getAdminAllProductsSuccess(data));
    }catch(error){
        dispatch(getAdminAllProductsFail(error.response.data.message))
    }
}

export default adminProductsSlice.reducer