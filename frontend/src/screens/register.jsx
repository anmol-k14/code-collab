import { useState,useContext } from "react";
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "../config/axios.js";
import { UserContext } from "../context/user.context.jsx";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setUser}= useContext(UserContext)

  const navigate = useNavigate()

  function submitHandler(e) {

      e.preventDefault()

      axios.post('/users/register', {
          email,
          password
      }).then((res) => {
          console.log(res.data)
          localStorage.setItem('token',res.data.token)
          setUser(res.data.user)
          navigate('/home')
      }).catch((err) => {
          console.log(err.response.data)
      })
  }



  return (
    <div className="wrapper">
      <div className="left">
        <img
          src="./public/Group.png"
          alt=""
          style={{ width: "80%" }}
          draggable={false}
        />
      </div>
      <div className="right">
        <form className="form" onSubmit={submitHandler}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <h1 style={{  fontSize: "50px", marginBottom: "1%" }}>CollabCode</h1>
            <h2
              style={{
                marginBottom: "25px",
                fontSize: "15px",
                color: "#a8a7ae",
              }}
            >
              Realtime collaboration
            </h2>
            <p>Create an account</p>
            <input
              id="inp"
              type="text"
              placeholder="Email"
              onChange={(e)=>setEmail(e.target.value)}
              style={{
                marginBottom: "5%",
                marginTop: "1%",
                height: "5vh",
                backgroundColor: "#1f2a37",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
              }}
            />
            <input
              id="inp"
              type="password"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
              style={{
                marginBottom: "5%",
                height: "5vh",
                backgroundColor: "#1f2a37",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
              }}
            />
            <span>
              Already have an account.
              <Link to="/" style={{ color: "#6e54b5" }}>
                Login
              </Link>
            </span>
            <button type="submit" className="btn joinbtn">Create account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
