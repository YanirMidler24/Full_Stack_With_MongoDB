import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Card, Modal } from "react-bootstrap";
import Main from "./Main";
import { DataAPI } from "../contextAPI/ContextAPI";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import { useAuth } from "../contextAPI/AuthContext"


export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [Genres, setGenres] = useState([]);
  const [Image, setImage] = useState("");
  const [Premiered, setPremiered] = useState("");
  const { login, auth, token } = useAuth()

  const { addMovieToDB } = DataAPI();
  const history = useHistory();

  useEffect(() => {
    if (!sessionStorage["auth"] && !sessionStorage["token"]) {
        history.push("/");
      }
      if(!sessionStorage["permissions"].includes("create movies"))
      {
       if(sessionStorage["permissions"].includes("admin"))
       {
         return null
       }else{
        if(!sessionStorage["permissions"].includes("admin"))
        {
          history.push("/Main")
        }
       }
      }
  }, []);

  const saveMovie = () => {
    let obj = {
      MovieName: title,
      MovieGeners: Genres,
      MovieImage: Image,
      Premiered: Premiered,
    };
    addMovieToDB(obj);
    history.push("/Movies");
  };
  return (
    <div>
      <Main />
      {
        <Form style={{ maxWidth: "500px", marginLeft: "220px" }}>
          <Card>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Add Movie Page</Modal.Title>
              </Modal.Header>
            </Modal.Dialog>
            <Modal.Body>
              <Card.Body>
                <Form.Label>Movie Name</Form.Label>
                <Form.Group id="movieName">
                  <Form.Control
                    type="text"
                    placeholder="Enter movie name..."
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Label>Movie Genres</Form.Label>
                <Form.Group id="Genres">
                  <Form.Control
                    type="text"
                    placeholder="Enter movie Genres..."
                    onChange={(e) => setGenres(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Label>Movie Premiered</Form.Label>
                <Form.Group id="Genres">
                  <Form.Control
                    type="text"
                    placeholder="Enter movie Premiered Date..."
                    onChange={(e) => setPremiered(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Label>Movie Poster</Form.Label>
                <Form.Group id="Poster">
                  <Form.Control
                    type="name"
                    style={{ width: "200", height: "300" }}
                    placeholder="Enter movie Image..."
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Modal.Footer>
                  <Button startIcon={<SaveIcon />} onClick={() => saveMovie()}>
                    Save
                  </Button>
                  <Button
                    startIcon={<BlockIcon />}
                    onClick={() => history.push("/Movies")}
                  >
                    Cancel
                  </Button>
                </Modal.Footer>
              </Card.Body>
            </Modal.Body>
          </Card>
        </Form>
      }
    </div>
  );
}
