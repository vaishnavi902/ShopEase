import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
import Dashboard from "./Pages/Dashboard.js";
import Grocery from "./Pages/Grocery.js";
import Addtocart from "./Pages/Addtocart.js";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Login />} />
        <Route path="/register" element ={<Register />} />
        <Route path="/Dashboard" element ={<Dashboard />} />
        <Route path="/grocery" element ={<Grocery/>} />
        <Route path="/cart" element ={<Addtocart/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
