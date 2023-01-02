import React, { useEffect, useState } from "react";
import pokedexx from "../assets/Pokedexx.png";
import arrowsNext from "../assets/arrows-next.png";
import arrowsPrevious from "../assets/arrows-previous.png";
import "../styles/homeStyle.scss";
import "../styles/pokedexStyle.scss";
import pokeball from "../assets/pokeball.png";
const PokedexComponent = ({
  pokemon,
  capacity,
  secretCapacity,
  next,
  previous,
  deletePokemon,
  switchToFirstPokemon,
  switchToLastPokemon,
  errorSearch,
}) => {
  return (
    <div>
      <div>
        <p className="titre-pokedex">Voici votre Pokedex ! </p>
        <img
          src={pokeball}
          alt="pokeballs"
          className="pokeball-1-pokedex"></img>
        <img
          src={pokeball}
          alt="pokeballs"
          className="pokeball-2-pokedex"></img>
        <div className="background-pokedex">
          <div>
            <img src={pokedexx} alt="pokedexx" className="pokedex"></img>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
              alt="pokemon"
              className="pokemon-image"></img>
          </div>

          <div className="user-interface">
            <div className="blue-button"></div>

            <div className="yellow-screen"></div>
          </div>

          <div className="first-pokemon-button"></div>

          <div className="last-pokemon-button"></div>

          <div className="pokemon-name-pokedex">
            <div className="pokemon-names"></div>

            <div className="pokemon-capacity"></div>

            <p className="pokemon-poids">Poids : </p>
            <p className="pokemon-id">Numéro du pokemon : </p>
          </div>

          <img src={arrowsNext} alt="arrows-next" className="arrows-next"></img>
          <img
            src={arrowsPrevious}
            alt="arrows-previous"
            className="arrows-previous"></img>
        </div>
      </div>
    </div>
  );
};

export default PokedexComponent;
