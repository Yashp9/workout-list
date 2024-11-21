import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signuppage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handleClick = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };
 

  return (
    <form className="signup" onSubmit={handleClick}>
      <h3>Sign up</h3>

      <label>
        Email address :
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label>
        password :
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signuppage;
