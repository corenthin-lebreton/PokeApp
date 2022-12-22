import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from "react";
import "../styles/homeStyle.scss";
import "../styles/pokedexStyle.scss";
import PokedexComponent from "../components/pokedexComponent";
import Header from "../components/header";
import pokeball from "../assets/pokeball.png";

const Pokedex = () => {
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [errorCode, setErrorCode] = useState(null);
  const [pokemonInfo, setPokemonInfo] = useState();
  const [pokemonId, setPokemonId] = useState([]);
  const [pokemonIndex, setPokemonIndex] = useState(0);
  const [inputSearch, setInputSearch] = useState("");
  const [errorSearch, setErrorSearch] = useState("");
  //---------------------------Go to the first and last pokemon----------------------------
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
  //---------------------------------------------------------------------------------------

  //----------------------------Verify if a pokedex already exists------------------------
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
  //-------------------------------------------------------------------------------------

  //-------------------Get Pokemon Info to add it on the pokedex display-----------------
  useEffect(() => {
    if (pokemonId.length === 0) {
      setErrorCode(400);
      setError("Vous n'avez plus de pokemon. Ajoutez en un nouveau.");
      return;
    }
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId[pokemonIndex]}`)
      .then((res) => {
        setPokemonInfo(res.data);
        setErrorCode(200);
      })
      .catch((res) => {
        setError(res.response.data.message);
      });
  }, [pokemonId, pokemonIndex]);

  //---------------------------------------------------------------------------------

  //----------------Get  one capacity and secret capacity---------------------------
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
  //------------------------------Delete Pokemon from Pokedex-------------------------------------------------------
  const deletePokemon = () => {
    const data = {
      id: pokemonId[pokemonIndex],
    };

    axios
      .delete(
        `http://localhost:3000/api/deletePokemon/`,

        {
          headers: { Authorization: `Bearer ${token}` },
        },
        { data }
      )
      .then((res) => {
        setPokemonId(pokemonId.filter((id) => id !== pokemonId[pokemonIndex]));
        setPokemonIndex(0);
      })
      .catch((res) => {
        setError(res.response.data.message);
        setErrorCode(res.response.status);
      });
  };
  //--------------------------Go to the first and last Pokemon from Pokedex-------------------------

  const switchToFirstPokemon = () => {
    if (pokemonIndex === 0) return;
    setPokemonIndex(0);
  };

  const switchToLastPokemon = () => {
    if (pokemonIndex === pokemonId.length - 1) return;
    setPokemonIndex(pokemonId.length - 1);
  };

  //---------------------------------SearchBar---------------------------------------------------------
  const search = async () => {
    const data = await axios.get(`
      https://pokeapi.co/api/v2/pokemon/${inputSearch}`
    );

    if (pokemonId.includes(data.data.id)) {
      setPokemonIndex(pokemonId.indexOf(data.data.id));
    } else {
      setErrorSearch("Ce pokemon n'est pas dans votre Pokedex");
    }
  };
  
  //----------------------------------------------------------------------------------------------------
  return (
    <div>
      {errorCode === 400 ? (
        <div>
          <Header setInputSearch={setInputSearch} />
          <p className="titre-pokedex">Voici votre Pokedex ! </p>
          <img
            src={pokeball}
            alt="pokeballs"
            className="pokeball-1-pokedex"></img>
          <img
            src={pokeball}
            alt="pokeballs"
            className="pokeball-2-pokedex"></img>
          <img
            src="https://media.tenor.com/7C6H6TQk-D8AAAAC/pokemon-ash.gif"
            className="sad-sasha"></img>
          {error && <p className="no-pokemon">{error}</p>}
        </div>
      ) : (
        <div>
          <Header setInputSearch={setInputSearch} search={search} />
          <PokedexComponent
            error={error}
            errorCode={errorCode}
            pokemon={pokemonInfo}
            secretCapacity={secretCapacity()}
            capacity={capacity()}
            next={next}
            previous={previous}
            deletePokemon={deletePokemon}
            switchToFirstPokemon={switchToFirstPokemon}
            switchToLastPokemon={switchToLastPokemon}
            errorSearch={errorSearch}
          />
        </div>
      )}
    </div>
  );
};

export default Pokedex;
