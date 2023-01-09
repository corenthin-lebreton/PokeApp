import React from "react";
import { Button, Table } from "react-bootstrap";

const GameRoomTable = ({ roomDisplay }) => {
  return (
    <div>
      <Table striped bordered hover size="sm" variant="light">
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Players</th>
            <th>Join</th>
          </tr>
        </thead>
        {roomDisplay.map((room) => {
          return (
            <tbody key={room.id}>
              <tr>
                <td>{room.name.name}</td>
                <td>{room.currentPlayers} / 2</td>
                <td>
                  <Button>Join</Button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default GameRoomTable;
