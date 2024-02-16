import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: true,
    success: null,
    error: null,
    users: [],
    message:null
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
        deleteSelectedUserSuccess: (state, payload) => {
            state.loading = false;
            state.success = true;
            state.success = payload.success;
            state.message = payload.message;
        },
        deleteSelectedUserFail: (state, { payload }) => {
            state.loading = false;
            state.success = false;
            state.error = payload;
        },
        updateSelectedUserRequest: (state) => {
            state.loading = true;
        },
        updateSelectedUserSuccess: (state, {payload}) => {
            state.loading = false;
            state.success = payload.success;
            state.error = null; 
        },
        updateSelectedUserFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        },
        clearAdminUserErrors: (state) => {
            state.success = null;
            state.error = null;
            state.message = null;
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

export const updateUserRole = ({id, name, email, role}) => async( dispatch) =>  {
    try {
        dispatch(updateSelectedUserRequest());
        const config = {
            headers: { 'Content-Type': "application/json" },
            withCredentials: true
        };
        const {data} = await axios.put(`http://localhost:4000/api/v1/admin/user/${id}`, {email, name, role}, config);
        dispatch(updateSelectedUserSuccess({success:data.success}));
        dispatch(getAllUsersDetails());
    }catch(error) {
        dispatch(updateSelectedUserFail(error.response.data.message))
    }
}

export const deleteUser = ({id}) => async(dispatch) => {
    try {
        dispatch(deleteSelectedUserRequest());
        const config = {
            headers: { 'Content-Type': "application/json" },
            withCredentials: true
        };
        const {data} = await axios.delete(`http://localhost:4000/api/v1/admin/user/${id}`, config)

        dispatch(deleteSelectedUserSuccess({success : data.success, message:data.message}));
        dispatch(getAllUsersDetails());
    }catch(error) {
        dispatch(deleteSelectedUserFail(error.response.data.message))
    }
}

export const clearUsersErros = ()=> (dispatch) => {
    dispatch(clearAdminUserErrors())
}
export default adminUsersSlice.reducer;
