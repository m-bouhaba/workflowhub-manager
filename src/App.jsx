import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Navbar/> */}
          <Route path="/home" element={<Home />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
    </Router>
  );
}

export default App;