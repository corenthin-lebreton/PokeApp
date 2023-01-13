import React from "react";
import { Button, Table } from "react-bootstrap";

const GameRoomTable = ({ roomDisplay, joinRoom }) => {
  return (
    <div>
      <Table striped bordered hover size="sm" variant="light">
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Players</th>
            <th>Private server</th>
            <th>Join</th>
          </tr>
        </thead>
        {roomDisplay.map((room) => {
          return (
            <tbody key={room.id}>
              <tr>
                <td>{room.name}</td>
                <td>{room.currentPlayers.length} / 2</td>
                {room.passwordIsRequired ? <td>True</td> : <td>False</td>}
                <td>
                  <Button onClick={() => joinRoom(room.id)}>Join</Button>
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
