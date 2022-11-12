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
        this.props.loadAll()
      })
  }

  render() {
    return (
      <div className='p-4 mb-4'>
        <form onSubmit={this.handleSubmit}>
          <label>
            URL 
            <input className='ms-2' type="text" name="url" onChange={this.handleChange} placeholder="http://..."/>
          </label>
          <button className='btn btn-sm btn-primary ms-2' type="submit">Ajouter</button>
        </form>
      </div>
    )
  }
}