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

  const [idPokemon, setIdPokemon] = useState([]);
  const [isPokemonSent, setIsPokemonSent] = useState(false);
  const [idPokemonHost, setIdPokemonHost] = useState([]);
  const [idPokemonEnnemy, setIdPokemonEnnemy] = useState([]);
  const [pokemonHostIndex, setPokemonHostIndex] = useState(0);
  const [pokemonEnnemyIndex, setPokemonEnnemyIndex] = useState(0);
  const [message, setMessage] = useState("");

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
            setMessage(res.data.message);
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

              if (
                res.data.message === "you won the game and you get 1 coin" ||
                res.data.message === "you lost the game"
              ) {
                setIdPokemonHost(res.data.pokemonHost);
                setIdPokemonEnnemy(res.data.contentEnnemy);

                async function getStatsFromPokemons(pokemons) {
                  return await Promise.all(
                    pokemons.map(async (pokemon) => {
                      const res = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
                      );
                      const data = await res.data;
                      const hp = data.stats.filter((stat) => {
                        return stat.stat.name === "hp";
                      });

                      const attack = data.stats.filter((stat) => {
                        return stat.stat.name === "attack";
                      });

                      const defense = data.stats.filter((stat) => {
                        return stat.stat.name === "defense";
                      });

                      const speed = data.stats.filter((stat) => {
                        return stat.stat.name === "speed";
                      });
                      return {
                        id: data.id,
                        hp: hp[0].base_stat,
                        attack: attack[0].base_stat,
                        defense: defense[0].base_stat,
                        speed: speed[0].base_stat,
                      };
                    })
                  );
                }

                const statsHost = await getStatsFromPokemons(
                  res.data.pokemonHost
                );
                const statsEnnemy = await getStatsFromPokemons(
                  res.data.contentEnnemy
                );

                console.log(statsHost);
                console.log(statsEnnemy);

                console.log(idPokemonHost);
                console.log(idPokemonEnnemy);
                async function fight() {
                  let host = 0;
                  let ennemy = 0;

                  while (true) {
                    let hostPokemon = statsHost[host];
                    let ennemyPokemon = statsEnnemy[ennemy];

                    while (hostPokemon.hp > 0 && ennemyPokemon.hp > 0) {
                      if (hostPokemon.speed > ennemyPokemon.speed) {
                        ennemyPokemon.hp -=
                          (2 / 5 + 2) *
                            (hostPokemon.attack / ennemyPokemon.defense) +
                          2;
                        if (ennemyPokemon.hp > 0) {
                          hostPokemon.hp -=
                            (2 / 5 + 2) *
                              (ennemyPokemon.attack / hostPokemon.defense) +
                            2;
                        }
                      } else {
                        hostPokemon.hp -=
                          (2 / 5 + 2) *
                            (ennemyPokemon.attack / hostPokemon.defense) +
                          2;
                        if (hostPokemon.hp > 0) {
                          ennemyPokemon.hp -=
                            (2 / 5 + 2) *
                              (hostPokemon.attack / ennemyPokemon.defense) +
                            2;
                        }
                      }
                    }

                    if (hostPokemon?.hp <= 0) {
                      setPokemonHostIndex((index) => index + 1);
                      await new Promise((resolve) => setTimeout(resolve, 2000));
                      host++;
                      hostPokemon = statsHost[host];
                    } else if (ennemyPokemon.hp <= 0) {
                      setPokemonEnnemyIndex((index) => index + 1);
                      await new Promise((resolve) => setTimeout(resolve, 2000));
                      ennemy++;
                      ennemyPokemon = statsEnnemy[ennemy];
                    }

                    if (host === statsHost.length) {
                      setMessage(res.data.message);
                      return "ennemy";
                    } else if (ennemy === statsEnnemy.length) {
                      return "host";
                    }
                  }
                }

                await fight();
                setMessage(res.data.message);
                await new Promise((resolve) => setTimeout(resolve, 3000));
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
        <div className="pokemon-post-1">
          {idPokemonHost[pokemonHostIndex] ? (
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemonHost[pokemonHostIndex]}.png`}></img>
          ) : null}
        </div>
        <div className="pokemon-post-2">
          {idPokemonEnnemy[pokemonEnnemyIndex] ? (
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemonEnnemy[pokemonEnnemyIndex]}.png`}></img>
          ) : null}
        </div>
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

      {message ? <p>{message}</p> : null}
    </div>
  );
};

export default BattleArena;
