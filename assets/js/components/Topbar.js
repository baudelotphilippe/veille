import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as AxiosServices from "../services/AxiosService";

function Topbar ({isConnected, deconnected}){
    const [nameUser,setNameUser]=useState("")

    useEffect(()=>{
        AxiosServices.infoUser()
        .then((response) => {
            setNameUser(response)
            console.log("get name")
        })
        .catch((e) => {
            console.log("error")
        });
    },[])

    const logout = () => {
        AxiosServices.logout();
        deconnected(false);
    }

        // const connected=this.state.userConnected
        if (isConnected) {
            return(
                <>
                    <div className="d-flex">
                        Bonjour {nameUser}
                        <button onClick={logout} className="ms-3 btn btn-sm btn-danger">logout</button>
                    </div>
                </>
            )
        }else {
            return(
                <>
                    <div><Link to="/login">Login</Link> | <Link to="/register">Register</Link> </div>
                </>
            )
        }
}

export default Topbar