import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Card, Modal } from "react-bootstrap";
import Main from "./Main";
import { DataAPI } from "../contextAPI/ContextAPI";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
export default function EditMovie() {
  const { editMovie, updateMovie } = DataAPI();
  const [title, setTitle] = useState("");
  const [Genres, setGenres] = useState([]);
  const [Image, setImage] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (!sessionStorage["auth"] && !sessionStorage["token"]) {
      history.push("/");
    }
    if(!sessionStorage["permissions"].includes("update movies"))
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
    if (editMovie != undefined) {
      setTitle(editMovie.mname);
      setGenres(editMovie.mgener);
      setImage(editMovie.mimage);
    }
  }, []);

  const saveEditMovie = async () => {
    let obj = {
      id: sessionStorage["movieId"],
      movieName: title,
      movieGener: Genres,
      movieImage: Image,
    };
    await updateMovie(obj);
    sessionStorage["movieId"] = "";
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
                <Modal.Title>Movie Edit Page</Modal.Title>
              </Modal.Header>
            </Modal.Dialog>
            <Modal.Body>
              <Card.Body>
                <Form.Label>Movie Name</Form.Label>
                <Form.Group id="movieName">
                  <Form.Control
                    type="text"
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Label>Movie Genres</Form.Label>
                <Form.Group id="Genres">
                  <Form.Control
                    type="text"
                    defaultValue={Genres}
                    onChange={(e) => setGenres(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Label>Movie Poster</Form.Label>
                <Form.Group id="Poster">
                  <Form.Control
                    type="name"
                    style={{ width: "200", height: "300" }}
                    defaultValue={Image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Modal.Footer>
                  <Button
                    startIcon={<SaveIcon />}
                    onClick={() => saveEditMovie()}
                  >
                    Save
                  </Button>
                  <Button
                    startIcon={<BlockIcon />}
                    onClick={() => history.push("/Movies")}
                  >
                    canel
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
