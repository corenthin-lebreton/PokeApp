import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Components/home";
import Login from "./Components/loginComponent";
import Register from "./Components/registerComponent";
import Pokedex from "./Components/pokedex";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/register");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </div>
  );
}

export default App;
