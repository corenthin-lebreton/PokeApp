import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import "../styles/chooseModal.scss";

const ChoosePokemonToFight = (props) => {
  const [pokemonInfo, setPokemonInfo] = useState();
  const [chosePokemon, setChosePokemon] = useState([]);
  const [lengthPokemonChose, setLengthPokemonChose] = useState(0);
  const [pokemonIndex, setPokemonIndex] = useState(0);
  const [error, setError] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getPokemonInfo = async () => {
      try {
        console.log(props.pokemon);
        console.log(pokemonIndex);
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${props.pokemon[pokemonIndex]}`
        );

        setPokemonInfo(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPokemonInfo();
  }, [pokemonIndex]);

  const choosePokemon = (id, bool) => {
    if (bool) {
      if (lengthPokemonChose === 6) {
        setError("You can't choose more than 6 pokemons");
        return;
      } else {
        setChosePokemon([...chosePokemon, id]);
      }
      setLengthPokemonChose(lengthPokemonChose + 1);
      if (pokemonIndex === props.pokemon.length - 1) {
        return;
      } else {
        setPokemonIndex(pokemonIndex + 1);
      }
    } else {
      if (pokemonIndex === props.pokemon.length - 1) {
        return;
      } else {
        setPokemonIndex(pokemonIndex + 1);
      }
    }
  };

  useEffect(() => {
    if (lengthPokemonChose === 6) {
      const sendPokemonChose = async () => {
        try {
          await axios.post(
            "http://localhost:3000/api/addPokemonForFight",
            {
              pokemonsForFight: chosePokemon,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
        props.setmodalshow(false);
        props.setispokemonsent(true);
      };
      sendPokemonChose();
    }
  }, [lengthPokemonChose]);
  return (
    <Modal
      show={props.show}
      onHide={props.onhide}
      pokemon={props.pokemon}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header>
        <Modal.Title
          className="choose-modal-title"
          id="contained-modal-title-vcenter">
          Choose your pokemon for this combat !
          <div className="text-number-pokemon">
            <Card.Text className="number-pokemon">
              Pokemon choisis : {lengthPokemonChose}/6
            </Card.Text>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="background-modal-choose">
        <img
          className="choose-pokemon-image"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo?.id}.png`}></img>
        <div className="bottom-part-choose-pokemon">
          <div className="text-bottom-part-choose-pokemon">
            Voulez vous choisir ce pokemon :{" "}
          </div>
        </div>
        <div className="top-part-choose-pokemon"></div>
        <div className="pokemon-choose-name">{pokemonInfo?.name}</div>
        <Button
          variant="warning"
          className="button-yes-choose-pokemon"
          onClick={() => choosePokemon(pokemonInfo?.id, true)}>
          oui
        </Button>
        <Button
          variant="warning"
          className="button-no-choose-pokemon"
          onClick={() => choosePokemon(pokemonInfo?.id, false)}>
          non
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning">Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChoosePokemonToFight;
