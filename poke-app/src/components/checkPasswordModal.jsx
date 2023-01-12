import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "../styles/useModal.scss";
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
            className="modal-title"
            id="contained-modal-title-vcenter">
            This room needs a password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <input
            type="text"
            placeholder="Enter password"
            onChange={(e) => props.handlepasswordchange(e)}
          />
          <Button variant="warning" onClick={props.joinroombypassword}>
            Join
          </Button>

          {props.error ? <p>{props.error}</p> : <></>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CheckPasswordModal;
