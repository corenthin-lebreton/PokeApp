import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/home";
import Login from "./Components/loginComponent";
import Register from "./Components/registerComponent";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/accueil" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
