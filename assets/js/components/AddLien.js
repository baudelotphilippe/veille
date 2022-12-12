import React, { useState } from "react";
import axios from "axios";

const AddLien = ({ addLien }) => {
  const [url, setUrl] = useState("");
  let [addLinkError, setAddLinkError] = useState("");

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAddLinkError("");
    if (url == "") {
      setAddLinkError("Le lien ne peux pas être vide");
    } else if (!(url.startsWith("http://") || url.startsWith("https://"))) {
      setAddLinkError("Le lien doit contenir le protocole http ou https");
    } else {
      axios.post(`https://still-atoll-53814.herokuapp.com/api/liens`, { url }).then((res) => {
        addLien(true);
      });
    }
  };

  return (
    <div className="p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <label>
          URL
          <input
            className="ms-2"
            type="text"
            name="url"
            onChange={handleChange}
            value={url}
            placeholder="http(s)://..."
          />
        </label>
        <button className="btn btn-sm btn-primary ms-2" type="submit">
          Ajouter
        </button>
        {addLinkError && (
          <p className="alert alert-danger mt-3">{addLinkError}</p>
        )}
      </form>
    </div>
  );
};

export default AddLien;
