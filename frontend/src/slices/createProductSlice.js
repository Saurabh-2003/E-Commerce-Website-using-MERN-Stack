import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    loading:false,
    success:false,
    error:null,
    product: {}
}

const createProductSlice = createSlice({
        name:"createProduct",
        initialState,
        reducers:{
            adminCreateProductRequest : (state) =>{
                state.loading = true
            },
            adminCreateProductSuccess: (state, {payload}) => {
                state.loading = false
                state.success = payload.data.success
                state.product = payload.data.product
            },
            adminCreateProductFail:(state, {payload}) => {
                state.success = false
                state.error = payload.error
            },
            adminCreateProductReset:(state) => {
                state.error = null
                state.success = false
            }
        }
})

export const {adminCreateProductRequest, adminCreateProductSuccess, adminCreateProductFail, adminCreateProductReset} = createProductSlice.actions

export const CreateAProduct = (productData) => async(dispatch) => {
    try{
        dispatch(adminCreateProductRequest())
        const config = {headers:{'Content-Type': "application/json"},withCredentials : true}
        const {data} = await axios.post('http://localhost:4000/api/v1/admin/product/new', config)
        dispatch(adminCreateProductSuccess(data))
    }catch(error){
        dispatch(adminCreateProductFail(error.response.data.message))
    }
}

export default createProductSlice.reducer