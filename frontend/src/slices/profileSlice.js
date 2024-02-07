import {  createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading:false,
    isUpdated:false,
    error:null,
    message:null,
    success:false,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfileRequest : (state) =>  {
            state.loading = true
        },
        updateProfileSuccess : (state, {payload}) => {
            state.loading = false
            state.isUpdated = payload.user.success
        },
        updateProfileReset : (state) => {
            state.isUpdated = false
        },
        updateProfileFail : (state, {payload}) => {
            state.loading = false
            state.error = payload.message
        },
        updatePasswordRequest : (state) =>  {
            state.loading = true
        },
        updatePasswordSuccess : (state, {payload}) => {
            state.loading = false
            state.isUpdated = payload.user.success
        },
        updatePasswordReset : (state) => {
            state.isUpdated = false
        },
        updatePasswordFail : (state, {payload}) => {
            state.loading = false
            state.error = payload.message
        },
        forgotPasswordRequest : (state) =>  {
            state.loading = true
            state.error = null
        },
        forgotPasswordSuccess : (state, {payload}) => {
            state.loading = false
            state.message = payload.message
        },
        forgotPasswordReset: (state) => {
            state.message = null
            state.error = null
        },
        forgotPasswordFail : (state, {payload}) => {
            state.loading = false
            state.error = payload.message
        },
        resetPasswordRequest : (state) =>  {
            state.loading = true
            state.error = null
        },
        resetPasswordSuccess : (state, {payload}) => {
            state.loading = false
            state.success = payload.success
        },
        resetPasswordFail : (state, {payload}) => {
            state.loading = false
            state.error = payload.message
        },
        clearProfileError: (state) => {
            state.error = null
        },

    }
})

export const {
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileReset,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordReset,
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    forgotPasswordReset,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail,
    clearProfileError


}  = profileSlice.actions

// Profile Function : 
export const updateProfile =  (userData) => async(dispatch) => {
    try {
        dispatch(updateProfileRequest())
        const config = {headers : {
            "Content-Type" : "multipart/form-data"
        }, withCredentials: true,
    }
    const {data} = await axios.put(
        'http://localhost:4000/api/v1/me/update',
        userData,
        config,
    )
    dispatch(updateProfileSuccess( { user : data}))
    } catch (error) {
        dispatch(updateProfileFail({message : error.response.data.message}))
    }

}


// Update Password

export const updatePassword =  ({oldPassword, newPassword, confirmPassword}) => async(dispatch) => {
    try {
        dispatch(updatePasswordRequest())
        const config = {headers : {
            "Content-Type" : "application/json"
        }, withCredentials:true
    }
    const {data} = await axios.put(
        'http://localhost:4000/api/v1/password/update',
        {oldPassword, newPassword, confirmPassword},
        config,
    )
    dispatch(updatePasswordSuccess( { user : data}))
    } catch (error) {
        alert(error.response.data.message)
        dispatch(updatePasswordFail({message : error.response.data.message}))
    }

}


// Reset Password :
export const forgotPassword = ({email}) => async(dispatch) => {
    try{
        dispatch(forgotPasswordRequest())
        const config = {headers: {"Content-Type" : "application/json"}, 
            withCredentials:true
        }
        const {data} = await axios.post('http://localhost:4000/api/v1/password/forgot',
            {email}, 
            config
        )
        dispatch(forgotPasswordSuccess({"message" : data.message}))
    }catch(error) {
        dispatch(forgotPasswordFail({"message" : error.response.data.message}))
    }
}

export const resetPassword = ({ token, newPassword, confirmPassword }) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `http://localhost:4000/api/v1/password/reset/${token}`,
      { password: newPassword, confirmPassword },
      config
    );

    dispatch(resetPasswordSuccess({ success: data.success }));
  } catch (error) {
    dispatch(resetPasswordFail({ message: error.response.data.message }));
  }
};



export const clearError = () => async (dispatch) => {
  dispatch(clearProfileError());
};

export default profileSlice.reducer