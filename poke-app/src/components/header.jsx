import React, { useEffect, useState } from "react";
import image from "../assets/logo.png";
import pokedex from "../assets/Pokedex.png";
import pikachu from "../assets/pikachu.png";
import pokebattle from "../assets/pokebattle.png";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";

const Header = ({
  setInputSearch,
  isSearchingOnPokedex,
  search,
  isPokemonInUserPokedex,
}) => {
  const [userName, setUserName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://pokemon-api-6r9p.onrender.com/api/getUserName",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserName(result.data);
    };
    fetchData();
  }, []);
  const logOutUser = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <header className="header">
        <img src={image} alt="logo" className="logo-home"></img>
        <a href="/pokedex">
          <img src={pokedex} alt="pokedex" className="image-pokedex"></img>
        </a>
        <a href="/home">
          <img
            src={pikachu}
            alt="liste-pokemon"
            className="image-pikachu"></img>
        </a>

        {isPokemonInUserPokedex ? (
          <a href="/pokebattle">
            <img
              src={pokebattle}
              alt="battle"
              className="image-pokebattle"></img>
          </a>
        ) : (
          <></>
        )}

        <h1 className="title-user">Connected as : {userName.username}</h1>
        <Navbar bg="none" expand="lg" className="navbar">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <Button className="btn-search" variant="warning" onClick={search}>
              Search
            </Button>
          </Form>

          <Button
            className="btn-logout"
            variant="secondary"
            onClick={logOutUser}>
            Logout
          </Button>
        </Navbar>
      </header>
    </div>
  );
};

export default Header;
