import React, { useState, useEffect } from "react";
import axios from "axios";
import { Multiselect } from "react-widgets/cjs";
import "react-widgets/styles.css";
import * as AxiosServices from "../services/AxiosService";

const AddLien = ({ addLien }) => {
  const [url, setUrl] = useState("");
  let [addLinkError, setAddLinkError] = useState("");

  const [tagValue, setTagValue] = useState([]);
  const [tag, setTag] = useState([]);

  useEffect(() => {
    AxiosServices.loadAllTags().then((tags) => {
      tags.forEach((element, i) => {
        setTag((tag) => [...tag, { label: element.label, id: i }]);
      });
    });
  }, []);

  function handleCreateTag(name) {
    let newOption = { label: name, id: tag.length + 1 };
    setTagValue([...tagValue, newOption]);
    setTag((data) => [newOption, ...data]);
  }

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAddLinkError("");
    if (url == "") {
      setAddLinkError("Le lien ne peut pas être vide");
    } else if (!(url.startsWith("http://") || url.startsWith("https://"))) {
      setAddLinkError("Le lien doit contenir le protocole http ou https");
    } else {
      //vire ids
      const newTags = tagValue.map(({ id, ...rest }) => {
        return rest;
      });
      axios
        .post(`${process.env.URL_PROJECT}api/liens`, {
          url: url,
          tags: newTags,
        })
        .then((res) => {
          addLien(true);
        });

      setUrl("");
      setTagValue([]);
    }
  };

  return (
    <div className="p-4 mb-4">
      <form onSubmit={handleSubmit} className="d-flex align-items-center">
        <label>
          URL
          </label>
          <input
            className="ms-2 form-control"
            type="text"
            name="url"
            onChange={handleChange}
            value={url}
            placeholder="http(s)://..."
          />
        <div className="mx-3 my-2 d-flex align-items-center col-3">
          <span className="me-1">Tags</span>
          <div className="flex-grow-1"><Multiselect
            allowCreate={true}
            textField="label"
            data={tag}
            value={tagValue}
            onCreate={handleCreateTag}
            onChange={setTagValue}
          />
          </div>
        </div>
        <button className="btn btn-sm btn-primary ms-2" type="submit">
          Ajouter
        </button>
      </form>
      {addLinkError && (
          <p className="alert alert-danger mt-3">{addLinkError}</p>
        )}
    </div>
  );
};

export default AddLien;
