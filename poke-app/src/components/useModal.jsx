import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import pokedollar from "../assets/poke-dollar.jpg";
import "../styles/useModal.scss";
const UseModal = (props) => {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onhide}
        imagemodal={props.imagemodal}
        pokemoninfo={props.pokemoninfo}
        error={props.error}
        coin={props.coin}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
          <Modal.Title className="modal-title" id="contained-modal-title-vcenter">
            Achetez vos Pokemons ! 
          </Modal.Title>
          <img className="pokedollar" src={pokedollar}></img>
          <p className="pokedollar-number">: {props.coin}</p>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {props.imagemodal && !props.error ? (
            <div>
              <img className="obtain-pokemon" src={props.imagemodal} ></img>
              <p className="obtain-pokemon-description">Wow ! you got {props.pokemoninfo.name}</p>
            </div>
          ) : (
            <p>{props.error}</p>
          )}

          <Button className="button-buy" variant="warning" onClick={props.getrandompokemon}>
            Buy a Pokemon
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UseModal;
