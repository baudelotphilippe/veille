import React, { useState } from "react";
import * as AxiosServices from "../services/AxiosService";
import { redirect, useNavigate } from "react-router-dom";

const Login =(props) =>{

  const [user, setUser]=useState({ username: "", password: ""})
  const [error, setError]=useState(false)
  const navigate=useNavigate()



 const  handleSubmit= (event) => {
  console.log("🚀 ~ file: Login.js ~ line 14 ~ handleSubmit ~ event", event)
  
  event.preventDefault();

    AxiosServices.authenticate(user)
    .then(() => navigate("/"))
    .catch(e => {
      setError(true);
    })
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
              onChange={e => setUser({...user, username: e.target.value})}
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
              onChange={e => setUser({...user, password: e.target.value})}
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
