import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";  // Updated styling

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is already logged in, redirect to dashboard
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Micro-Credentialing System</h1>
        <p>Please login or register to continue.</p>
        
        <div className="analytics-boxes">
          {/* Box for Transparency */}
          <div className="analytics-box">
            <h3>Transparency</h3>
            <p>Our platform ensures full transparency in credentialing processes, where each credential can be traced back to its source and verified on the blockchain.</p>
          </div>
          
          {/* Box for Interoperability */}
          <div className="analytics-box">
            <h3>Interoperability</h3>
            <p>The system is designed to easily integrate with other platforms, enabling seamless sharing and verification of credentials across various institutions.</p>
          </div>

          {/* Box for Security */}
          <div className="analytics-box">
            <h3>Security</h3>
            <p>With blockchain technology at its core, our system guarantees that credentials are tamper-proof, secure, and accessible only by authorized parties.</p>
          </div>

          {/* Box for Efficiency */}
          <div className="analytics-box">
            <h3>Efficiency</h3>
            <p>Our solution reduces manual effort, speeds up the credentialing process, and provides immediate verification for educational and professional achievements.</p>
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 Micro-Credentialing System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
