import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "../styles/modal-battle.scss";
const CheckPasswordModal = (props) => {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onhide}
        error={props.error}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
          <Modal.Title
            className="modal-private-title"
            id="contained-modal-title-vcenter">
            Let the battle begin !
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-private-room">
          <input
            className="Join-private-game"
            type="text"
            placeholder="Enter the password"
            onChange={(e) => props.handlepasswordchange(e)}
          />
          <Button className="button-join-private" variant="warning">Join</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button-close-private" variant="warning" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CheckPasswordModal;
