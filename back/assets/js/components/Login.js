import React from "react";
import * as AxiosServices from "../services/AxiosService";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    AxiosServices.authenticate(this.state)
    event.preventDefault();
  }

  render() {
    return (
      <>
        <h1>S'identifier</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Login :
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />{" "}
          </label>
          <label>
            Password :
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />{" "}
          </label>
          <input type="submit" value="Envoyer" />
        </form>
      </>
    );
  }
}

export default Login;
