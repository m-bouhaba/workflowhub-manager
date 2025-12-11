import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Trash from "./Pages/Trash";


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;