import { useAuth } from "./useAuth"
import { setWorkouts } from "../features/workoutSlice";
import { useDispatch } from "react-redux";

export const useLogout = () => {
    const dispatch = useDispatch();
   const {handleLogout} = useAuth();  
  
  const logout = ()=>{
    //remove the use form local storage.
    localStorage.removeItem('user');
    
    //dispatch the setworkout function to clear workouts.
    dispatch(setWorkouts(null));
    //dispatch the logout function.
    handleLogout();
  }
  return {logout}
}

