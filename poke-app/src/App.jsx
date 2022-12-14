import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Components/home";
import Login from "./Components/loginComponent";
import Register from "./Components/registerComponent";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/register");
      console.log("ok");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
