import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Col, Row } from "react-bootstrap";
import "../styles/pokemonStyle.scss";

const PokemonComponent = ({ pokemon }) => {
  const [pokemonInfo, setPokemonInfo] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get(pokemon.url)
      .then((res) => {
        setPokemonInfo(res.data);
      })
      .catch((res) => {
        setError(res.response.data.message);
      });
  }, [pokemon]);

  return (
    <div className="pokemon-card-container">
      <div className="pokemon-card">
        <div className="background">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo?.id}.png`}
            className="image"></img>
        </div>

        <div className="content">
          <h1 className="pokemon-name">{pokemon.name}</h1>
          {pokemonInfo?.types.length > 1 ? (
            <div>
              <span className="pokemon-type">
                {pokemonInfo?.types[0].type.name}
              </span>
              <span className="pokemon-type">
                {pokemonInfo?.types[1].type.name}
              </span>
            </div>
          ) : (
            <span className="pokemon-type">
              {pokemonInfo?.types[0].type.name}
            </span>
          )}
          <div className="pokemon-stats">
            <p>Power : </p>
            <p>Damage :</p>
            <p>Attack: </p>
            <p>health :</p>
            <p>Friendly : </p>
          </div>
          <Button variant="primary">Ajouter au pokédex</Button>

          <h1 className="pokemon-logo">Pokemon Cards</h1>
        </div>
      </div>
    </div>
  );
};

export default PokemonComponent;
