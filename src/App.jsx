import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Trash from "./Pages/Trash";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Navbar/> */}
          <Route path="/home" element={<Home />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;