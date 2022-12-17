import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./home";
import Login from "../components/loginComponent";
import Register from "../components/registerComponent";
import Pokedex from "./pokedex";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/register");
    }

    //check if token is already in localstorage only if we are on login or register page
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
      </Routes>
    </div>
  );
}

export default App;
