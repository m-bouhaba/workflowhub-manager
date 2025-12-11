import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TasksColumn from "./Components/TasksColumn";
// import Navbar from "./Components/Navbar";
// import Home from "./Pages/Home";
// import Trash from "./Pages/Trash";
// import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
