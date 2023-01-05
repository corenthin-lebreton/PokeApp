import React, { useEffect, useState } from "react";
import pokedexx from "../assets/Pokedexx.png";
import arrowsNext from "../assets/arrow-right.png";
import arrowsPrevious from "../assets/arrow-left.png";
import pokebag from "../assets/pokebag.png";
import pokedollar from "../assets/poke-dollar.jpg";
import pokeball from "../assets/pokeball.png";
import "../styles/header.scss";
import "../styles/pokedexStyle.scss";
import UseModal from "./useModal";
const PokedexComponent = ({
  pokemon,
  capacity,
  secretCapacity,
  next,
  previous,
  errorSearch,
  getRandomPokemon,
  coin,
  imageModal,
  error,
  pokemonInfo,
  imagePokedex,
}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      {/* <div>
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
          <img src={pokedollar} alt="pokedollar" className="pokedollar"></img>
          {coin !== null ? (
            <p className="pokedollar-number"> {coin} </p>
          ) : (
            <></>
          )}

          <div>
            <img src={pokedexx} alt="pokedexx" className="pokedex"></img>
            {/* <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
              alt="pokemon"
              className="pokemon-image"></img> */}

      {/* <div className="user-interface">
            <div onClick={() => setModalShow(true)}>
              <img src={pokebag} alt="pokebag" className="pokebag"></img>
            </div>

            <div className="yellow-screen"></div>
          </div>

          <div className="first-pokemon-button"></div>

          <div className="last-pokemon-button"></div>

          <div className="pokemon-name-pokedex">
            <div className="pokemon-names"></div>

            <div className="pokemon-capacity"></div>

            <p className="pokemon-poids"></p>
            <p className="pokemon-id"></p>
          </div>

          <img src={arrowsNext} alt="arrows-next" className="arrows-next"></img>
          <img
            src={arrowsPrevious}
            alt="arrows-previous"
            className="arrows-previous"></img>
        </div>
      </div> */}

      {/* NOUVEAU POKEDEX */}

      <div className="background-pokedex">
        <div className="upper-screen"></div>
        <div className="upper-screen-content-top"></div>
        <div className="upper-screen-content-bottom"></div>
        <div className="upper-screen-content-big-middle-circle"></div>
        <div className="upper-screen-content-little-middle-circle"></div>
        <div className="upper-screen-content-little-middle-green-circle"></div>

        <div className="between-screen"></div>
        <div className="between-screen-top-shadow"></div>
        <div className="between-screen-bottom-shadow"></div>
        <div className="between-screen-left-square"></div>
        <div className="between-screen-middle-square"></div>
        <div className="between-screen-right-square"></div>

        <div className="bottom-part"></div>
        <div className="bottom-part-background"></div>
        <div className="bottom-part-screen">
          {imagePokedex ? (
            <img
              src={imagePokedex}
              alt="Pokemon"
              className="imagePokemonInPokedex"></img>
          ) : (
            <></>
          )}

          {errorSearch ? <p>{errorSearch}</p> : <></>}
          <p>{pokemonInfo?.name}</p>
          {!pokemonInfo ? (
            <></>
          ) : (
            <>
              <p>{capacity()}</p>
              <p>{secretCapacity()}</p>
              {pokemonInfo?.types.length > 1 ? (
                <div>
                  {pokemonInfo?.types[0].type.name}
                  {pokemonInfo?.types[1].type.name}
                </div>
              ) : (
                <>{pokemonInfo?.types[0].type.name}</>
              )}
            </>
          )}
        </div>

        <div className="bottom-left-part">
          <img
            src={pokebag}
            alt="pokebag"
            className="pokebag"
            onClick={() => {
              setModalShow(true);
            }}></img>
        </div>
        <div className="bottom-left-blue-button"></div>
        <div className="bottom-left-blue-button-light"></div>

        <div className="bottom-right-part"></div>
        <div className="bottom-right-background">
          <img
            src={arrowsNext}
            alt="arrow-next"
            className="arrow-next"
            onClick={next}></img>

          <img
            src={arrowsPrevious}
            alt="arrow-left"
            className="arrow-left"
            onClick={previous}></img>
        </div>
      </div>
      <UseModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        getrandompokemon={getRandomPokemon}
        error={error}
        pokemoninfo={pokemon}
        imagemodal={imageModal}
        coin={coin}
      />
    </div>
  );
};

export default PokedexComponent;
