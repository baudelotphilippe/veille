import React, { useState } from "react";
import * as AxiosServices from "../services/AxiosService";
import { redirect, useNavigate } from "react-router-dom";

const Login =(props) =>{

  const [user, setUser]=useState({ username: "", password: ""})
  const [error, setError]=useState(false)
  const navigate=useNavigate()



 const  handleSubmit= (event) => {  
  event.preventDefault();

    AxiosServices.authenticate(user)
    .then(() => navigate("/"))
    .catch(e => {
      setError(true);
    })
  }

  const handleChange = (e) =>{
    // e => setUser({...user, username: e.target.value})
    console.log(e,e.target)
    const {name, value}=e.target
    setUser({...user, [name]:value })
  }

    return (
      <div className="container d-flex flex-column align-items-center">
        <h1 className="mb-3">S'identifier</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <label className="form-label">
            Login :
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="form-control"
            />{" "}
          </label>
          </div>
          <div className="mb-3">
          <label className="form-label">
            Password :
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="form-control"
            />{" "}
          </label>
          </div>
          <input type="submit" value="Envoyer" className="btn btn-primary" />
          {error&&
            <div className="alert alert-danger mt-3">Aucun compte ne correspond ...</div>
          }
        </form>
      </div>
    );
  }

export default Login;
