import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    order: null,
    error: null,
    orders: [],
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        createOrderRequest: (state) => {
            state.loading = true;
        },
        createOrderSuccess: (state, { payload }) => {
            state.loading = false;
            state.order = payload.data;
            state.error = null;
        },
        createOrderFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },
        allOrderRequest: (state) => {
            state.loading = true;
        },
        allOrderSuccess: (state, { payload }) => {
            state.loading = false;
            state.orders = payload.data;
            state.error = null;
        },
        allOrderFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },
        updateOrderRequest: (state) => {
            state.loading = true;
        },
        updateOrderSuccess: (state, { payload }) => {
            state.loading = false;
            state.success = payload.success;
            state.error = null;
        },
        updateOrderFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },
        deleteOrderRequest: (state) => {
            state.loading = true;
        },
        deleteOrderSuccess: (state, { payload }) => {
            state.loading = false;
            state.success = payload.success;
            state.error = null;
        },
        deleteOrderFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },
        getOrderDetailsRequest: (state) => {
            state.loading = true;
        },
        getOrderDetailsSuccess: (state, { payload }) => {
            state.loading = false;
            state.order = payload.order;
            state.error = null;
        },
        getOrderDetailsFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderFail,
    allOrderRequest,
    allOrderSuccess,
    allOrderFail,
    updateOrderRequest,
    updateOrderSuccess,
    updateOrderFail,
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    getOrderDetailsRequest,
    getOrderDetailsSuccess,
    getOrderDetailsFail,
    clearErrors,
} = orderSlice.actions;

// Async action creators
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(createOrderRequest());
        const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
        const { data } = await axios.post('http://localhost:4000/api/v1/order/new', order, config);
        dispatch(createOrderSuccess({ data }));
    } catch (error) {
        dispatch(createOrderFail({ error: error.response.data.message }));
    }
};

export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch(allOrderRequest());
        const { data } = await axios.get('http://localhost:4000/api/v1/admin/orders', {
            withCredentials:true
        });
        dispatch(allOrderSuccess({ data }));
    } catch (error) {
        dispatch(allOrderFail({ error: error.response.data.message }));
    }
};

export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest());
        const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
        const { data } = await axios.put(`http://localhost:4000/api/v1/admin/order/${id}`, order, config);
        dispatch(updateOrderSuccess({ success: data.success }));
    } catch (error) {
        dispatch(updateOrderFail({ error: error.response.data.message }));
    }
};

export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch(deleteOrderRequest());
        const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/order/${id}`);
        dispatch(deleteOrderSuccess({ success: data.success }));
    } catch (error) {
        dispatch(deleteOrderFail({ error: error.response.data.message }));
    }
};

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch(getOrderDetailsRequest());
        const { data } = await axios.get(`http://localhost:4000/api/v1/order/${id}`);
        dispatch(getOrderDetailsSuccess({ order: data.order }));
    } catch (error) {
        dispatch(getOrderDetailsFail({ error: error.response.data.message }));
    }
};

// Clear errors
export const clearError = () => async (dispatch) => {
    dispatch(clearErrors());
};

export default orderSlice.reducer;
