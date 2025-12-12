import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Trash from "./Pages/Trash";
import Footer from "./Components/Footer";

function App() {
  const [username, setUsername] = useState("");
  // 1. Lifted State: This holds the count for the entire app
  const [trashCount, setTrashCount] = useState(0);

  const API_URL = "http://localhost:5000";

  // 2. Global function to refresh the count
  const fetchTrashCount = async () => {
    try {
      const res = await fetch(`${API_URL}/trash`);
      const data = await res.json();
      setTrashCount(data.length);
    } catch (error) {
      console.error("Error fetching trash count:", error);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) {
      setUsername(stored);
    }
    // 3. Fetch count when App loads
    fetchTrashCount();
  }, []);

  return (
    <BrowserRouter>
      <Main 
        username={username} 
        setUsername={setUsername} 
        trashCount={trashCount}
        refreshTrash={fetchTrashCount} 
      />
    </BrowserRouter>
  );
}

function Main({ username, setUsername, trashCount, refreshTrash }) {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for redirection
  const showNavbar = location.pathname !== "/"; 

  // --- LOGOUT FUNCTION ---
  const handleLogout = () => {
    localStorage.removeItem("username"); // Clear storage
    setUsername(""); // Clear state
    navigate("/"); // Redirect to login
  };

  return (
    <>
      {/* Pass trashCount AND onLogout to Navbar */}
      {showNavbar && (
        <Navbar 
          username={username} 
          trashCount={trashCount} 
          onLogout={handleLogout} 
        />
      )}
      
      <Routes>
        <Route path="/" element={<Login setUsername={setUsername} />} />
        
        {/* Pass refresh function to Home */}
        <Route path="/home" element={<Home onTrashUpdate={refreshTrash} />} />
        
        {/* Pass refresh function to Trash */}
        <Route path="/trash" element={<Trash onTrashUpdate={refreshTrash} />} />
      </Routes>
    </>
  );
}

export default App;