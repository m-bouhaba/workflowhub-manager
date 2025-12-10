import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Trash from "./Pages/Trash";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Navbar/> */}
          <Route path="/home" element={<Home />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
