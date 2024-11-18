import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteWorkouts } from "../features/workoutSlice";
import {formatDistanceToNow} from 'date-fns';

const WorkoutDetails = ({ workout }) => {
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/workout/${workout._id}`
      );
      dispatch(deleteWorkouts(response.data));
    } catch (error) {
      console.error("error in delete workout :- ", error);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg):</strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps :</strong>
        {workout.reps}
      </p>
      <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix: true})}</p>
      <span className="symbol material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
