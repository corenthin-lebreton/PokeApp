import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/homeStyle.scss";
import Header from "../components/header";

const Pokedex = () => {
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/pokedex", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        if (res.data.length === 0) {
          setErrorCode(400);
        } else {
          console.log(res);
        }
        setNoPokemon(false);
      })
      .catch((res) => {
        console.log(res);
        setError(res.response.data.message);
        setErrorCode(res.response.status);
      });
  }, []);

  return (
    <div>
      <Header />

      {errorCode === 400 ? (
        <div>
          <h1>Tu n'as pas encore ajouté de pokémon</h1>
          <img src="https://media.tenor.com/aZuxB-dfJlAAAAAC/pokemon-pocket-monsters.gif"></img>
        </div>
      ) : (
        <div>
          <h1>Here are your pokemon</h1>
        </div>
      )}
    </div>
  );
};

export default Pokedex;
