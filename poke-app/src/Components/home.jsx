import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import PokemonComponent from "./pokemonComponent";
import image from "../assets/logo.png";
import pokedex from "../assets/Pokedex.png"
import pikachu from "../assets/pikachu.png"
import "../styles/homeStyle.scss";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

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
            <Button className="btn btn-warning">Search</Button>
          </Form>
    </Navbar>
      </header>
      {pokemonCardDisplay}

      {url.previous ? <button onClick={previous}>Previous</button> : <></>}
      {url.next ? <button onClick={next}>Next</button> : <></>}
    </>
  );
};

export default Home;
