import React, { useEffect, useState } from "react";
import "../styles/pokebattle.scss";
import axios from "axios";
import ChoosePokemonToFight from "./choosePokemonToFight";
import { useNavigate } from "react-router-dom";

const BattleArena = () => {
  const token = localStorage.getItem("token");
  const [isPlayerJoined, setIsPlayerJoined] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [modalShow, setModalShow] = useState(true);
  const [isPlayerSendPokemonsList, setIsPlayerSendPokemonsList] =
    useState(false);
  const [idPokemon, setIdPokemon] = useState([]);
  const [isPokemonSent, setIsPokemonSent] = useState(false);
  const [idPokemonHost, setIdPokemonHost] = useState([]);
  const [idPokemonEnnemy, setIdPokemonEnnemy] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const checkPlayersJoined = async () => {
      try {
        while (true) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          const checkIfNewPlayerJoined = async () => {
            const res = await axios.get("http://localhost:3000/api/isWaiting", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            console.log(res.data);
            setIdPokemon(res.data);
            if (res.data.message === "new player joined") {
              return true;
            } else {
              return false;
            }
          };
          if (await checkIfNewPlayerJoined()) {
            break;
          }
        }
        setIsPlayerJoined(true);
      } catch (error) {
        console.log(error);
      }
    };
    checkPlayersJoined();
  }, []);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/pokedex", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPokemon(res.data.pokemons);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    const asyncForPlayerSendingPokemonsList = async () => {
      try {
        while (true) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          const checkIfPlayerSendPokemonsList = async () => {
            try {
              const res = await axios.get(
                "http://localhost:3000/api/isPlayerSendListPokemons",
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log(res.data);
              setIdPokemonEnnemy(res.data.contentEnnemy);
              setIdPokemonHost(res.data.pokemonsHost);
              if (
                res.data.message === "you won the game and you get 1 coin" ||
                res.data.message === "you lost the game"
              ) {
                navigate("/home");
                return true;
              } else {
                return false;
              }
            } catch (error) {
              console.log(error);
            }

            return false;
          };

          if (await checkIfPlayerSendPokemonsList()) {
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isPokemonSent) {
      asyncForPlayerSendingPokemonsList();
    }
  }, [isPokemonSent]);

  return (
    <div>
      <div className="terrain">
        <div className="ligne-terrain-top"></div>
        <div className="ligne-terrain-bottom"></div>
        <div className="ligne-terrain-left"></div>
        <div className="ligne-terrain-right"></div>
        <div className="ligne-terrain-middle-top"></div>
        <div className="ligne-terrain-middle-bottom"></div>
        <div className="middle-circle"></div>
        <div className="middle-circle-ligne-top"></div>
        <div className="middle-circle-ligne-bottom"></div>
        <div className="little-middle-circle"></div>
        <div className="white-part"></div>
        <div className="red-part"></div>
        <div className="pokemon-post-1"></div>
        <div className="pokemon-post-2"></div>
      </div>

      {isPlayerJoined ? (
        <ChoosePokemonToFight
          pokemon={pokemon}
          show={modalShow}
          setispokemonsent={setIsPokemonSent}
          setmodalshow={setModalShow}
          onHide={() => setModalShow(false)}
        />
      ) : null}
    </div>
  );
};

export default BattleArena;
