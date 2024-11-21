import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Navbar from "./componants/Navbar.jsx";
import Loginpage from "./pages/Loginpage.jsx";
import Signuppage from "./pages/Signuppage.jsx";
import { useAuth } from "./hooks/useAuth.jsx";

const App = () => {
  const { handleLogin,user } = useAuth();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      handleLogin(user);
    }
  }, []);
  useEffect(()=>{
    console.log('current user :- ',user)
  },[user])
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Homepage />:<Navigate to='/login' />}></Route>
            <Route path="/login" element={!user ? <Loginpage /> : <Navigate to='/' />}></Route>
            <Route path="/signup" element={!user ? <Signuppage />:<Navigate to='/' />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
