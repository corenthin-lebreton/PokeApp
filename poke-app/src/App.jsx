import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/home";
import Login from "./Components/login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Login />} />
        <Route path="/accueil" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
