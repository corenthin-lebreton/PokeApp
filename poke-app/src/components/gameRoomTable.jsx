import React from "react";
import { Button, Table } from "react-bootstrap";
import "../styles/lobby-battle.scss"

const GameRoomTable = ({ roomDisplay, joinRoom }) => {
  return (
    <div className="tableau-room">
      <Table  striped bordered hover size="sm" variant="light">
        <thead>
          <tr>
            <th>Room name</th>
            <th>Players</th>
            <th>Private room</th>
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
