import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TasksColumn from "./Components/TasksColumn";
// import Navbar from "./Components/Navbar";
// import Home from "./Pages/Home";
// import Trash from "./Pages/Trash";
// import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";


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