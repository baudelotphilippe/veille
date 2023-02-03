import React, { useEffect, useState } from "react";
import Liens from "./Liens";
import AddLien from "./AddLien";
import Topbar from "./Topbar";

import * as AxiosServices from "../services/AxiosService";

const Home = () =>{
  const [liens, setLiens]=useState([]);
  const [isConnected, setIsConnected]= useState(false)
  const [tagFilter, setTagFilter]=useState("")
  const [monIdUser, setMonIdUser] = useState("");

  useEffect( () => {
    AxiosServices.isConnected() ? setIsConnected(true) : setIsConnected(false);
    loadAll();
    }
    ,[]
  )

  const deconnected= ()=>{
    setIsConnected(false)
  }
  const infoIdUser= (id)=>{
     setMonIdUser(id)
    console.log("user", id)
  }
  const loadAll= ()=> {
    AxiosServices.loadAll()
    .then((data) =>  setLiens( data ))
  }

  const suppr = (id) => {
    AxiosServices.supprime(id)
    .then((res) => {
      loadAll();
    });
  };

  const filterTag= (tag) => {
    setTagFilter(tag.label);
    const irlTag=(tag['@id']).slice(1);
    AxiosServices.loadByTag(irlTag)
    .then((data)=>setLiens(data))
  }
  const resetTag= () => {
    setTagFilter("");
    loadAll();
  }
    return (
      <div className="container">
        <div className="row">
        <div className="d-flex align-items-center justify-content-between">
        <h1>Gestionnaire de liens</h1>
        <Topbar isConnected={isConnected} deconnected={deconnected} monIdUser={infoIdUser} />
        </div>

        <article>
          {isConnected&&
            <section>
              <AddLien addLien={loadAll}/>
            </section>
          }        
          {
            tagFilter&&
               <div className="col my-2 ms-2">Filtre : <span className="badge bg-info text-dark pointeur" onClick={resetTag}>{tagFilter} X</span></div>
          }
          <section className="mt-3">
            <Liens lesLiens={liens} isConnected={isConnected} idUser={monIdUser} supp={suppr} filter={filterTag}/>
          </section>
        </article>
        <footer className="d-flex justify-content-center">
          <a href="https://github.com/baudelotphilippe/veille">
          <i className="fa-brands fa-github"></i>
          </a>
        </footer>
        </div>
      </div>
    );
  }

export default Home;
