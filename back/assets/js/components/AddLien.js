import React from 'react';
import axios from 'axios';

export default class AddLien extends React.Component {
  state = {
    url: ''
  }

  handleChange = event => {
    this.setState({ url: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const url = {
      url: this.state.url
    };

    axios.post(`http://127.0.0.1:8000/api/liens`, url )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            URL :
            <input type="text" name="url" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}