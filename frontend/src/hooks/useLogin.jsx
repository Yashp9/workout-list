import { useState } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user, handleLogin } = useAuth();

  //this email and password will be passed by the signuppage using signup function.
  const login = async (email, password) => {
    const data = { email: email, password: password };
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //save the user to local storage.
      localStorage.setItem("user", JSON.stringify(response.data));

      //update the useAuth
      await handleLogin(response.data);

      //update loading state
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // Check if the error is from Axios response
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };
  return { login, isLoading, error };
};
