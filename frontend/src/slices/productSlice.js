import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    loading:false,
    hasErrors:false,
    total:undefined,
    count:undefined,
    filterCount:undefined,
    products:[],
};

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        getProducts:(state) => {
            state.loading = true
        },
        getProductsSuccess: (state, {payload}) => {
            state.products = payload.products
            state.count = payload.resultPerPage
            state.total = payload.productsCount
            state.filterCount = payload.filterCount
            state.loading=false
            state.hasErrors = false
        },
        getProductsFailure:(state) => {
            state.loading = false
            state.hasErrors = true
        }
    }
})

export const {getProducts, getProductsSuccess, getProductsFailure} = productSlice.actions;
export const productsSelecter = (state) => state.products

export function fetchProducts(keyword="", currentPage=1){
    return async(dispatch) => {
        dispatch(getProducts());
        try{
            const url = `http://localhost:4000/api/v1/products/?keyword=${keyword}&page=${currentPage}`
            const response = await axios.get(url)
            const data = response.data

            dispatch(getProductsSuccess(data))
        }catch(error){
            dispatch(getProductsFailure(error.message))
        }
    }
}

export default productSlice.reducer;