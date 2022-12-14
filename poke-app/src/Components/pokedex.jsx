import React from 'react';
import image from "../assets/logo.png";
import pokedex from "../assets/Pokedex.png"
import pikachu from "../assets/pikachu.png"
import "../styles/homeStyle.scss";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Pokedex = () => {
    return(
        <div>
          <header className="header">
            <img src={image} alt="logo" className="logo-home" ></img>
            <a href="/pokedex"><img src={pokedex} alt="pokedex" className="image-pokedex" onClick="/pokedex" ></img></a>
            <a href="/home"><img src={pikachu} alt="liste-pokemon" className="image-pikachu" onClick="/home"></img></a>
            <Navbar bg="none" expand="lg" className="navbar">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button className="btn btn-warning" >Search</Button>
              </Form>
        </Navbar>
          </header>
        </div>
      )
};

export default Pokedex;