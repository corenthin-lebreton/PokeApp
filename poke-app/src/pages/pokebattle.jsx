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

      console.log(result);
      setRoomDisplay(result.data);
    };
    fetchData();
    console.log(roomDisplay);
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

  const addPassword = () => {
    console.log("hello");
    setModalPassword(!modalPassword);
  };

  const joinRoom = () => {
    console.log("Room joined");
  };

  const handlePasswordChange = (e) => {
    setHandlePassword(e.target.value);
  };

  return (
    <div>
      <HeaderBattle />
      {!isCreated ? (
        <>
          <Button onClick={() => setModalShow(true)}>Create a game</Button>
          <GameRoomTable
            roomDisplay={roomDisplay}
            addPassword={addPassword}
            joinRoom={joinRoom}
          />
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
