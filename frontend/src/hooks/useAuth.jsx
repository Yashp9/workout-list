
import { useSelector,useDispatch } from "react-redux";
import { login,logout } from "../features/userSlice";

export const useAuth = () =>{
    const dispatch = useDispatch();

    //access the state using a selector.
    const user = useSelector((state)=>state.auth.user);

    //create wrapper function to trigger actions.
    const handleLogin = (userData)=>{
        dispatch(login(userData));
    };

    const handleLogout = () =>{
        dispatch(logout());
    };
    
    return {user,handleLogin,handleLogout};
}
