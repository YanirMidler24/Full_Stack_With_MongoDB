import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Card,  Modal } from "react-bootstrap";
import Main from "./Main";
import { DataAPI } from "../contextAPI/ContextAPI";
import Button from "@material-ui/core/Button"
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
export default function AddMemebr() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");

  const { createMember } = DataAPI();
  const history = useHistory();

  useEffect(() => {
    if (!sessionStorage["auth"] && !sessionStorage["token"]) {
      history.push("/");
    }
    if(!sessionStorage["permissions"].includes("create subscriptions"))
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

  const addMemerFunc = () => {
    let obj = {
      Name: Name,
      Email: Email,
    };
    createMember(obj)
    history.push("/Subscriptions")
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
                <Form.Label>Memeber Name</Form.Label>
                <Form.Group id="movieName">
                  <Form.Control
                    type="text"
                    placeholder="Enter Name..."
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Label>Memeber Email</Form.Label>
                <Form.Group id="Genres">
                  <Form.Control
                    type="text"
                    placeholder="Enter Email..."
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Modal.Footer>
                <Button startIcon={<SaveIcon />} onClick={() => addMemerFunc()}>Save</Button>
                                <Button startIcon={<BlockIcon />}  onClick={() => history.push("/Subscriptions")}>Cancel</Button>

                </Modal.Footer>
              </Card.Body>
            </Modal.Body>
          </Card>
        </Form>
      }
    </div>
  );
}
