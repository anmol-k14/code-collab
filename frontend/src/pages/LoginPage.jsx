import { useState, useContext } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios.js";
import { UserContext } from "../context/user.context.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to store error message

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();

    axios
      .post("/users/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);

        navigate("/project"); // Redirect to projects page after successful login
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response?.data?.errors || "Invalid email or password"); // Set error message
      });
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
            <h1 style={{ fontSize: "50px", marginBottom: "1%" }}>CollabCode</h1>
            <h2
              style={{
                marginBottom: "25px",
                fontSize: "15px",
                color: "#a8a7ae",
              }}
            >
              Realtime collaboration
            </h2>
            <p>Login</p>
            <input
              id="inp"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              style={{
                marginBottom: "5%",
                height: "5vh",
                backgroundColor: "#1f2a37",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
              }}
            />
            {/* Display error message */}
            {error && (
              <p style={{ color: "red", marginBottom: "5%" }}>{error}</p>
            )}
            <span>
              Don't have an account?
              <Link to="/register" style={{ color: "#C84F19" }}>
                Register
              </Link>
            </span>
            <button type="submit" className="btn joinbtn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;