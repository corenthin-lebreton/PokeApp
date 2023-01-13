import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import PokemonComponent from "../components/pokemonComponent";
import "../styles/header.scss";
import Header from "../components/header";
import pokeball from "../assets/pokeball.png";

const Home = () => {
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const [pages, setPages] = useState(0);

  const next = () => {
    setPages(pages + 1);
  };

  const previous = () => {
    setPages(pages - 1);
  };

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=10000")
      .then((res) => {
        setAllPokemon(res.data.results);
      })
      .catch((res) => {
        setError(res.response.data.message);
      });
  }, []);

  useEffect(() => {
    if (inputSearch !== "") {
      setPages(0);
      setPokemon(
        allPokemon
          .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(inputSearch.toLowerCase())
          )
          .slice(pages * 20, pages * 20 + 20)
      );
    } else {
      setPokemon(allPokemon.slice(pages * 20, pages * 20 + 20));
    }
  }, [pages, allPokemon, inputSearch]);

  const pokemonCardDisplay = pokemon.map((pokemon, i) => {
    return (
      <Col className="col-sm" key={"key:" + pokemon.url}>
        <PokemonComponent pokemon={pokemon} />
      </Col>
    );
  });

  return (
    <>
      <Header setInputSearch={setInputSearch} />
      <img src={pokeball} alt="pokeballs" className="pokeball-1-home"></img>
      <img src={pokeball} alt="pokeballs" className="pokeball-2-home"></img>
      <p className="titre-home">Catch them all !</p>
      <Container>
        <Row>{pokemonCardDisplay}</Row>
      </Container>

      {pages > 0 ? (
        <Button className="button-previous" variant="danger" onClick={previous}>
          Previous
        </Button>
      ) : (
        <></>
      )}
      {pokemon.length === 20 ? (
        <Button className="button-next" variant="danger" onClick={next}>
          Next
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
