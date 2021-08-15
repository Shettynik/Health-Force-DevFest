import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    successAlert: null,
    errorAlert: null
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setErrorAlert: (state, action) => {
            console.log(action.payload.errorAlert)
            state.errorAlert = action.payload.errorAlert
        },
        setSuccessAlert: (state, action) => {
            console.log("message",action.payload)
            state.successAlert = action.payload.successAlert
        },
        removeAlertMessage: (state, action) => {
            state.errorAlert = null
            state.successAlert = null
        }
    }
});

export const {setErrorAlert,setSuccessAlert, removeAlertMessage} = alertSlice.actions;

export const getSucessAlert = (state) => state.alert.successAlert;
export const getErrorAlert = (state) => state.alert.errorAlert;

export default alertSlice.reducer