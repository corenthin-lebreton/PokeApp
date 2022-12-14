import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

const PokemonComponent = ({ pokemon }) => {
  const [pokemonInfo, setPokemonInfo] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get(pokemon.url)
      .then((res) => {
        console.log(res.data);
        setPokemonInfo(res.data);
      })
      .catch((res) => {
        console.log(res);
        setError(res.response.data.message);
      });
  }, [pokemon]);

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        {pokemonInfo && (
          <Card.Img
            variant="top"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo?.id}.png`}
          />
        )}
        <Card.Body>
          <Card.Title>{pokemon.name}</Card.Title>
          <Card.Text>{pokemonInfo?.base_experience}</Card.Text>
          <Card.Text>
            {pokemonInfo?.types.map((types) => types.type.name)}
          </Card.Text>
          <Button variant="primary">Ajouter au pokédex</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PokemonComponent;
