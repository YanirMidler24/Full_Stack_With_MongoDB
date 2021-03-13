import React, { useEffect} from 'react'
import {  useHistory } from "react-router-dom"
// import { Button } from "react-bootstrap"
import Main from "./Main"
import {DataAPI} from "../contextAPI/ContextAPI"
import Button from "@material-ui/core/Button"
import UserIcon from "@material-ui/icons/Save"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FilterListIcon from '@material-ui/icons/FilterList';
export default function Usermgmt() {
    const history = useHistory()

    const {premissionsList} = DataAPI()
    


    useEffect(() =>
    {
        if(!sessionStorage["auth"] && !sessionStorage["token"])
        {
            history.push("/")
        }
        if (!sessionStorage["permissions"].includes("admin")) {
            history.push("/Main")
        }
    },[])


    const addNav= () =>
    {
        sessionStorage["per"] =  JSON.stringify(premissionsList.permissions)
        history.push("/add-user")

    }

    const navigate = () => {
        history.push("/Users")
    }
    return (
        <>
        <Main/>
        <div style={{marginBottom : "400px"}} >
            <h5 style={{ marginLeft: "425px" }}>User Managemt</h5>
            <br />
            <div className="w-100 text-center mt-2">
                
                <Button  startIcon={<AddCircleIcon />} variant="contained"  color="primary" style={{ border: "2px solid black", marginLeft: "5.5px" }} onClick={addNav}>add new user</Button>
                <Button startIcon={<FilterListIcon />} variant="contained" color="primary" style={{ border: "2px solid black", marginLeft: "5.5px" }} onClick={navigate} >Users List</Button>
            </div>
            <br />
            

        </div>
        </>
    )
}
