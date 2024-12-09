import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "../styles/Login.css";
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Google Login Success Handler
  const handleGoogleLogin = async (response) => {
    const { credential } = response;
    const userInfo = jwtDecode(credential); // Decode JWT token from Google

    // Send Google user data to the backend to register or login
    const res = await fetch("http://localhost:5000/api/auth/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
      }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("authToken", data.token); // Store token in localStorage
      alert("Login successful via Google");
      window.location.href = "/dashboard"; // Redirect to dashboard
    } else {
      alert("Google Login failed");
    }
  };

  // Normal Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("authToken", data.token); // Store token in localStorage
      alert("Login successful");
      window.location.href = "/dashboard"; // Redirect to dashboard
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>

        {/* Google Login Button */}
        <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.log("Login Failed")} />
      </div>
    </div>
  );
};

export default Login;
