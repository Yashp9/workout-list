import { createSlice } from "@reduxjs/toolkit";

//create a slice for authentication.
const authSlice = createSlice({
    name:'auth',
    initialState:{user:null},
    reducers:{
        login:(state,action)=>{
            //set the user data when logging in.
            state.user = action.payload;
        },
        logout:(state)=>{
            //clear user data when logging out.
            state.user = null;
        }
    }
});

//Export the actions for use in components.
export const { login,logout } = authSlice.actions;

//Export the reducer for state configuration.
export default authSlice.reducer;