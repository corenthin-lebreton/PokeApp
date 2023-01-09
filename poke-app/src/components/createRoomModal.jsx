import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
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
            Create your room
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a room name"
                onChange={(e) => setRoomName(e.target.value)}
              />
            </Form.Group>

            {props.ischecked ? (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            ) : (
              <></>
            )}
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Private game"
                onChange={props.checkboxisprivate}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => props.createroom(roomName, password)}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateRoomModal;
