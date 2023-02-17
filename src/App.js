import React from "react";
import { Route, Routes,BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Signin />}/>

        <Route path="/signup" element={  <Signup />}/>
        
        <Route path="/home" element={<Home />}/>
            
      </Routes>
    </BrowserRouter>
  );
}

export default App;
