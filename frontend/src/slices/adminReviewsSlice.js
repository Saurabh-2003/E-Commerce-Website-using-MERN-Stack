import {createSlice} from "@reduxjs/toolkit"
import axios from 'axios'


const initialState = {
    loading : false,
    success : null,
    reviews: [],
    error:null,
}

const adminReviewsSlice = createSlice( {
    name : 'adminReviews',
    initialState,
    reducers: {
        getAllReviewsRequest: (state, {payload}) => {
            state.loading= true
        },
        getAllReviewsSuccess: (state, {payload}) => {
            state.loading = false
            state.success = true
            state.reviews = payload.reviews
        },
        getAllReviewsFail: (state, {payload}) => {
            state.loading=false
            state.success = false
            state.error = payload.error
        },
        deleteReviewRequest: (state, {payload}) => {
            state.loading= true
        },
        deleteReviewSuccess: (state, {payload}) => {
            state.loading = false
            state.success = true
        },
        deleteReviewFail: (state, {payload}) => {
            state.loading=false
            state.success = false
            state.error = payload.error
        },
        updateReviewRequest: (state, {payload}) => {
            state.loading= true
        },
        updateReviewSuccess: (state, {payload}) => {
            state.loading = false
            state.success = true
        },
        updateReviewFail: (state, {payload}) => {
            state.loading=false
            state.success = false
            state.error = payload.error
        },
        reviewsErrosClear : (state) => {
            state.error = null
        }
    }
})


// create actions :
export const {
    getAllReviewsRequest, getAllReviewsSuccess, getAllReviewsFail,
    deleteReviewRequest, deleteReviewSuccess, deleteReviewFail,
    updateReviewRequest, updateReviewSuccess, updateReviewFail,
    reviewsErrosClear,
} = adminReviewsSlice.actions;


// get All the reviews : 
export const getAllReview = (productId) => async(dispatch) => {
    try {
        dispatch(getAllReviewsRequest())
        const headers = { withCredentials : true};
        const {data} = await axios.get(`http://localhost:4000/api/v1/reviews?id=${productId}`, { headers });
        dispatch(getAllReviewsSuccess({reviews : data.reviews}))
    } catch(error) {
        dispatch(getAllReviewsFail(error.response.data.message))
    }
}

export const updateAReview = ({ productId, rating, comment }) => async(dispatch) => {
    try {
        dispatch(updateReviewRequest());
        const config = {headers : {'Content-Type' : 'application/json'}, withCredentials:true}
        await axios.put('http://localhost:4000/api/v1/review', {productId, rating, comment}, config);
        dispatch(getAllReview());
        dispatch(updateReviewSuccess());
    }catch(error) {
        dispatch(updateReviewFail(error.response.data.message))
    }
}


export const deleteReview = ({ id, productId }) => async (dispatch) => {
    try {
        dispatch(deleteReviewRequest());
        const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
        await axios.delete(`http://localhost:4000/api/v1/review?id=${id}&&productId=${productId}`, config); // Use & instead of ?
        dispatch(getAllReview(productId));
        dispatch(deleteReviewSuccess());
    } catch (error) {
        dispatch(deleteReviewFail(error.response.data.message));
    }
};

export const clearReviewsErrors = () => (dispatch) => {
    dispatch(reviewsErrosClear())
}

export default adminReviewsSlice.reducer