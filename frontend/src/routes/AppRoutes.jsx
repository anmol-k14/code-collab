import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../screens/login.jsx";
import Home from "../screens/home.jsx";
import Register from "../screens/register.jsx";
import Project from "../screens/project.jsx";
import Homedev from "../pages/Homedev.jsx"
// import UserAuth from "../auth/UserAuth.jsx";

function AppRoutes() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/home" element={<Home/> }></Route>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/project" element={ <Project/>}></Route> */}

            <Route path="/" element={<Homedev/>} ></Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
  
  export default AppRoutes;