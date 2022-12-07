import React, { useState } from 'react';
import axios from 'axios';

const AddLien=() =>{
  const [url, setUrl]= useState('')


  const handleChange = event => {
    setUrl(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();

    // const url = {
    //   url: url
    // };

    axios.post(`http://127.0.0.1:8000/api/liens`, {url} )
      .then(res => {
        console.log(res);
        console.log(res.data);
        // this.props.loadAll()
      })
  }

    return (
      <div className='p-4 mb-4'>
        <form onSubmit={handleSubmit}>
          <label>
            URL 
            <input className='ms-2' type="text" name="url" onChange={handleChange} value={url} placeholder="http://..."/>
          </label>
          <button className='btn btn-sm btn-primary ms-2' type="submit">Ajouter</button>
        </form>
      </div>
    )
  }


  export default AddLien