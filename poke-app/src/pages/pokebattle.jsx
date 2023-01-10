import React, { useEffect, useState } from "react";
import HeaderBattle from "../components/headerBattle";
import { Button } from "react-bootstrap";
import CreateRoomModal from "../components/createRoomModal";
import GameRoomTable from "../components/gameRoomTable";
import axios from "axios";
import BattleArena from "../components/battleArena";
import CheckPasswordModal from "../components/checkPasswordModal";
const Pokebattle = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const token = localStorage.getItem("token");
  const [roomInfo, setRoomInfo] = useState();
  const [isCreated, setIsCreated] = useState(false);
  const [roomDisplay, setRoomDisplay] = useState([]);
  const [handlePassword, setHandlePassword] = useState("");
  const [modalPassword, setModalPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3000/api/getRooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoomDisplay(result.data);
    };
    fetchData();
  }, [roomInfo]);

  const checkboxIsPrivate = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      setIsPrivate(false);
    } else {
      setIsPrivate(true);
    }
  };

  const createRoomGame = async (name, password) => {
    if (isPrivate) {
      const res = await axios.post(
        "http://localhost:3000/api/createRoom",
        {
          roomName: name,
          isPrivate: isPrivate,
          password: password,
        },

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRoomInfo(res);

      setModalShow(false);

      setIsCreated(true);
    } else {
      const res = await axios.post(
        "http://localhost:3000/api/createRoom",
        {
          roomName: name,
          isPrivate: isPrivate,
        },

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRoomInfo(res);
      setIsCreated(true);
      setModalShow(false);
    }
  };

  const joinRoom = (id) => {
    console.log(id);

    const room = roomDisplay.filter((room) => room.id === id);
    console.log(room);

    if (room[0].passwordIsRequired) {
      console.log(true);
      setModalPassword(!modalPassword);
    } else {
      console.log(false);
    }
  };

  const handlePasswordChange = (e) => {
    setHandlePassword(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <HeaderBattle />
      {!isCreated ? (
        <>
          <Button onClick={() => setModalShow(true)}>Create a game</Button>
          <GameRoomTable roomDisplay={roomDisplay} joinRoom={joinRoom} />
        </>
      ) : (
        <BattleArena />
      )}

      <CreateRoomModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        ischecked={isChecked}
        checkboxisprivate={checkboxIsPrivate}
        createroom={createRoomGame}
      />

      {modalPassword ? (
        <CheckPasswordModal
          show={modalPassword}
          onHide={() => setModalPassword(false)}
          handlepasswordchange={handlePasswordChange}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Pokebattle;
