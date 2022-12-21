import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/homeStyle.scss";
import "../styles/pokedexStyle.scss";
import PokedexComponent from "../components/pokedexComponent";

const Pokedex = () => {
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [errorCode, setErrorCode] = useState(null);
  const [pokemonInfo, setPokemonInfo] = useState();
  const [pokemonId, setPokemonId] = useState([]);
  const [pokemonIndex, setPokemonIndex] = useState(0);

  const next = () => {
    if (pokemonIndex === pokemonId.length - 1) {
      return;
    } else {
      setPokemonIndex(pokemonIndex + 1);
    }
  };

  const previous = () => {
    if (pokemonIndex === 0) {
      return;
    } else {
      setPokemonIndex(pokemonIndex - 1);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/pokedex", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.length === 0) {
          setErrorCode(400);
        } else {
          setPokemonId(res.data.pokemons);
        }
      })
      .catch((res) => {
        setError(res.response.data.message);
        setErrorCode(res.response.status);
      });
  }, []);

  useEffect(() => {
    if (pokemonId === 0 && pokemonId === undefined) {
      return;
    }
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId[pokemonIndex]}`)
      .then((res) => {
        setPokemonInfo(res.data);
      })
      .catch((res) => {
        setError(res.response.data.message);
      });
  }, [pokemonId, pokemonIndex]);

  const secretCapacity = () => {
    const secretCapacity = pokemonInfo?.abilities.find(
      (ability) => ability.is_hidden === true
    );
    if (secretCapacity) {
      return secretCapacity.ability.name;
    } else {
      return "Aucune";
    }
  };
  const capacity = () => {
    const capacity = pokemonInfo?.abilities.find(
      (ability) => ability.is_hidden === false
    );
    if (capacity) {
      return capacity.ability.name;
    } else {
      return "Aucune";
    }
  };

  return (
    <PokedexComponent
      error={error}
      errorCode={errorCode}
      pokemon={pokemonInfo}
      secretCapacity={secretCapacity()}
      capacity={capacity()}
      next={next}
      previous={previous}
    />
  );
};

export default Pokedex;
