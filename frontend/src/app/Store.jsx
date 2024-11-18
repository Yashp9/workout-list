import { configureStore } from '@reduxjs/toolkit';
import workoutsReducer from '../features/workoutSlice'; // Example slice

const store = configureStore({
  reducer: {
    workouts: workoutsReducer
  }
});

export default store;
