import React, { useEffect, useState } from "react";
import Liens from "./Liens";
import AddLien from "./AddLien";
import Topbar from "./Topbar";

import * as AxiosServices from "../services/AxiosService";

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

  const suppr = (id) => {
    AxiosServices.supprime(id)
    .then((res) => {
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
            <Liens lesLiens={liens} isConnected={isConnected} supp={suppr} />
          </section>
        </article>
        <footer className="d-flex justify-content-center">
          <a href="https://github.com/baudelotphilippe/veille">
          <i className="fa-brands fa-github"></i>
          </a>
        </footer>
      </div>
    );
  }

export default Home;
