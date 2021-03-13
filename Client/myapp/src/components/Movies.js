import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { DataAPI } from "../contextAPI/ContextAPI";
import Main from "./Main";
import "bootstrap/js/src/collapse.js";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import MovieIcon from "@material-ui/icons/Movie";
import TitleIcon from "@material-ui/icons/Title";
import EventIcon from "@material-ui/icons/Event";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";

export default function Movies() {
  const {
    movies,
    getMovies,
    setEditMovie,
    deleteMovie,
    addSubToDB,
    subs,
  } = DataAPI();
  const [clicksearchValue, setClicksearchValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [updateButton, setUpdateButton] = useState(true);
  const [deleteButton, setDeleteButton] = useState(true);
  const [createButton, setCreateButton] = useState(true);
  const [viewSub, setViewSub] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (!sessionStorage["auth"] && !sessionStorage["token"]) {
      history.push("/");
    }
    if (
      sessionStorage["permissions"].includes("view movies") ||
      sessionStorage["permissions"].includes("admin")
    ) {
      if (sessionStorage["permissions"] == "admin") {
        setUpdateButton(false);
        setCreateButton(false);
        setDeleteButton(false);
      }
    } else if (
      !sessionStorage["permissions"].includes("view movies") ||
      !sessionStorage["permissions"].includes("admin")
    ) {
      history.push("/Main");
    }
    if (sessionStorage["permissions"].includes("update movies")) {
      setUpdateButton(false);
    }
    if (sessionStorage["permissions"].includes("create movies")) {
      setCreateButton(false);
    }
    if (sessionStorage["permissions"].includes("delete movies")) {
      setDeleteButton(false);
    }
    if (sessionStorage["permissions"].includes("view subscriptions")) {
      setViewSub(false);
    }
  }, []);

  const searchValueInMovies = () => {
    let value = searchValue;
    setClicksearchValue(value);
  };

  const navigatEditMovies = (id, name, gener, image) => {
    sessionStorage["movieId"] = id;
    let json = {
      mname: name,
      mgener: gener,
      mimage: image,
    };
    setEditMovie(json);
    history.push(`/Edit-Movie/${name}`);
  };
  const deleteMOovie = (id) => {
    let obj = { id: id };
    deleteMovie(obj);
    getMovies();
  };

  const subscribe = (name, Premiered) => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    let obj = {
      subId: sessionStorage["membersID"],
      Name: sessionStorage["memberName"],
      Email: sessionStorage["memberEmail"],
      MovieName: name,
      Premiered: Premiered,
      Date: dateTime,
    };
    addSubToDB(obj);

    history.push("/Subscriptions");
  };

  return (
    <div>
      <Main />
      <div className="w-100 text-center mt-2">
        <Button
          startIcon={<HomeIcon />}
          style={{ border: "2px solid black" }}
          onClick={() => history.push("/Main")}
        >
          Back to home page
        </Button>
      </div>
      <br />
      <div className="w-100 text-center mt-2">
        <Button
          hidden={createButton}
          variant="outline-dark"
          startIcon={<AddIcon />}
          style={{ marginRight: "30px" }}
          onClick={() => history.push("/AddMovie")}
          type="submit"
          style={{ marginRight: "50px" }}
        >
          Add Movie
        </Button>
      </div>

      <div style={{ marginRight: "200px" }}>
        <TextField
          id="standard-basic"
          label="Search A Movie"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          startIcon={<SearchIcon />}
          value="find"
          onClick={searchValueInMovies}
        ></Button>
      </div>
      <br />
      <Table striped bordered hover variant="hover">
        <thead width="20%">
          <tr>
            <th style={{ backgroundColor: "silver" }}>
              {<CropOriginalIcon />} Image
            </th>
            <th style={{ backgroundColor: "silver" }}>{<TitleIcon />}itle</th>
            <th style={{ backgroundColor: "silver" }}>
              {<EventIcon />}Premiered
            </th>
            <th style={{ backgroundColor: "silver" }}>
              {<MovieIcon />} Genres
            </th>
            <th style={{ backgroundColor: "silver" }}>
              member_that_subscribed_to_this_Movie
            </th>
            <th style={{ backgroundColor: "silver" }}> User Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies != undefined
            ? movies.map((item, index) => {
                if (
                  item.MovieName.includes(clicksearchValue) ||
                  searchValue == null
                ) {
                  return (
                    <>
                      <tr>
                        <td>
                          <img
                            width="200"
                            height="300"
                            src={item.MovieImage}
                            alt="this is an movie poster"
                          ></img>
                        </td>
                        <td>{item.MovieName}</td>
                        <td>{item.Premiered} </td>
                        <td>{item.MovieGeners + ","}</td>
                        <td>
                          <ul>
                            {subs != undefined
                              ? subs.map((x) => {
                                  return x.Movies.map((movie) => {
                                    if (movie == item.MovieName) {
                                      return (
                                        <li  hidden={viewSub} className="font-weight-bold">
                                          <Link 
                                            onClick={() =>
                                              history.push("/Subscriptions")
                                            }
                                          >
                                            {x.Name}
                                          </Link>{" "}
                                          <br />
                                          {x.Date}
                                        </li>
                                      );
                                    }
                                  });
                                })
                              : console.log(null)}
                          </ul>
                        </td>
                        <td>
                          <Button
                            startIcon={<SubscriptionsIcon />}
                            color="primary"
                            onClick={() =>
                              subscribe(item.MovieName, item.Premiered)
                            }
                          >
                            SUB
                          </Button>
                          <br />
                          <br />
                          <Button
                            startIcon={<EditIcon />}
                            hidden={updateButton}
                            onClick={() =>
                              navigatEditMovies(
                                item._id,
                                item.MovieName,
                                item.MovieGeners,
                                item.MovieImage
                              )
                            }
                            color="primary"
                          >
                            edit
                          </Button>
                          <br />
                          <br />
                          <Button
                            hidden={deleteButton}
                            color="primary"
                            startIcon={<DeleteIcon />}
                            onClick={() => deleteMOovie(item._id)}
                          >
                            delete
                          </Button>
                          <br />
                          <br />
                          <br />
                        </td>
                      </tr>
                    </>
                  );
                }
              })
            : console.log(null)}
          <br />
          <Link style={{ marginLeft: "300px" }} to="/">
            Back to home page{" "}
          </Link>
        </tbody>
      </Table>
    </div>
  );
}
