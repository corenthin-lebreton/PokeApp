import React from "react";
import "../styles/loginStyle.scss";
import image from "../assets/logo.png";
import { Button, Form } from "react-bootstrap";

const Login = () => {
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
              />
            </Form.Group>
            <Form.Group className="mb-3 test">
              <Form.Control
                type="password"
                placeholder="mot de passe"
                className="form-fields"
              />
            </Form.Group>

            <Form.Group className="mb-3 test">
              <Form.Control
                type="password"
                placeholder="confirmer mot de passe"
                className="form-fields"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Connexion
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
