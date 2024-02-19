import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    loading:false,
    success:false,
    error:null,
}

const reviewSlice = createSlice({
    name:'reviewSubmit',
    initialState,
    reducers: {
        newReviewRequest: (state) => {
            state.loading = true
        },
        newReviewSuccess: (state , {payload}) => {
            state.loading = false
            state.success = payload
        },
        newReviewFail: (state, {payload}) => {
            state.error = payload
        },
        newReviewReset: (state) => {
            state.success = false
        },
        clearReviewErrors: (state) => {
            state.error = null
        }
    }
})

export const {newReviewRequest, newReviewSuccess, newReviewFail, newReviewReset, clearReviewErrors} = reviewSlice.actions

export const newReview = ({rating, comment, productId}) => async(dispatch) => {
    try{
        dispatch(newReviewRequest());
        const config = {headers: {"Content-Type" : "application/json"}, withCredentials:true};

        const {data} = await axios.put("http://localhost:4000/api/v1/review", {rating, comment, productId}, config);
        
        dispatch(newReviewSuccess(data.success));
   
    }catch(error){
        dispatch(newReviewFail(error.response.data.message));
    }
}

export default reviewSlice.reducer
