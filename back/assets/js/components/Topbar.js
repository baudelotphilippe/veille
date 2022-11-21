import React from "react";
import { Link } from "react-router-dom";
import * as AxiosServices from "../services/AxiosService";

export default class Topbar extends React.Component{
    constructor(props){
        super(props);
        this.state={userConnected:false}
    }

    componentDidMount() {
       if (AxiosServices.isConnected()) {
            this.setState({userConnected:true})
        }
    }

    logout = () => {
        AxiosServices.logout()
        this.setState({userConnected:false})
    }
    render() {
        const connected=this.state.userConnected
        if (connected) {
            return(
                <>
                    <button onClick={this.logout} className="btn btn-sm btn-danger">logout</button>
                </>
            )
        }else {
            return(
                <>
                    <Link to="/login">Login</Link>
                </>
            )
        }

    }
}