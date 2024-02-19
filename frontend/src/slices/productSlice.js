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

export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export default productSlice.reducer;