import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Navbar from "./componants/Navbar.jsx";


const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
