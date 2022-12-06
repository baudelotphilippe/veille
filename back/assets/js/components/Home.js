import React, { useEffect, useState } from "react";
import Liens from "./Liens";
import AddLien from "./AddLien";
import Topbar from "./Topbar";

import * as AxiosServices from "../services/AxiosService";
import axios from "axios";
const Home = () =>{
  const [liens, setLiens]=useState([]);

  useEffect( () => {
    AxiosServices.loadAll()
    .then((data) =>  setLiens( data ))
  },[]
  )

  const supp = (id) => {
    console.log("delete", id);
    axios.delete(`http://127.0.0.1:8000/api/liens/${id}`).then((res) => {
      // this.loadAll();
    });
  };


    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
        <h1>Gestionnaire de liens</h1>
        <Topbar />
        </div>
        <article>
          <section>
            <AddLien liens={liens} />
          </section>
          <section>
            <Liens liens={liens} supp={supp} />
          </section>
        </article>
      </div>
    );
  }

export default Home;
