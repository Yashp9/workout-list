import { createSlice } from "@reduxjs/toolkit";

const workoutsSlice = createSlice({
    name:'workouts',
    initialState:{workouts:[]},
    reducers:{
        setWorkouts:(state,action)=>{
            state.workouts = action.payload;
        },
        createWorkouts:(state,action)=>{
            state.workouts = [action.payload,...state.workouts]
        },
        deleteWorkouts:(state,action)=>{
            state.workouts = state.workouts.filter((work)=>work._id !== action.payload._id)
        }
    }
});

//export actions.
export const {setWorkouts,createWorkouts,deleteWorkouts} = workoutsSlice.actions;

//export reducer
export default workoutsSlice.reducer;