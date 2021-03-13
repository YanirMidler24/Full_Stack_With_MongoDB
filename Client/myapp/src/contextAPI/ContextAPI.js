import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
const ContextProvider = React.createContext();

export function DataAPI() {
  return useContext(ContextProvider);
}

export function DataProvider({ children }) {
  const [premissionsList, setPremissionsList] = useState();
  const [addUserFlag, setAddUserFlag] = useState();
  const [usersList, setUsersList] = useState();
  const [userForEdit, setUserForEdit] = useState();
  const [movies, setMovies] = useState();
  const [members, setMembers] = useState();
  const [subs, setSubs] = useState();
  const [editMovie, setEditMovie] = useState();
  const [counter, setCounter] = useState(0);

  const DelUser = function (username) {
    let obj = { username: username };
    axios
      .post("http://localhost:9000/api/users/deleteUser", obj)
      .then((resp) => {
        if (resp.data) {
          setCounter(counter + 1);
        }
      });
    axios.post("http://localhost:9000/api/users/getID", obj).then((res) => {
      if (res.data) {
        axios.get("http://localhost:9000/api/users/getUsers").then((resp) => {
          setUsersList(resp.data);
        });
      }
      console.log("User has been delete from DB ? " + " " + res.data);
    });
  };

  const getUsers = function () {
    axios.get("http://localhost:9000/api/users/getUsers").then((resp) => {
      setUsersList(resp.data);
    });
  };

  useEffect(() => {
    axios.get("http://localhost:9000/api/users/getUsers").then((resp) => {
      setUsersList(resp.data);
    });
  }, [counter]);

  const getPermissions = function () {
    axios.get("http://localhost:9000/api/users/permissions").then((resp) => {
      setPremissionsList(resp.data);
    });
  };

  const addUser = function (obj) {
    axios.post("http://localhost:9000/api/users/addUser", obj).then((resp) => {
      setAddUserFlag(resp.data);
      if (addUserFlag) {
        setCounter(counter + 1);
      }
    });
  };

  const editUser = function (obj) {
    axios
      .post("http://localhost:9000/api/users/edit-user", obj)
      .then((resp) => {
        if (resp.data) {
          setCounter(counter + 1);
        }
      });
  };

  /////////////////MOVIES////////////////////////////

  const getMovies = function () {
    axios.get("http://localhost:9000/api/movies").then((resp) => {
      setMovies(resp.data);
    });
  };

  const updateMovie = function (obj) {
    axios
      .post("http://localhost:9000/api/movies/updateMovie", obj)
      .then((resp) => {
        if (resp.data) {
          getMovies();
        }
      });
  };

  const deleteMovie = function (id) {
    axios
      .post(`http://localhost:9000/api/movies/deleteMovie`, id)
      .then((resp) => {
        if (resp.data) {
          getMovies();
        }
      });
  };
  const addMovieToDB = function (obj) {
    axios
      .post(`http://localhost:9000/api/movies/addMovieToDB`, obj)
      .then((resp) => {
        if (resp.data) {
          getMovies();
        }
      });
  };

  ////////////////////Members///////////////////

  const getMembers = function () {
    axios.get("http://localhost:9000/api/members").then((resp) => {
      setMembers(resp.data);
    });
  };

  const updateMember = function (obj) {
    axios
      .post("http://localhost:9000/api/members/updateMember", obj)
      .then((resp) => {
        if (resp.data) {
          getMembers();
        }
      });
  };
  const deleteMember = function (obj) {
    axios
      .post("http://localhost:9000/api/members/deleteMember", obj)
      .then((resp) => {
        if (resp.data) {
          getMembers();
        }
      });
  };

  const createMember = function (obj) {
    axios
      .post("http://localhost:9000/api/members/createMember", obj)
      .then((resp) => {
        if (resp.data) {
          getMembers();
        }
      });
  };

  ////////////////subs////////////////

  const addSubToDB = function (obj) {
    axios.post("http://localhost:9000/api/subs", obj).then((resp) => {
      if (resp.data) {
        setSubs(resp.data);
      }
    });
  };

  const getAllSubs = function () {
    axios.get("http://localhost:9000/api/subs/getUsers").then((resp) => {
      if (resp.data) {
        setSubs(resp.data);
      }
    });
  };

  const value = {
    usersList,
    getUsers,
    premissionsList,
    setCounter,
    counter,
    addUser,
    addUserFlag,
    setAddUserFlag,
    DelUser,
    setUserForEdit,
    userForEdit,
    editUser,
    movies,
    setMovies,
    getMovies,
    getPermissions,
    editMovie,
    setEditMovie,
    updateMovie,
    deleteMovie,
    addMovieToDB,
    getMembers,
    members,
    updateMember,
    deleteMember,
    createMember,
    addSubToDB,
    subs,
    getAllSubs,
  };
  return (
    <ContextProvider.Provider value={value}>
      {children}
    </ContextProvider.Provider>
  );
}
