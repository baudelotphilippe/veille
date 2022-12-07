import React, { useState } from 'react';
import axios from 'axios';

const AddLien=({addLien}) =>{
  const [url, setUrl]= useState('')


  const handleChange = event => {
    setUrl(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();

    axios.post(`http://127.0.0.1:8000/api/liens`, {url} )
      .then(res => {
        addLien(true)
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