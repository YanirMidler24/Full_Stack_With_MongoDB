import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./login";
import Main from "./Main";
import { AuthProvider } from "../contextAPI/AuthContext";
import { DataProvider } from "../contextAPI/ContextAPI";
import SignUp from "./SignUp";
import Usermgmt from "./Usermgmt";
import Adduser from "./addUser";
import Users from "./Users";
import Edit from "./EditUser";
import Movies from "./Movies";
import EditMovie from "./EditMovie";
import AddMovie from "./AddMovie";
import Subscriptions from "./Subscriptions";
import EditMember from "./EditMember";
import AddMemebr from "./AddMemebr";
import MoviePage from "./MoviePage";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

export default function HostComp() {
  return (
    <>
      <div
        style={{
          backgroundColor: "silver",
          backgroundImage: `url("https://assets.wallpapersin4k.org/uploads/2017/04/Plain-White-Wallpaper-HD-5.jpg")`,
        }}
      >
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "1000px" }}>
            <h2 style={{ marginLeft: "200px" }}>
              <br />
              Movies - Subscriptions Web Site
              <a
                style={{ marginLeft: "10px" }}
                href="https://github.com/YanirMidler24"
              >
                {<GitHubIcon />}
              </a>{" "}
              <a
                style={{ marginLeft: "10px" }}
                href="https://www.linkedin.com/in/yanir-midler"
              >
                {<LinkedInIcon />}
              </a>
              <br/> 
              <h6>coded by yanir midler</h6>
            </h2>
            <Router>
              <AuthProvider>
                <DataProvider>
                  <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/main" component={Main} />
                    <Route path="/Sign-Up" component={SignUp} />
                    <Route path="/Usermgmt" component={Usermgmt} />
                    <Route path="/add-user" component={Adduser} />
                    <Route path="/Users" component={Users} />
                    <Route path="/Edit-User" component={Edit} />
                    <Route path="/Movies" component={Movies} />
                    <Route path="/AddMovie" component={AddMovie} />
                    <Route path="/Edit-Movie/:name" component={EditMovie} />
                    <Route path="/Subscriptions" component={Subscriptions} />
                    <Route path="/EditMember" component={EditMember} />
                    <Route path="/AddMemebr" component={AddMemebr} />
                    <Route path="/MoviePage" component={MoviePage} />
                  </Switch>
                </DataProvider>
              </AuthProvider>
            </Router>
          </div>
        </div>
      </div>
    </>
  );
}
