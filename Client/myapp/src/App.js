import HostComp from "./components/hostComp"
import React from 'react'
import axios from "axios"
export default function App() {

    axios.interceptors.request.use(req => {
      req.headers.authorization =  sessionStorage.getItem("token");
      return req;
  });

  axios.interceptors.response.use(res => {
      return res;
    });

  return (
    <div>
      <HostComp />


    </div>
  )
}
