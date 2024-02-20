import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  isUpdated:false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    getUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = payload.user;
    },
    getUserFailure: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = payload.message;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    registerUserRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    registerUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = payload.user;
    },
    registerUserFail: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = payload.message;
    },
    loadUserRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loadUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = payload.user;
    },
    loadUserFail: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = payload.message;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
  },
});

export const {
  getUser,
  getUserSuccess,
  getUserFailure,
  clearErrors,
  registerUserRequest,
  registerUserSuccess,
  registerUserFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail
} = userSlice.actions;

export const userSelector = (state) => state.user;

// Signin Code:
export const fetchUser = (loginEmail, loginPassword) => async (dispatch) => {
  try {
    dispatch(getUser());
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
    const url = "http://localhost:4000/api/v1/login";
    const response = await axios.post(url, { email: loginEmail, password: loginPassword }, config);
    const data = response.data;

    dispatch(getUserSuccess({ user: data }));
    dispatch(clearErrors()); // Clear errors on successful login
  } catch (error) {
    dispatch(getUserFailure({ message: error.response.data.message }));
  }
};

// Signup Code:
export const signup = (name, email, password) => async (dispatch) => {
  try {
    dispatch(registerUserRequest());
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.post("http://localhost:4000/api/v1/register", { name, email, password }, config);

    dispatch(registerUserSuccess({ user: data }));
  } catch (error) {
    dispatch(registerUserFail({ message: error.response.data.message }));
  }
};

// Loading User if already logged in:
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const url = "http://localhost:4000/api/v1/me";
    const response = await axios.get(url, { withCredentials: true });

    const data = response.data;

    dispatch(loadUserSuccess({ user: data }));
    dispatch(clearErrors()); // Clear errors on successful login
  } catch (error) {
    dispatch(loadUserFail({ message: error.response.data.message }));
  }
};

// Logout Code:
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get("http://localhost:4000/api/v1/logout", { withCredentials: true });
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail({ message: error.response.data.message }));
  }
};

// Clearing error:
export const clearError = () => async (dispatch) => {
  dispatch(clearErrors());
};





export default userSlice.reducer;
