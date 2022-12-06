import React, { useState, useEffect } from "react";
import * as AxiosServices from "../services/AxiosService";
import { Navigate, redirect, useNavigate } from "react-router-dom";

const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    name: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [errorFromAPI, setErrorFromAPI] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password > 16) {
      errors.password = "Password cannot be more than 16 characters";
    }
    return errors;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(user));
    setIsSubmit(true)
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      AxiosServices.createUser(user)
      .then(() => navigate("/"))
      .catch((e) => {
        setErrorFromAPI(e.response.data["hydra:description"]);
      });
    }
  }, [formErrors]

  )
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mb-3">Créer un compte</h1>
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
        <div className="mb-3">
          <label className="form-label">
            Nom :
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="form-control"
            />{" "}
          </label>
          {formErrors.name && (
            <div className="alert alert-danger mt-1">{formErrors.name}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">
            Email :
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="form-control"
            />{" "}
          </label>
          {formErrors.email && (
            <div className="alert alert-danger mt-1">{formErrors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">
            Username :
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="form-control"
            />{" "}
          </label>
          {formErrors.username && (
            <div className="alert alert-danger mt-1">{formErrors.username}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">
            Password (4 à 16 chars) :
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="form-control"
            />{" "}
          </label>
          {formErrors.password && (
            <div className="alert alert-danger mt-1">{formErrors.password}</div>
          )}
        </div>
        {errorFromAPI && (
          <div className="alert alert-danger mt-3">{errorFromAPI}</div>
        )}
        <input type="submit" value="Créer" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default Register;
