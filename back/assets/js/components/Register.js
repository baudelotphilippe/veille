import React from "react";
import * as AxiosServices from "../services/AxiosService";
import { redirect, useNavigate } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", email:"", name:"",errors:false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const infos = await AxiosServices.createUser(this.state);
    if (infos) {
      console.log("redirect")
      // return redirect("http://127.0.0.1:8000/");
      // history.replace("/");
      
      // navigate("/"); // genère erreur
      // window.location.reload()

      // return <Navigate to="/" replace={true} />;
      window.location.href="/" //marche mais génère une erreur dans la console ...

    } else {
      this.setState({
        ...this.state,
        errors: true,
      });
    }
  }

  render() {
    return (
      <div className="container d-flex flex-column align-items-center">
        <h1 className="mb-3">Créer un compte</h1>
        <form onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Nom :
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              className="form-control"
            />{" "}
          </label>
          </div>
          <div className="mb-3">
          <label className="form-label">
            Email :
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              className="form-control"
            />{" "}
          </label>
          </div>
          <div className="mb-3">
          <label className="form-label">
            Login :
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
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
              value={this.state.password}
              onChange={this.handleChange}
              className="form-control"
            />{" "}
          </label>
          </div>
          <input type="submit" value="Créer" class="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default Register;
