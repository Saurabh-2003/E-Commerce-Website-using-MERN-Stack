import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: true,
    success: null,
    error: null,
    users: [],
};

const adminUsersSlice = createSlice({
    name: 'adminUsers',
    initialState,
    reducers: {
        getAllUsersRequest: (state) => {
            state.loading = true; // Fix typo here
        },
        getAllUsersSuccess: (state, { payload }) => {
            state.users = payload.users;
            state.loading = false;
            state.success = true;
            state.error = null; // Clear error on success
        },
        getAllUsersFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload; // No need for error.response.data.message here
            state.success = false;
        },
        deleteSelectedUserRequest: (state) => {
            state.loading = true;
        },
        deleteSelectedUserSuccess: (state) => {
            state.loading = false;
            state.success = true;
            state.error = null; // Clear error on success
        },
        deleteSelectedUserFail: (state, { payload }) => {
            state.loading = false;
            state.success = false;
            state.error = payload;
        },
        updateSelectedUserRequest: (state) => {
            state.loading = true;
        },
        updateSelectedUserSuccess: (state) => {
            state.loading = false;
            state.success = true;
            state.error = null; // Clear error on success
        },
        updateSelectedUserFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        },
        clearAdminUserErrors: (state) => {
            state.success = null;
            state.error = null;
        }
    }
});

export const {
    getAllUsersRequest,
    getAllUsersSuccess,
    getAllUsersFail,
    deleteSelectedUserRequest,
    deleteSelectedUserSuccess,
    deleteSelectedUserFail,
    updateSelectedUserRequest,
    updateSelectedUserSuccess,
    updateSelectedUserFail,
    clearAdminUserErrors, // Fix export name here
} = adminUsersSlice.actions;

// Async action creator
export const getAllUsersDetails = () => async (dispatch) => {
    try {
        dispatch(getAllUsersRequest());

        const config = {
            headers: { 'Content-Type': "application/json" },
            withCredentials: true
        };

        const { data } = await axios.get('http://localhost:4000/api/v1/admin/users', config);
        dispatch(getAllUsersSuccess({ users: data.users }));
    } catch (error) {
        dispatch(getAllUsersFail(error.response ? error.response.data.message : "Unknown error"));
    }
};

export default adminUsersSlice.reducer;
