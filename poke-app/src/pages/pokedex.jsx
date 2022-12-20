import axios from "axios";
import React, { useEffect, useState } from "react";
import pokedexx from "../assets/Pokedexx.png";
import arrowsNext from "../assets/arrows-next.png";
import arrowsPrevious from "../assets/arrows-previous.png"
import "../styles/homeStyle.scss";
import "../styles/pokedexStyle.scss";
import Header from "../components/header";
import {Container, Row, Col, Card} from 'react-bootstrap'

const Pokedex = () => {
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/pokedex", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        if (res.data.length === 0) {
          setErrorCode(400);
        } else {
          console.log(res);
        }
        setNoPokemon(false);
      })
      .catch((res) => {
        console.log(res);
        setError(res.response.data.message);
        setErrorCode(res.response.status);
      });
  }, []);

  return (
    <div>
      <Header />

      <div className="background-pokedex">
        <div>
          <img src={pokedexx} alt="pokedexx" className="pokedex"></img>
        </div>


      <div className="user-interface">
        <div className="blue-button"></div>
        <div className="yellow-screen">Numéro du pokemon</div>
        <div className="first-pokemon-button"></div>
        <div className="last-pokemon-button"></div>

        <div className="pokemon-name-pokedex">
          Nom du pokemon
        </div>
        <img src={arrowsNext} alt="arrows-next" className="arrows-next"></img>
        <img src={arrowsPrevious} alt="arrows-previous" className="arrows-previous"></img>

      </div>

      </div>
    </div>
  );
};

export default Pokedex;
