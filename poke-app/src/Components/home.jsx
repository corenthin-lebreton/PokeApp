import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import PokemonComponent from "./pokemonComponent";

const Home = () => {
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [url, setUrl] = useState({
    current: "https://pokeapi.co/api/v2/pokemon/",
    next: null,
    previous: null,
  });

  const next = () => {
    setUrl({ current: url.next, next: null, previous: url.current });
  };

  const previous = () => {
    setUrl({ current: url.previous, next: url.current, previous: null });
  };

  useEffect(() => {
    axios
      .get(url.current)
      .then((res) => {
        setPokemon(res.data.results);
        setUrl({
          current: url.current,
          next: res.data.next,
          previous: res.data.previous,
        });
      })
      .catch((res) => {
        console.log(res);
        setError(res.response.data.message);
      });
  }, [url.current]);

  const pokemonCardDisplay = pokemon.map((pokemon, i) => {
    return (
      <div key={"key: " + pokemon.url}>
        <PokemonComponent pokemon={pokemon} />
      </div>
    );
  });

  return (
    <>
      {pokemonCardDisplay}

      {url.previous ? <button onClick={previous}>Previous</button> : <></>}
      {url.next ? <button onClick={next}>Next</button> : <></>}
    </>
  );
};

export default Home;
