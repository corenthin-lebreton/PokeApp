import React, { useEffect, useState } from "react";
import arrowsNext from "../assets/arrow-right.png";
import arrowsPrevious from "../assets/arrow-left.png";
import pokebag from "../assets/pokebag.png";
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
          <p className="pokemon-name-pokedex">{pokemonInfo?.name}</p>
          {!pokemonInfo ? (
            <></>
            ) : (
              <>
              <p className="pokemon-capacity-pokedex"> Capacité : {capacity()}</p>
              <h1 className="pokemon-id-pokedex">No. {pokemonInfo?.id}</h1>
              <p className="pokemon-height-pokedex">Hauteur: {pokemonInfo?.height} </p>
              <p className="pokemon-width-pokedex">Poids: {pokemonInfo?.weight}</p>
              <p className="pokemon-secret-capacity-pokedex">Capacité secrète : {secretCapacity()}</p>
              {pokemonInfo?.types.length > 1 ? (
                <div>
              <div className="pokemon-type-1-pokedex">
                Types : {pokemonInfo?.types[0].type.name} - {pokemonInfo?.types[1].type.name}
              </div>
              {/* <div className="pokemon-type-2-pokedex">
                {pokemonInfo?.types[1].type.name}
              </div> */}
                </div>
              ) : (
                <p className="pokemon-solo-type-pokedex"> Types : {pokemonInfo?.types[0].type.name}</p>
                )}
            </>
          )}

              
          <div className="ligne-separation-1"></div>
          <div className="ligne-separation-2"></div>
          <div className="ligne-separation-3"></div>
          <div className="ligne-separation-4"></div>
          <div className="ligne-separation-5"></div>


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
