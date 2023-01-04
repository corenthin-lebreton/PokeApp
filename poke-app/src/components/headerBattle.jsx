import React from 'react';
import image from "../assets/logo.png";
import pokedex from "../assets/Pokedex.png";
import pikachu from "../assets/pikachu.png";
import pokebattle from "../assets/pokebattle.png"
import pokeball from "../assets/pokeball.png";
import "../styles/header.scss";
import "../styles/pokebattle.scss"
import { Button, Navbar } from 'react-bootstrap';

const HeaderBattle = () => {
    const logOutUser = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      };
    return (
        <div>
            <div>
      <header className="header">
        <img src={image} alt="logo" className="logo-home"></img>
        <a href="/pokedex">
          <img src={pokedex} alt="pokedex" className="image-pokedex"></img>
        </a>
        <a href="/home">
          <img
            src={pikachu}
            alt="liste-pokemon"
            className="image-pikachu"></img>
        </a>

        <a href="/pokebattle">
          <img 
          src={pokebattle}
          alt="battle"
          className="image-pokebattle"></img>
        </a>

        <p className='titre-battle'>Combattez d'autre dresseur !</p>

        <img
          src={pokeball}
          alt="pokeballs"
          className="pokeball-1-pokebattle"></img>
        <img
          src={pokeball}
          alt="pokeballs"
          className="pokeball-2-pokebattle"></img>

        <Navbar bg="none" expand="lg" className="navbar">
          <Button variant="secondary" className='button-logout' onClick={logOutUser}>
            Logout
          </Button>
        </Navbar>
      </header>
    </div>
        </div>
    );
};

export default HeaderBattle;