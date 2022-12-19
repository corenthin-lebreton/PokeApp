import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/homeStyle.scss";
import Header from "../components/header";
import {Container, Row, Col, Card} from 'react-bootstrap'

const Pokedex = () => {
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/pokedex", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        if (res.data.length === 0) {
          setErrorCode(400);
        } else {
          console.log(res);
        }
        setNoPokemon(false);
      })
      .catch((res) => {
        console.log(res);
        setError(res.response.data.message);
        setErrorCode(res.response.status);
      });
  }, []);

  return (
    <div>
      <Header />

      {errorCode === 400 ? (
        <div>
          <img src="https://media.tenor.com/aZuxB-dfJlAAAAAC/pokemon-pocket-monsters.gif"></img>
        </div>
      ) : (
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Img variant="top" src="https://cdn.bulbagarden.net/upload/thumb/2/21/001Bulbasaur.png/250px-001Bulbasaur.png" />
                <Card.Body>
                  <Card.Title>Bulbasaur</Card.Title>
                  <Card.Text>
                    Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.
                    </Card.Text>
                </Card.Body>
                </Card>
            </Col>
          </Row>

        </Container>
      )}

      {error && <h2>{error}</h2>}
    </div>
  );
};

export default Pokedex;
