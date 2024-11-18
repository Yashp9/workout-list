import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createWorkouts } from '../features/workoutSlice';


const WorkoutForm = () => {
    const [title,setTitle] = useState('');
    const [load,setLoad] = useState('');
    const [reps,setReps] = useState('');
    const [error,setError] = useState(null); 
    const dispatch = useDispatch();
    const handler = async (e)=>{
        e.preventDefault();
        const workout = {title , load , reps};
        try {
            const response = await axios.post("http://localhost:4000/api/workout",workout,{
                headers:{
                    "Content-Type":'application/json',
                },
            });
            setError(null);
            setTitle('');
            setLoad('');
            setReps('');
            console.log("New work out added",response.data);
            dispatch(createWorkouts(response.data));
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
            console.log('Error adding workout ',error);
        }
    }
  return (
    <form className='create' onSubmit={handler}>
        <h3 style={{color:'#1aac83'}} >Adda a new Workout</h3>
        <label>Exercise Title : </label>
        <input type='text'
        onChange={(e)=>setTitle(e.target.value)}
        /><br/>
        <label>Load (in kg) : </label>
        <input type='number'
        onChange={(e)=>setLoad(e.target.value)}
        /><br/>
        <label>Reps : </label>
        <input type='number'
        onChange={(e)=>setReps(e.target.value)}
        /><br/>
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
    </form >
  )
}

export default WorkoutForm