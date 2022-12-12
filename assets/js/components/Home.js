import React, { useEffect, useState } from "react";
import Liens from "./Liens";
import AddLien from "./AddLien";
import Topbar from "./Topbar";

import * as AxiosServices from "../services/AxiosService";
import axios from "axios";

const Home = () =>{
  const [liens, setLiens]=useState([]);
  const [isConnected, setIsConnected]= useState(false)

  useEffect( () => {
    AxiosServices.isConnected() ? setIsConnected(true) : setIsConnected(false);
    loadAll();
    }
    ,[]
  )

  const deconnected= ()=>{
    console.log('deco')
    setIsConnected(false)
  }

  const loadAll= ()=> {
    // console.log("inside load all")
    AxiosServices.loadAll()
    .then((data) =>  setLiens( data ))
  }

  const supp = (id) => {
    axios.delete(`https://still-atoll-53814.herokuapp.com/api/liens/${id}`).then((res) => {
      loadAll();
    });
  };

    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
        <h1>Gestionnaire de liens</h1>
        <Topbar isConnected={isConnected} deconnected={deconnected}/>
        </div>
        <article>
          {isConnected&&
            <section>
              <AddLien addLien={loadAll}/>
            </section>
          }
          <section>
            <Liens liens={liens} supp={supp} isConnected={isConnected} />
          </section>
        </article>
      </div>
    );
  }

export default Home;
