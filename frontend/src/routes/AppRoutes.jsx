import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "../screens/login.jsx";
// import Home from "../screens/home.jsx";
// import Register from "../screens/register.jsx";
// import Project from "../screens/project.jsx";
import Homedev from "../pages/Homedev.jsx"
import NotFound from "../pages/notFound.jsx";
import Login from "../pages/LoginPage.jsx";
import Register from "../pages/ResgisterPage.jsx";
import Project from "../pages/ProjectsPage.jsx";
import MyProject from "../pages/MyProjectPage.jsx";
import About from "../pages/AboutPage.jsx";
import Contact from "../pages/ContactPage.jsx";
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
            <Route path="/notfound" element={<NotFound/>} ></Route>
            <Route path="/login" element={<Login/>} ></Route>
            <Route path="/register" element={<Register/>} ></Route>
            <Route path="/project" element={<Project/>} ></Route>
            <Route path="/myproject" element={<MyProject/>} ></Route>
            <Route path="/about" element={<About/>} ></Route>
            <Route path="/contact" element={<Contact/>} ></Route>
           
          </Routes>
        </BrowserRouter>
      </>
    );
  }
  
  export default AppRoutes;