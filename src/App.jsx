import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Trash from "./Pages/Trash";

function App() {
  const [username, setUsername] = useState("");

  
  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) {
      setUsername(stored);
    }
  }, []);

  return (
    <BrowserRouter>
      <Main username={username} setUsername={setUsername} />
    </BrowserRouter>
  );
}

function Main({ username, setUsername }) {
  const location = useLocation();
  const showNavbar = location.pathname !== "/"; 

  return (
    <>
      {showNavbar && <Navbar username={username} />}
      <Routes>
        <Route path="/" element={<Login setUsername={setUsername} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </>
  );
}

export default App;
