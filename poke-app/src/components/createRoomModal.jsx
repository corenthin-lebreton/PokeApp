import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "../styles/modal-battle.scss";
const CreateRoomModal = (props) => {
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onhide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Create your room ! 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="background-modal-create">
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                className="form-create"
                type="text"
                placeholder="Enter your room name"
                onChange={(e) => setRoomName(e.target.value)}
              />
            </Form.Group>

            {props.ischecked ? (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Enter a password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            ) : (
              <></>
            )}
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                className="private-button"
                type="checkbox"
                label="Private game"
                onChange={props.checkboxisprivate}
              />
            </Form.Group>
            <Button
              className="create-game"
              variant="warning"
              onClick={() => props.createroom(roomName, password)}>
              Create a game
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="create-game-close" variant="warning" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateRoomModal;
