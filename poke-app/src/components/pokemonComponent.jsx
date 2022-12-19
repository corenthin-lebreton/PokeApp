import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../styles/pokemonStyle.scss";

const PokemonComponent = ({ pokemon }) => {
  const [pokemonInfo, setPokemonInfo] = useState();
  const [pokemonInfoColor, setPokemonInfoColor] = useState("");
  const [pokemonId, setPokemonId] = useState(0);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(pokemon.url);
        setPokemonInfo(res.data);
        setPokemonId(res.data.id);
      } catch (error) {
        console.error(error);
        setError(error.response.data.message);
      }
    };

    fetchPokemon();
  }, []);

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

  useEffect(() => {
    if (pokemonId === 0) return;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
      .then((res) => {
        setPokemonInfoColor(res.data.color.name);
      })
      .catch((res) => {
        setError(res.response.data.message);
      });
  }, [pokemonId]);

  const createPokedexAndAddPokemon = (pokemonInfo) => {
    axios
      .get("http://localhost:3000/api/pokedextoadd", {
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        if (res.data === null) {
          axios
            .post(
              "http://localhost:3000/api/create",
              {},
              {
                "Content-Type": "application/json",
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((res) => {
              console.log("pokedex added");
              axios
                .patch(
                  "http://localhost:3000/api/addPokemon",
                  { id: pokemonInfo?.id, name: pokemonInfo?.name },
                  {
                    "Content-Type": "application/json",
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then((res) => {})
                .catch((res) => {
                  console.log(res);
                  setError(res.response.data.message);
                  setErrorCode(res.response.status);
                });
            })
            .catch((res) => {
              console.log(res);
              setError(res.response.data.message);
              setErrorCode(res.response.status);
            });
        } else {
          axios
            .patch(
              "http://localhost:3000/api/addPokemon",
              { id: pokemonInfo?.id, name: pokemonInfo?.name },
              {
                "Content-Type": "application/json",
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((res) => {})
            .catch((res) => {
              console.log(res);
              setError(res.response.data.message);
              setErrorCode(res.response.status);
            });
        }
      })
      .catch((res) => {
        console.log(res);
        setError(res.response.data.message);
        setErrorCode(res.response.status);
      });
  };

  return (
    <div className="pokemon-card-container">
      <div className="pokemon-card">
        <div
          className="background"
          style={{ backgroundColor: pokemonInfoColor }}>
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
            <p>Capacité :{capacity()}</p>
            <p>Capacité secrète : {secretCapacity()}</p>
            <p>Hauteur: {pokemonInfo?.height} </p>
            <p>Poids: {pokemonInfo?.weight}</p>
          </div>
          <Button
            variant="primary"
            onClick={() => createPokedexAndAddPokemon(pokemonInfo)}>
            Ajouter au pokédex
          </Button>

          <h1 className="pokemon-logo">Pokemon Cards</h1>
        </div>
      </div>
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
};

export default PokemonComponent;
