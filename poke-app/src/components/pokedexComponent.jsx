import React, { useEffect, useState } from "react";
import pokedexx from "../assets/Pokedexx.png";
import arrowsNext from "../assets/arrows-next.png";
import arrowsPrevious from "../assets/arrows-previous.png";
import "../styles/homeStyle.scss";
import "../styles/pokedexStyle.scss";
import pokeball from "../assets/pokeball.png";
const PokedexComponent = ({
  pokemon,
  error,
  errorCode,
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
      <p className="titre-pokedex">Voici votre Pokedex ! </p>
      <img src={pokeball} alt="pokeballs" className="pokeball-1-pokedex"></img>
      <img src={pokeball} alt="pokeballs" className="pokeball-2-pokedex"></img>
      <div className="background-pokedex">
        <h2 className="errorSearch">{errorSearch}</h2>
        <div>
          <img src={pokedexx} alt="pokedexx" className="pokedex"></img>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
            alt="pokemon"
            className="pokemon-image"></img>
        </div>

        <div className="user-interface">
          <div className="blue-button" onClick={deletePokemon}></div>

          <div className="yellow-screen">
            {pokemon?.types.length > 1 ? (
              <div>
                <p className="pokemon-types">Types : </p>

                <p className="pokemon-type-1">{pokemon?.types[0].type.name}</p>

                <p className="pokemon-type-2">{pokemon?.types[1].type.name}</p>
              </div>
            ) : (
              <div>
                <p className="pokemon-types">Types : </p>
                <p className="pokemon-single-type">
                  {pokemon?.types[0].type.name}
                </p>
              </div>
            )}
          </div>

          <div
            className="first-pokemon-button"
            onClick={switchToFirstPokemon}></div>

          <div
            className="last-pokemon-button"
            onClick={switchToLastPokemon}></div>

          <div className="pokemon-name-pokedex">
            <div className="pokemon-names">{pokemon?.name}</div>

            <div className="pokemon-capacity">
              <p>Capacité : {capacity}</p>
              <p>Capacité secrète : {secretCapacity}</p>
            </div>

            <p className="pokemon-poids">Poids : {pokemon?.weight} </p>
            <p className="pokemon-id">Numéro du pokemon : {pokemon?.id}</p>
          </div>

          <img
            src={arrowsNext}
            alt="arrows-next"
            className="arrows-next"
            onClick={next}></img>
          <img
            src={arrowsPrevious}
            alt="arrows-previous"
            className="arrows-previous"
            onClick={previous}></img>
        </div>
      </div>
    </div>
  );
};

export default PokedexComponent;
