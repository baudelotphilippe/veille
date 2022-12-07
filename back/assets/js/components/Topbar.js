import React from "react";
import { Link } from "react-router-dom";
import * as AxiosServices from "../services/AxiosService";

function Topbar ({isConnected, deconnected}){


    const logout = () => {
        AxiosServices.logout();
        deconnected(false);
    }

        // const connected=this.state.userConnected
        if (isConnected) {
            return(
                <>
                    <button onClick={logout} className="btn btn-sm btn-danger">logout</button>
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