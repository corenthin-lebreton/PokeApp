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
          <span className="pokemon-type">
            {pokemonInfo?.types.map((types) => types.type.name)}
          </span>
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

    // <Card style={{width: "15rem", height:"28rem"}}>
    //   {pokemonInfo && (
    // <Card.Img
    //   variant="top"
    //   src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo?.id}.png`}
    //     />
    //   )}
    //   <Card.Body>
    //     <Card.Title>{pokemon.name}</Card.Title>
    //     <Card.Text>{pokemonInfo?.base_experience}</Card.Text>
    //   <Card.Text>
    //     {pokemonInfo?.types.map((types) => types.type.name)}
    //   </Card.Text>

    //   </Card.Body>
    // </Card>
  );
};

export default PokemonComponent;
