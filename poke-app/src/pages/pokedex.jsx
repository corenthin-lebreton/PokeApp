import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import "../styles/header.scss";
import "../styles/pokedexStyle.scss";
import PokedexComponent from "../components/pokedexComponent";
import Header from "../components/header";

const Pokedex = () => {
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [errorCode, setErrorCode] = useState(null);
  const [pokemonInfo, setPokemonInfo] = useState();
  const [pokemonId, setPokemonId] = useState([]);
  const [pokemonIndex, setPokemonIndex] = useState(0);
  const [inputSearch, setInputSearch] = useState("");
  const [errorSearch, setErrorSearch] = useState("");
  const [coin, setCoin] = useState();
  const [allPokemon, setAllPokemon] = useState();
  const [imageModal, setimageModal] = useState();
  const [imagePokedex, setImagePokedex] = useState();

  const [pokemonInfoToDisplay, setPokemonInfoToDisplay] = useState();
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
        setErrorCode(res.response.status);
      });
  }, []);
  // //-------------------------------------------------------------------------------------

  // //-------------------Get Pokemon Info to add it on the pokedex display-----------------
  useEffect(() => {
    if (pokemonId.length === 0) {
      setErrorCode(400);
      return;
    }
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId[pokemonIndex]}`)
      .then((res) => {
        setPokemonInfoToDisplay(res.data);
        setImagePokedex(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId[pokemonIndex]}.png`
        );
        setErrorCode(200);
      })
      .catch((res) => {
        setError(res.response.data.message);
      });

    setErrorSearch("");
  }, [pokemonId, pokemonIndex]);

  // //---------------------------------------------------------------------------------

  // //----------------Get  one capacity and secret capacity---------------------------
  const secretCapacity = () => {
    const secretCapacity = pokemonInfoToDisplay?.abilities.find(
      (ability) => ability.is_hidden === true
    );
    if (secretCapacity) {
      return secretCapacity.ability.name;
    } else {
      return "Aucune";
    }
  };
  const capacity = () => {
    const capacity = pokemonInfoToDisplay?.abilities.find(
      (ability) => ability.is_hidden === false
    );
    if (capacity) {
      return capacity.ability.name;
    } else {
      return "Aucune";
    }
  };

  //---------------------------------SearchBar---------------------------------------------------------
  const search = async () => {
    const data = await axios.get(`
      https://pokeapi.co/api/v2/pokemon/${inputSearch}`);

    if (pokemonId.includes(data.data.id)) {
      setPokemonIndex(pokemonId.indexOf(data.data.id));
    } else {
      setErrorSearch("Ce pokemon n'est pas dans votre Pokedex");
    }
  };

  //---------------------------------------------------------------------------------------------------
  const getCoin = async () => {
    await axios
      .get("http://localhost:3000/api/getCoin", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCoin(res.data.pokedollarz);
      })
      .catch((res) => {
        setError(res.response.data.message);
        setErrorCode(res.response.status);
      });
  };

  useEffect(() => {
    getCoin();
  }, [coin]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=1000"
      );
      setAllPokemon(result.data.results);
    };
    fetchData();
  }, []);

  const sendPokemonToApi = async () => {
    await axios
      .get("http://localhost:3000/api/pokedextoadd", {
        "Content-Type": "application/json",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data === null) {
          axios
            .post(
              "http://localhost:3000/api/create",
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              axios
                .patch(
                  "http://localhost:3000/api/addPokemon",
                  {
                    id: pokemonInfo?.id,
                  },
                  {
                    "Content-Type": "application/json",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((res) => {})
                .catch((res) => {
                  setError(res.response.data.message);
                  setErrorCode(res.response.status);
                });
            });
        } else {
          axios
            .patch(
              "http://localhost:3000/api/addPokemon",
              { id: pokemonInfo?.id },
              {
                "Content-Type": "application/json",
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((res) => {})
            .catch((res) => {
              if (res.response.data.message != undefined) {
                setError(res.response.data.message);
              }
              setErrorCode(res.response.status);
            });
        }
      });
  };
  useEffect(() => {
    if (pokemonInfo) {
      sendPokemonToApi();
    }
  }, [pokemonInfo]);

  const getRandomPokemon = async () => {
    if (coin > 0) {
      const randomPokemon = await allPokemon[
        Math.floor(Math.random() * allPokemon.length)
      ];

      const url = randomPokemon.url
        .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
        .replace("/", "");

      const result = await axios(`https://pokeapi.co/api/v2/pokemon/${url}`);
      setimageModal(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${result.data.id}.png`
      );
      setPokemonInfo(result.data);
      setPokemonId((pokemonId) => [...pokemonId, result.data.id]);

      setCoin(coin - 1);
      await axios.patch(
        "http://localhost:3000/api/reduceCoin",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } else {
      setError("Désolé vous n'avez plus de pokedollarz");
    }
  };

  //----------------------------------------------------------------------------------------------------
  return (
    <div>
      <div>
        <p className="titre-pokedex">Voici votre Pokedex ! </p>
      </div>

      <div>
        <Header setInputSearch={setInputSearch} search={search} />
        <PokedexComponent
          error={error}
          // errorCode={errorCode}
          pokemon={pokemonInfo}
          pokemonInfo={pokemonInfoToDisplay}
          coin={coin}
          getRandomPokemon={getRandomPokemon}
          imageModal={imageModal}
          next={next}
          previous={previous}
          imagePokedex={imagePokedex}
          capacity={capacity}
          secretCapacity={secretCapacity}
          errorSearch={errorSearch}
        />
      </div>
    </div>
  );
};

export default Pokedex;
