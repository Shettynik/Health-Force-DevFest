import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    userType: null,
    doctor: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveUser: (state, action) => {
            state.email = action.payload.email;
            state.userType = action.payload.userType;
        },
        setUserLogout: (state, action) => {
            state.email = null;
            state.doctor = null;
        },
        setDoctor: (state, action) => {
            state.doctor = action.payload.doctor;
        }
    }
});

export const {setActiveUser, setUserLogout, setDoctor} = userSlice.actions;

export const selectActiveUser = (state) => state.user;
export const selectedDoctor = (state) => state.doctor;


export default userSlice.reducer;