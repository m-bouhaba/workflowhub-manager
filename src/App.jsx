import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
      {/* 4. Pass the count and the refresh function to Main */}
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
  const showNavbar = location.pathname !== "/"; 

  return (
    <>
      {/* 5. Pass count to Navbar */}
      {showNavbar && <Navbar username={username} trashCount={trashCount} />}
      <Routes>
        <Route path="/" element={<Login setUsername={setUsername} />} />
        
        {/* 6. Pass refresh function to Home (so it updates when you delete) */}
        <Route path="/home" element={<Home onTrashUpdate={refreshTrash} />} />
        
        {/* Optional: Pass to Trash if you want count to update on restore/delete permanently */}
        <Route path="/trash" element={<Trash onTrashUpdate={refreshTrash} />} />
      </Routes>
    </>
  );
}

export default App;