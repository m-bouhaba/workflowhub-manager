import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Trash from "./Pages/Trash";
import Footer from "./Components/Footer";


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
        <Footer/>
        
      </BrowserRouter>

  );
}

  export default App;



























//  import { useState } from "react";
//   import "./App.css";
//  import { BrowserRouter, Routes, Route } from "react-router-dom";
//   import Home from "./Pages/Home";
//   import Trash from "./Pages/Trash";
//  import Login from "./Pages/Login";
//  import Navbar from "./Components/Navbar";
//  import Footer from "./Components/Footer";


//   function App() {
  
//     return (
//       <>
//         <BrowserRouter>
//         <Navbar/> 
//          <Routes>
//            <Route path="/" element={<Login />} />
//            <Route path="/home" element={<Home />} />
//           <Route path="/trash" element={<Trash />} />
//         </Routes>
        
//          <Footer/> 
//       </BrowserRouter>
//      </>
//    );
//  }

//  export default App;
