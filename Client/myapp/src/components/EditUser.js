import React, { useEffect, useState, useContext } from "react";
import { DataAPI } from "../contextAPI/ContextAPI";
import { Form, Card, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import Main from "./Main";

export default function EditUser() {
  const [premissions, setPremissions] = useState([]);
  const [dataPrem, setDataPrem] = useState([]);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [viewSubAuto, setViewSubAuto] = useState(0);
  const [viewMovAuto, setViewMovAuto] = useState(0);
  const [session, setSession] = useState("40");
  const [usernameToChange, setUsernameToChange] = useState();

  const history = useHistory();
  const { userForEdit, editUser, premissionsList } = DataAPI();

  useEffect(() => {
    if (!sessionStorage["auth"] && !sessionStorage["token"]) {
      history.push("/");
    }
    if (!sessionStorage["permissions"].includes("admin")) {
      {
        history.push("/Main");
      }
    }
  }, []);

  useEffect(() => {
    if (userForEdit != undefined || premissionsList != undefined) {
      let arr = [];

      //todo - change from arr to json
      userForEdit.forEach(x =>
          {
              arr.push(x.Permissions)
              setEmail(x.UserName)
              setUsernameToChange(x.UserName)
              setFname(x.FullName)
              setPremissions(x.Permissions)
          })
      setDataPrem(arr[0])

    }
  }, []);

  const navigate = () => {
    history.push("/Users");
  };
  async function handleSubmit(e) {
    e.preventDefault();
    let obj = {
      FullName: fname,
      UserName: email,
      UsernameToChange: usernameToChange,
      Session: session,
      Permissions: premissions,
    };
    await editUser(obj);
    history.push("/Users");
  }

  const view_movies = (e) => {
    if (e === true) {
      let arr = [...premissions];
      arr.push("view movies");
      setPremissions(arr);
    } else {
      let arr = [...premissions];
      let ARR = arr.filter((x) => x != "view movies");
      setPremissions(ARR);
    }
  };
  const update_movies = (e) => {
    if (e === true) {
      let arr = [...premissions];
      arr.push("update movies");
      setPremissions(arr);
      setViewMovAuto(viewMovAuto + 1);
    } else {
      let arr = [...premissions];
      let ARR = arr.filter((x) => x != "update movies");
      setPremissions(ARR);
      setViewSubAuto(viewSubAuto - 1);
    }
  };
  const delete_movies = (e) => {
    if (e === true) {
      let arr = [...premissions];
      arr.push("delete movies");
      setPremissions(arr);
      setViewMovAuto(viewMovAuto + 1);
    } else {
      let arr = [...premissions];
      let ARR = arr.filter((x) => x != "delete movies");
      setPremissions(ARR);
      setViewSubAuto(viewSubAuto - 1);
    }
  };
  const create_movies = (e) => {
    if (e === true) {
      let arr = [...premissions];
      arr.push("create movies");
      setPremissions(arr);
      setViewMovAuto(viewMovAuto + 1);
    } else {
      let arr = [...premissions];
      let ARR = arr.filter((x) => x != "create movies");
      setPremissions(ARR);
      setViewSubAuto(viewSubAuto - 1);
    }
  };
  const update_subs = (e) => {
    if (e === true) {
      let arr = [...premissions];
      arr.push("update subscriptions");
      setPremissions(arr);
      setViewSubAuto(viewSubAuto + 1);
    } else {
      let arr = [...premissions];
      let ARR = arr.filter((x) => x != "update subscriptions");
      setPremissions(ARR);
      setViewSubAuto(viewSubAuto - 1);
    }
  };
  const view_subs = (e) => {
    if (e === true) {
      let arr = [...premissions];
      arr.push("view subscriptions");
      setPremissions(arr);
    } else {
      let arr = [...premissions];
      let ARR = arr.filter((x) => x != "view subscriptions");
      setPremissions(ARR);
      setViewSubAuto(viewSubAuto - 1);
    }
  };
  const delete_subs = (e) => {
    if (e === true) {
      let arr = [...premissions];
      arr.push("delete subscriptions");
      setPremissions(arr);
      setViewSubAuto(viewSubAuto + 1);
    } else {
      let arr = [...premissions];
      let ARR = arr.filter((x) => x != "delete subscriptions");
      setPremissions(ARR);
      setViewSubAuto(viewSubAuto - 1);
    }
  };
  const create_subs = (e) => {
    if (e === true) {
      let arr = [...premissions];
      arr.push("create subscriptions");
      setPremissions(arr);
      setViewSubAuto(viewSubAuto + 1);
    } else {
      let arr = [...premissions];
      let ARR = arr.filter((x) => x != "create subscriptions");
      setPremissions(ARR);
      setViewSubAuto(viewSubAuto - 1);
    }
  };
  ////////////
  let subFlag;
  if (viewSubAuto === 3) {
    subFlag = true;
    let arr = [...premissions];
    arr.push("view subscriptions");
  } else {
    subFlag = null;
    let arr = [...premissions];
    arr.pop("view subscriptions");
  }

  let movieFlag;
  if (viewMovAuto === 3) {
    movieFlag = true;
  } else {
    movieFlag = null;
  }
  ///////////////

  let viewFlag;
  if (dataPrem.includes("view movies")) {
    viewFlag = true;
  }
  let delFlag;
  if (dataPrem.includes("delete movies")) {
    delFlag = true;
  }
  let createFlag;
  if (dataPrem.includes("create movies")) {
    createFlag = true;
  }
  let updateFlag;
  if (dataPrem.includes("update movies")) {
    updateFlag = true;
  }
  let viewSubFlag;
  if (dataPrem.includes("view subscriptions")) {
    viewSubFlag = true;
  }
  let delSubFlag;
  if (dataPrem.includes("delete subscriptions")) {
    delSubFlag = true;
  }
  let updateSubFlag;
  if (dataPrem.includes("update subscriptions")) {
    updateSubFlag = true;
  }
  let createSubFlag;
  if (dataPrem.includes("create subscriptions")) {
    createSubFlag = true;
  }

  return (
    <>
      <Main />
      {userForEdit != undefined
        ? userForEdit.map((item) => {
            return (
              <>
                <Form
                  style={{ maxWidth: "500px", marginLeft: "220px" }}
                  onSubmit={handleSubmit}
                >
                  <Card>
                    <Card.Body>
                      <Modal.Dialog>
                        <Modal.Header>
                          <Modal.Title>User Edit : {item.UserName}</Modal.Title>
                        </Modal.Header>
                      </Modal.Dialog>
                      <Modal.Body>
                        <Form.Group id="fname">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="name"
                            defaultValue={item.FullName}
                            onChange={(e) => setFname(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group id="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            defaultValue={item.UserName}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group id="session_time_in_min">
                          <Form.Label>session time Out (in min)</Form.Label>
                          <Form.Control
                            defaultValue={item.Session}
                            onChange={(e) => setSession(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group id="timeCreated">
                          <Form.Label>Created Time</Form.Label>
                          <Form.Control value={item.Created_time} />
                        </Form.Group>
                        {premissionsList.permissions.map((x, index) => {
                          return (
                            <Form.Group key={index}>
                              <Form.Check
                                label={x.view_movies}
                                defaultChecked={viewFlag}
                                checked={movieFlag}
                                onChange={(e) => view_movies(e.target.checked)}
                              />
                              <Form.Check
                                label={x.update_movies}
                                defaultChecked={updateFlag}
                                onChange={(e) =>
                                  update_movies(e.target.checked)
                                }
                              />
                              <Form.Check
                                label={x.delete_movies}
                                defaultChecked={delFlag}
                                onChange={(e) =>
                                  delete_movies(e.target.checked)
                                }
                              />
                              <Form.Check
                                label={x.create_movies}
                                defaultChecked={createFlag}
                                onChange={(e) =>
                                  create_movies(e.target.checked)
                                }
                              />
                              <Form.Check
                                label={x.view_subs}
                                defaultChecked={viewSubFlag}
                                checked={subFlag}
                                onChange={(e) => view_subs(e.target.checked)}
                              />
                              <Form.Check
                                label={x.update_subs}
                                defaultChecked={updateSubFlag}
                                onChange={(e) => update_subs(e.target.checked)}
                              />
                              <Form.Check
                                label={x.delete_subs}
                                defaultChecked={delSubFlag}
                                onChange={(e) => delete_subs(e.target.checked)}
                              />
                              <Form.Check
                                label={x.create_subs}
                                defaultChecked={createSubFlag}
                                onChange={(e) => create_subs(e.target.checked)}
                              />
                            </Form.Group>
                          );
                        })}
                        <Modal.Footer>
                          <Button startIcon={<SaveIcon />} type="submit">
                            save
                          </Button>
                          <Button
                            startIcon={<BlockIcon />}
                            type="submit"
                            onClick={navigate}
                          >
                            Cancel
                          </Button>
                        </Modal.Footer>
                      </Modal.Body>
                    </Card.Body>
                  </Card>
                </Form>
              </>
            );
          })
        :  console.log(null)}
    </>
  );
}
