import React, { useEffect, useState } from "react";
import { useAuth } from "../contextAPI/AuthContext";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { DataAPI } from "../contextAPI/ContextAPI";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";
import TheatersIcon from "@material-ui/icons/Theaters";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  root: {
    width: 400,
    marginRight: "60px",
  },
});
export default function Main() {
  const history = useHistory();
  const { setAuth } = useAuth();
  const [usermgmtView, setUsermgmtView] = useState(true);
  const { getMembers, getUsers, getMovies, getPermissions,getAllSubs } = DataAPI();
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  useEffect(() => {
    getUsers();
    getMovies();
    getPermissions();
    getMembers();
    getAllSubs()
  }, []);

  useEffect(() => {
    if (!sessionStorage["auth"] && !sessionStorage["token"]) {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    if (sessionStorage["permissions"].includes("admin")) {
      setUsermgmtView(false);
    }
  }, []);

  const logout = () => {
    setAuth(false);
    sessionStorage["token"] = "";
    sessionStorage["auth"] = "";
    sessionStorage["username"] = "";
    sessionStorage["permissions"] = "";
    sessionStorage["movieId"] = "";
    sessionStorage["per"] = ""
    sessionStorage["MovieNameFromSub"] = ""
    sessionStorage["memberEmail"] = ""
    sessionStorage["subs"] = ""
    history.push("/");
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div
      style={{ marginInline: "280px", marginRight: "8px" }}
      className="text-center"
    >
      <strong style={{ marginRight: "300px" }}>
        Email: {sessionStorage["username"]}  <br/>
      </strong>

      <br />
      <br/>
      <div className="mr-auto" style={{ marginRight: "5px" }}>
        <strong>
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>

            <BottomNavigationAction
              icon={<SupervisedUserCircleIcon />}
              hidden={usermgmtView}
              onClick={() => history.push("/Usermgmt")}

            ></BottomNavigationAction>
            <BottomNavigationAction
              icon={<TheatersIcon />}
              onClick={() => history.push("/Movies")}
            ></BottomNavigationAction>
            <BottomNavigationAction
              icon={<SubscriptionsIcon />}
              onClick={() => history.push("/Subscriptions")}
            ></BottomNavigationAction>
            <BottomNavigationAction
              icon={<ExitToAppIcon />}
              onClick={logout}
            ></BottomNavigationAction>
          </BottomNavigation>
        </strong>
      </div>
      <br/>
    </div>
  );
}
