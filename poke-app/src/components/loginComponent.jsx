import React, { useState } from "react";
import "../styles/loginStyle.scss";
import image from "../assets/logo.png";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const loginVerication = () => {
    const data = {
      username: username,
      password: password,
    };
    axios
      .post("https://pokemon-api-6r9p.onrender.com/api/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/home";
      })
      .catch((res) => {
        setError(res.response.data.message);
      });
  };

  return (
    <div>
      <img src={image} alt="logo" className="logo-login" />

      <div className="login-container">
        <h1 className="login-title">Connexion</h1>
        <div className="login">
          <Form className="form-login">
            <Form.Group className="mb-3 test">
              <Form.Control
                className="form-fields"
                type="string"
                placeholder="nom d'utilisateur"
                onChange={handleUsername}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 test">
              <Form.Control
                type="password"
                placeholder="mot de passe"
                className="form-fields"
                onChange={handlePassword}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={loginVerication}>
              Connexion
            </Button>
            {error ? <p className="error">{error}</p> : null}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
