import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkoutDetails from "../componants/WorkoutDetails";
import WorkoutForm from "../componants/WorkoutForm";
import { useDispatch, useSelector } from "react-redux";
import { setWorkouts } from "../features/workoutSlice";


const Homepage = () => {
  const workouts = useSelector((state) => state.workouts.workouts);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/workout");
        // Set the workouts state with the data directly
        dispatch(setWorkouts(response.data));
      } catch (error) {
        console.error("There was an error fetching the workout data:", error);
      }
    };
    fetchWorkout();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workout">
        {workouts.length === 0 ? (
          <div className="workout-details">
            <h3 style={{ color: "#1aac83" }}>add a workout &nbsp; <span className="material-symbols-outlined">exercise</span></h3>
          </div>
        ) : (
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        )}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Homepage;
