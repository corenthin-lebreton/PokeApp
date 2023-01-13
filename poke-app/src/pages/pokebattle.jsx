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
  const [error, setError] = useState("");
  const [roomId, setRoomId] = useState();
  const [isJoined, setIsJoined] = useState(false);
  //get all existed room

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3000/api/getRooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result.data);
      setRoomDisplay(result.data);
    };
    fetchData();
  }, [roomInfo]);
  //-----------------------------------------------------------------------------

  //Create a public or private room
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

  //------------------------------------------------------------------------------------

  //verify if its private or public

  const checkboxIsPrivate = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      setIsPrivate(false);
    } else {
      setIsPrivate(true);
    }
  };

  //------------------------------------------------------------------------------------

  //function to join rooms
  const joinRoom = async (id) => {
    console.log(id);
    setRoomId(id);

    const room = roomDisplay.filter((room) => room.id === id);
    console.log(room);

    if (room[0].passwordIsRequired) {
      setModalPassword(!modalPassword);
    } else {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/joinRoom",
          {
            id: id,
            private: false,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res) {
          setIsJoined(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //------------------------------------------------------------------------------------

  //function to handle password input

  const handlePasswordChange = (e) => {
    setHandlePassword(e.target.value);
  };

  //------------------------------------------------------------------------------------

  //function to join room by password only

  const joinRoomByPassword = async () => {
    console.log(handlePassword);
    if (!handlePassword) {
      setError("Password is required");
      console.log(error);
    } else {
      try {
        setModalPassword(false);
        const res = await axios.post(
          "http://localhost:3000/api/joinRoom",
          {
            password: handlePassword,
            id: roomId,
            private: true,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res);
        setIsJoined(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //------------------------------------------------------------------------------------

  return (
    <div>
      <HeaderBattle />
      {!isCreated && !isJoined ? (
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
          joinroombypassword={joinRoomByPassword}
          error={error}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Pokebattle;
