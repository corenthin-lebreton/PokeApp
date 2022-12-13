import React, { useState } from "react";
import "../styles/loginStyle.scss";
import image from "../assets/logo.png";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  };

  const sendDataToApi = () => {
    const data = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };
    try {
      axios.post("http://localhost:3000/api/register", data).then((res) => {
        console.log(res);
        console.log(res.data);
      });
    } catch (error) {
      //get error message from api
      setError(error.response.data.message);
    }
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

            <Form.Group className="mb-3 test">
              <Form.Control
                type="password"
                placeholder="confirmer mot de passe"
                className="form-fields"
                onChange={handleConfirmPassword}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={sendDataToApi}>
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
