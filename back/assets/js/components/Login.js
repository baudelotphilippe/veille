import React, { useEffect, useState } from "react";
import * as AxiosServices from "../services/AxiosService";
import { redirect, useNavigate } from "react-router-dom";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Username is required!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(user));
    // console.log("formErrors", formErrors);
    setIsSubmit(true);
  };

  const handleChange = (e) => {
    // e => setUser({...user, username: e.target.value})
    // console.log(e,e.target)
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    // console.log("in useeffect for errors");
    // console.log("formErrors", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      AxiosServices.authenticate(user)
        .then(() => navigate("/"))
        .catch((e) => {
          setError(true);
        });
    }
  }, [formErrors]);

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mb-3">S'identifier</h1>
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
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
        <p>{formErrors.username}</p>
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
        <p>{formErrors.password}</p>
        <input type="submit" value="Envoyer" className="btn btn-primary" />
        {error && (
          <div className="alert alert-danger mt-3">
            Aucun compte ne correspond ...
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
