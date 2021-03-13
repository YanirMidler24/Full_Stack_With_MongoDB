import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Card, Modal } from "react-bootstrap";
import Main from "./Main";
import { DataAPI } from "../contextAPI/ContextAPI";
import Button from "@material-ui/core/Button"
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import { useAuth } from "../contextAPI/AuthContext"

export default function EditMember() {
  const { members, updateMember } = DataAPI();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (!sessionStorage["auth"] && !sessionStorage["token"]) {
      history.push("/");
    }
    if(!sessionStorage["permissions"].includes("update subscriptions"))
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
    if (members != undefined) {
      members.forEach((x) => {
        if(x._id == sessionStorage["membersID"])
        {
            setName(x.Name);
            setEmail(x.Email);
        }

      });
    }
  }, []);

  const editMember = async () => {
    let obj = {
      id: sessionStorage["membersID"],
      Name: Name,
      Email: Email,
    };
    updateMember(obj);
    sessionStorage["membersID"] = "";
    history.push("/Subscriptions");
  };
  return (
    <div>
      <Main />
      {
        <Form style={{ maxWidth: "500px", marginLeft: "220px" }}>
          <Card>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Member Edit Page</Modal.Title>
              </Modal.Header>
            </Modal.Dialog>
            <Modal.Body>
              <Card.Body>
                <Form.Label>Member Name</Form.Label>
                <Form.Group id="movieName">
                  <Form.Control
                    type="text"
                    defaultValue={Name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Label>Member Email</Form.Label>
                <Form.Group id="Genres">
                  <Form.Control
                    type="text"
                    defaultValue={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Modal.Footer>
                  <Button startIcon={<SaveIcon />} onClick={() => editMember()}>Save</Button>
                  <Button startIcon={<BlockIcon />} onClick={() => history.push("/Subscriptions")}>canel</Button>
                </Modal.Footer>
              </Card.Body>
            </Modal.Body>
          </Card>
        </Form>
      }
    </div>
  );
}
