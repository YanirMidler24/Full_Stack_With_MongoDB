import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Table } from "react-bootstrap";
import Main from "./Main";
import { DataAPI } from "../contextAPI/ContextAPI";
import PersonIcon from "@material-ui/icons/Person";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EventIcon from "@material-ui/icons/Event";
export default function Users() {
  const {
    DelUser,
    usersList,
    setCounter,
    counter,
    setUserForEdit,
    premissionsList,
  } = DataAPI();
  const history = useHistory();

  useEffect(() => {
    if (!sessionStorage["auth"] && !sessionStorage["token"]) {
      history.push("/");
    }
    if (!sessionStorage["permissions"].includes("admin")) {
      history.push("/Main");
    }
  }, []);



  const delUser = async (UserName) => {
    await DelUser(UserName);
    setCounter(counter + 1);
  };

  const editUser = (item) => {
    let arr = [item];


    setUserForEdit(arr);
    sessionStorage["per"] = JSON.stringify(premissionsList.permissions);

    history.push(`/Edit-User`);
  };

  return (
    <>
      <Main />
      <div className="container">
        <h1 className="display-4 text-center">Users Lists</h1>
      </div>

      <br />
      <Link style={{ marginLeft: "410px" }} to="/Usermgmt">
        Back to Users Managemt{" "}
      </Link>
      <br />
      <br />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{<PersonIcon />}</th>
            <th>{<AlternateEmailIcon />}</th>
            <th>session time {<HourglassFullIcon />}</th>
            <th>Created time {<EventIcon />}</th>
            <th>premissions {<PersonIcon />}</th>
            <th>
              {<EditIcon />} Or {<DeleteIcon />}{" "}
            </th>
          </tr>
        </thead>

        <tbody>
          {usersList != undefined
            ? usersList.map((item) => {
                return (
                  <>
                    <tr>
                      <td>{item.FullName}</td>
                      <td>{item.UserName}</td>
                      <td>{item.Session}</td>
                      <td>{item.Created_time}</td>
                      <td>
                        {item.Permissions != undefined ? (
                          item.Permissions.map((x) => {
                            return <li>{x}</li>;
                          })
                        ) : (
                          <li>no permissions</li>
                        )}
                      </td>
                      {item.UserName != "admin@midler.com" ? (
                        <td>
                          <a
                            className="btn text-primary"
                            onClick={() => editUser(item)}
                          >
                            <i class="fa fa-pencil" aria-hidden="true">
                              edit
                            </i>
                          </a>

                          <a
                            className="btn text-primary"
                            onClick={() => delUser(item.UserName)}
                          >
                            <i class="fa fa-pencil" aria-hidden="true">
                              Delete
                            </i>
                          </a>
                        </td>
                      ) : (
                        <td>can't edit or delete</td>
                      )}
                    </tr>
                  </>
                );
              })
            : console.log(null)}
        </tbody>
      </Table>
    </>
  );
}
