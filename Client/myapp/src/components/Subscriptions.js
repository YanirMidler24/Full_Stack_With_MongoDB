import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import Main from "./Main";
import { DataAPI } from "../contextAPI/ContextAPI";
import Button from "@material-ui/core/Button";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

export default function Subscriptions() {
  const { members, getMembers, deleteMember, subs } = DataAPI();
  const [sub, setSub] = useState();
  const history = useHistory();
  const [updateButton, setUpdateButton] = useState(true);
  const [deleteButton, setDeleteButton] = useState(true);
  const [createButton, setCreateButton] = useState(true);
  const [viewMovies, setViewMovies] = useState(true);

  useEffect(() => {
    if (!sessionStorage["auth"] && !sessionStorage["token"]) {
      history.push("/");
    }

    if (
      sessionStorage["permissions"].includes("view subscriptions") ||
      sessionStorage["permissions"].includes("admin")
    ) {
      if (sessionStorage["permissions"] == "admin") {
        setUpdateButton(false);
        setCreateButton(false);
        setDeleteButton(false);
        setViewMovies(false);
      }
    } else if (
      !sessionStorage["permissions"].includes("view subscriptions") ||
      !sessionStorage["permissions"].includes("admin")
    ) {
      history.push("/Main");
    }

    if (sessionStorage["permissions"].includes("update subscriptions")) {
      setUpdateButton(false);
    }
    if (sessionStorage["permissions"].includes("create subscriptions")) {
      setCreateButton(false);
    }
    if (sessionStorage["permissions"].includes("delete subscriptions")) {
      setDeleteButton(false);
    }
    if (sessionStorage["permissions"].includes("view movies")) {
      setViewMovies(false);
    }
  }, []);

  useEffect(() => {
    if (subs != undefined) {
      setSub(subs);
    }
  }, []);
  const editMember = (id) => {
    sessionStorage["membersID"] = id;
    history.push("/EditMember");
  };

  const deleteMemberFunc = (id) => {
    let obj = { id: id };
    deleteMember(obj);
    getMembers();
    sessionStorage["membersID"] = "";
  };
  const navigate = (id, name, email) => {
    sessionStorage["membersID"] = id;
    sessionStorage["subs"] = true;
    sessionStorage["memberName"] = name;
    sessionStorage["memberEmail"] = email;
    history.push("/Movies");
  };

  const navigateToMovePage = (name) => {
    sessionStorage["MovieNameFromSub"] = name;
    history.push("/MoviePage");
  };
  return (
    <>
      <Main />
      <div className="w-100 text-center mt-2">
        <h2 className="text-center mb-4">Subscriptions List</h2>
        <Button
          variant="outline-dark"
          style={{ marginRight: "120px" }}
          type="submit"
          style={{ marginLeft: "10px" }}
          onClick={() => history.push("/AddMemebr")}
        >
          Add Members
        </Button>
        <Button
          hidden={createButton}
          variant="outline-dark"
          style={{ marginLeft: "880px" }}
          onClick={() => history.push("/Main")}
        >
          Back To Main
        </Button>
        <br />
        <br />

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>movies that member had subscribed</th>
              <th>subscribe Button</th>
              <th>User Actions</th>
            </tr>
          </thead>
          <tbody>
            {members != undefined
              ? members.map((x) => {
                  let name = x.Name;
                  let arr = [];

                  return (
                    <>
                      <tr>
                        <td>{x.Name}</td>
                        <td>{x.Email}</td>

                        <td>
                          {subs != undefined
                            ? subs.map((x) => {
                                if (x.Name == name) {
                                  return (
                                    <p className="font-weight-bold">
                                      <br />
                                      {x.Movies.map((y) => {
                                        return (
                                          <ul>
                                            <li>
                                              <Link
                                                onClick={() =>
                                                  navigateToMovePage(y)
                                                }
                                              >
                                                {y}
                                              </Link>{" "}
                                              <br />,{x.Date}{" "}
                                            </li>
                                          </ul>
                                        );
                                      })}
                                    </p>
                                  );
                                }
                              })
                            : console.log(null)}
                        </td>
                        <td>
                          <Button
                            hidden={viewMovies}
                            startIcon={<LocalMoviesIcon />}
                            onClick={() => navigate(x._id, x.Name, x.Email)}
                            color="secondary"
                          >
                            Movies List To Subscribe
                          </Button>
                        </td>
                        <td>
                          <Button
                            hidden={updateButton}
                            startIcon={<EditIcon />}
                            onClick={() => editMember(x._id)}
                            color="secondary"
                          ></Button>
                          <Button
                            hidden={deleteButton}
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={() => deleteMemberFunc(x._id)}
                          ></Button>
                        </td>
                      </tr>
                    </>
                  );
                })
              : console.log(null)}
          </tbody>
        </Table>
      </div>
    </>
  );
}
