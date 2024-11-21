import {useState} from 'react'
import { useLogin } from '../hooks/useLogin';

const Loginpage = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const { login, isLoading, error } = useLogin()

    const handleClick = async (e)=>{
        e.preventDefault();
        await login(email,password);
    }
    

  return (
    <form className='login' onSubmit={handleClick}>
        <h3>Log in</h3>

        <label>Email address : 
        <input type='email' onChange={(e)=>setEmail(e.target.value)} /></label>

        <label>password : 
        <input type='password' onChange={(e)=>setPassword(e.target.value)} /></label>

        <button disabled={isLoading}>Log in</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Loginpage