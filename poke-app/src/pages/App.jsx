import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./home";
import Login from "../components/loginComponent";
import Register from "../components/registerComponent";
import Pokedex from "./pokedex";
import Pokebattle from "./pokebattle";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/register");
    }

    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    ) {
      if (localStorage.getItem("token")) {
        navigate("/home");
      }
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
        <Route path="/pokebattle" element={<Pokebattle />} />
      </Routes>
    </div>
  );
}

export default App;
