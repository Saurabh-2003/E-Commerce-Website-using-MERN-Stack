import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    products : [],
    loading:false,
    success: false,
    error:null,
    message:null, 
}
const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {
      getAdminAllProductsRequest: state => {
        state.loading = true;
      },
      getAdminAllProductsSuccess: (state, { payload }) => {
        state.loading = false;
        state.success = payload.data.success;
        state.products = payload.data.products;
        state.message = payload.data.message;
      },      
      getAdminAllProductsFail: (state, { payload }) => {
        state.loading = false;
        state.error = payload.toString();
      },
      getAdminAllProductsReset: state => {
        state.success = false;
      },
      deleteProductRequest: state => {
        state.loading = true;
      },
      deleteProductSuccess: (state, { payload }) => {
        state.loading = false;
        state.success = payload.data.success;
        state.message = payload.data.message;
        state.products = state.products.filter(product => product._id !== payload.id);
      },
      deleteProductFail: (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload.toString(); // Ensure payload is a string
      },
      updateProductRequest : (state, payload) => {
        state.loading = true;
      },
      updateProductSuccess : (state, payload) => {
        state.message = payload.data.message
        state.success = payload.data.success
      },
      updateProductFail : (state, payload) => {
        state.error = payload
        state.success = false
      },
      clearAdminProductErrors: state => {
        state.loading = false;
        state.success = null;
        state.error = null;
        state.message = null;
        state.product = null;
      },
    },
  });
  

export const {getAdminAllProductsRequest, getAdminAllProductsSuccess, getAdminAllProductsFail, getAdminAllProductsReset,
    deleteProductRequest, deleteProductSuccess, deleteProductFail,
    updateProductRequest, updateProductSuccess, updateProductFail,
     clearAdminProductErrors
} = adminProductsSlice.actions


// Get All the Products :

export const getProductsForAdmin = () => async(dispatch) => {
    try{
        dispatch(getAdminAllProductsRequest());
        const config = {headers : {'Content-Type' : 'application/json' },withCredentials:true}
        const data = await axios.get('http://localhost:4000/api/v1/admin/products', config);
        dispatch(getAdminAllProductsSuccess(data));
    }catch(error){
        dispatch(getAdminAllProductsFail(error.response.data.message))
    }
}

//delete a product  :

export const deleteProduct = (id) => async(dispatch) => {
    try{
        dispatch(deleteProductRequest());
        const config = {withCredentials:true};
        const data = await axios.delete(`http://localhost:4000/api/v1/admin/product/${id}`, config);
        dispatch(deleteProductSuccess({data, id}));
    }catch(error){
        dispatch(deleteProductFail(error.response.data.message))
    }
}


// update a Product : 
export const updateProduct = ({id, productData}) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());

    const config = {
      headers: { 'Content-Type': 'multipart/form-data'},
      withCredentials : true
    };

    const { data } = await axios.put(
      `http://localhost:4000/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch(updateProductSuccess(data ));
  } catch (error) {
    dispatch(updateProductFail(error.response.data.message));
  }
};


export const clearProductsErrorAdmin = () => async(dispatch) => {
    dispatch(clearAdminProductErrors());
}

export default adminProductsSlice.reducer