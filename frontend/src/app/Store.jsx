import { configureStore } from '@reduxjs/toolkit';

import workoutsReducer from '../features/workoutSlice'; // Example slice

import authReducer from '../features/userSlice';

const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
    auth: authReducer,
  }
});

export default store;
