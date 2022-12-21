import React from "react";
import pokedexx from "../assets/Pokedexx.png";
import arrowsNext from "../assets/arrows-next.png";
import arrowsPrevious from "../assets/arrows-previous.png";
import "../styles/homeStyle.scss";
import "../styles/pokedexStyle.scss";
import Header from "../components/header";
const PokedexComponent = ({
  pokemon,
  error,
  errorCode,
  capacity,
  secretCapacity,
  next,
  previous,
}) => {
  return (
    <div>
      <Header />

      {errorCode === 400 ? (
        <div>
          <img src="https://media.tenor.com/7C6H6TQk-D8AAAAC/pokemon-ash.gif"></img>
          <p>{error && <p>{error}</p>}</p>
        </div>
      ) : (
        <div className="background-pokedex">
          <div>
            <img src={pokedexx} alt="pokedexx" className="pokedex"></img>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
              alt="pokemon"
              className="pokemon"></img>
          </div>

          <div className="user-interface">
            <div className="blue-button"></div>
            <div className="yellow-screen">{pokemon?.id}</div>
            <div className="first-pokemon-button"></div>
            <div className="last-pokemon-button"></div>

            <div className="pokemon-name-pokedex">
              {pokemon?.name}
              <p>Capacité : {capacity}</p>
              <p>Capacité secrète : {secretCapacity}</p>
              {pokemon?.types.length > 1 ? (
                <div>
                  <p>{pokemon?.types[0].type.name}</p>

                  <p>{pokemon?.types[1].type.name}</p>
                </div>
              ) : (
                <p>{pokemon?.types[0].type.name}</p>
              )}
              <p>Poids : {pokemon?.weight} </p>
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
      )}
    </div>
  );
};

export default PokedexComponent;
