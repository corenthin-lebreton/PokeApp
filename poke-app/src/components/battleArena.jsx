import React, { useEffect, useState } from "react";
import "../styles/pokebattle.scss";
import axios from "axios";
import ChoosePokemonToFight from "./choosePokemonToFight";
const BattleArena = () => {
  const [isPlayerJoined, setIsPlayerJoined] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkPlayersJoined = async () => {
      try {
        while (isPlayerJoined === false) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          const checkIfNewPlayerJoined = async () => {
            const res = await axios.get("http://localhost:3000/api/isWaiting", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            console.log(res.data);
            if (res.data === true) {
              setIsPlayerJoined(true);
            }
          };
          await checkIfNewPlayerJoined();
          break;
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkPlayersJoined();
  }, [isPlayerJoined]);
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

      {isPlayerJoined ? <ChoosePokemonToFight /> : null}
    </div>
  );
};

export default BattleArena;
