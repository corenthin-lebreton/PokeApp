import React from "react";
import { Button, Table } from "react-bootstrap";

const GameRoomTable = ({ roomDisplay, addPassword, joinRoom }) => {
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
          console.log(room.passwordIsRequired);
          return (
            <tbody key={room.id}>
              <tr>
                <td>{room.name.name}</td>
                <td>{room.currentPlayers} / 2</td>
                {room.passwordIsRequired ? <td>True</td> : <td>False</td>}
                <td>
                  <Button
                    onClick={room.passwordIsRequired ? addPassword : joinRoom}>
                    Join
                  </Button>
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
