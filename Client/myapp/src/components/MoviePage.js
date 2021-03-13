import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Main from "./Main";
import { DataAPI } from "../contextAPI/ContextAPI";
import { Form, Card, Modal, Button } from "react-bootstrap";

export default function MoviePage() {
  const [title, setTitle] = useState("");
  const [Genres, setGenres] = useState([]);
  const [Premiered, setPremiered] = useState("");
  const { movies } = DataAPI();
  const history = useHistory();

  useEffect(() => {
    if (!sessionStorage["auth"] && !sessionStorage["token"]) {
      history.push("/");
    }
    if(!sessionStorage["permissions"].includes("view movies"))
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

  useEffect(() => {
    if (movies != undefined) {
      movies.forEach((x) => {
        if (x.MovieName == sessionStorage["MovieNameFromSub"]) {
          setTitle(x.MovieName);
          setGenres(x.MovieGeners);
          setPremiered(x.Premiered);
        }
      });
    }
  }, []);
  return (
    <div>
      <Main />
      {
        <Form style={{ maxWidth: "500px", marginLeft: "220px" }}>
          <Card>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Movie Edit Page</Modal.Title>
              </Modal.Header>
            </Modal.Dialog>
            <Modal.Body>
              <Card.Body>
                <Form.Label>Movie Name</Form.Label>
                <Form.Group id="movieName">
                  <Form.Control type="text" value={title}></Form.Control>
                </Form.Group>
                <Form.Label>Movie Genres</Form.Label>
                <Form.Group id="Genres">
                  <Form.Control
                    type="text"
                    defaultValue={Genres}
                    onChange={(e) => setGenres(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Label>Movie Premiered</Form.Label>
                <Form.Group id="Poster">
                  <Form.Control value={Premiered}></Form.Control>
                </Form.Group>
                <Modal.Footer>
                  <Button
                    // startIcon={<BlockIcon />}
                    onClick={() => history.push("/Subscriptions")}
                  >
                    Back
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
