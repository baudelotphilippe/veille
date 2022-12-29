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
      errors.username = "Un nom d'utilisateur est requis";
    }

    if (!values.email) {
      errors.email = "Un email est requis";
    } else if (!regex.test(values.email)) {
      errors.email = "Ce format n'est pas valide";
    }
    if (!values.password) {
      errors.password = "Un mot de passe est requis";
    } else if (values.password < 4) {
      errors.password = "Le mot de passe doit comporter au moins 4 caractères";
    } else if (values.password > 16) {
      errors.password = "Le mot de passe ne doit pas dépasser 16 caractères";
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
        const messageErreur=e.response.data["hydra:description"];
        if (messageErreur.indexOf("Key (email)=")!==-1) {
          setErrorFromAPI("Cet email est déjà utilisé");
        }else {
        setErrorFromAPI(messageErreur);
      }
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
            Email
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
            Nom d'utilisateur
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
            Mot de passe (de 4 à 16 caractères)
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
