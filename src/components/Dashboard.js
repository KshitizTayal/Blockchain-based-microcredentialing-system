import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Welcome to Your Dashboard</h2>
      <p>Here, you can manage your credentials.</p>
      <div className="dashboard-buttons">
        <button onClick={() => navigate("/credential-form")}>Issue Credential</button>
        <button onClick={() => navigate("/retrieve-credential")}>Retrieve Credential</button>
      </div>
    </div>
  );
};

export default Dashboard;
