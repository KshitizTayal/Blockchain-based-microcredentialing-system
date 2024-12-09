import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import "../styles/Navbar.css"; // Ensure you have some CSS for better styling

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token in localStorage:", token);
    if (token) {
      setIsLoggedIn(true);
      const decoded = jwtDecode(token); // Decode JWT to extract user details
      setUserName(decoded.name); // Set user name after decoding the token
      console.log("Decoded user info:", decoded);
    }
  }, []);

  const handleLogout = () => {
    googleLogout(); // This will log the user out from Google
    localStorage.removeItem("authToken"); // Remove JWT token
    setIsLoggedIn(false);
    setDropdownVisible(false); // Hide dropdown after logging out
    navigate("/"); // Redirect to the home page
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="logo" onClick={() => navigate("/")}>
          BlockCertify
        </span>
      </div>

      {/* Benefits button placed between Dashboard and Profile */}
      <div className="navbar-middle">
        <button onClick={() => navigate("/benefits")}>Benefits</button>
      </div>

      <div className="navbar-right">
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            <div className="profile" onClick={toggleDropdown}>
              <span className="profile-icon">{userName || "Profile"}</span>
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Sign Out</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};


export default Navbar;
