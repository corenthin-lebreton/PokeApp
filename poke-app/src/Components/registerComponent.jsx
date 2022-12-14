import React, { useState } from "react";
import "../styles/registerStyle.scss";
import image from "../assets/logo.png";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
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

  //login verification and rediction to home page

  // const loginVerication = () => {
  //   const data = {
  //     username: username,
  //     password: password,
  //   };
  //   axios
  //     .post("http://localhost:3000/api/login", data)
  //     .then((res) => {
  //       console.log(res);
  //       console.log(res.data);
  //       localStorage.setItem("token", res.data.token);
  //       window.location.href = "/home";
  //     })
  //     .catch((res) => {
  //       setError(res.response.data.message);
  //     });
  // };

  const sendDataToApi = () => {
    const data = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };
    axios
      .post("http://localhost:3000/api/register", data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/login";
      })
      .catch((res) => {
        setError(res.response.data.message);
      });
  };

  return (
    <div>
      <img src={image} alt="logo" className="logo-register" />

      <div className="register-container">
        <h1 className="register-title">Créez un compte</h1>
        <div className="register">
          <Form className="form-register">
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
              Créer un compte
            </Button>
            {error ? <p className="error">{error}</p> : null}
          </Form>

          <p className="connection-link">
            <Link to="/login">Déjà inscrit ? Connectez-vous</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
