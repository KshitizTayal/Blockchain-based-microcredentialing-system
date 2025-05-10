import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Dashboard";
import CredentialForm from "./components/CredentialForm";
import RetrieveCredential from "./components/RetrieveCredential";
import Benefits from "./pages/Benefits"; // New Benefits page
// main react page
function App() {
  return (
    <GoogleOAuthProvider clientId="556900109492-mf9v67pd8j8jmb7cs0vk9v34uiutt24m.apps.googleusercontent.com">
      <Router>
        <Navbar />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/credential-form" element={<CredentialForm />} />
            <Route path="/retrieve-credential" element={<RetrieveCredential />} />
            <Route path="/benefits" element={<Benefits />} /> {/* Benefits page */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
