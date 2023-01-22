import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as AxiosServices from "../services/AxiosService";
import "@popperjs/core";
import useModal from "./useModal";
import Modal from "./modal";

function Topbar({ isConnected, deconnected }) {
  const { isShowing: isLoginFormShowed, toggle: toggleUpdateProfil } =
    useModal();
  const {
    isShowing: isRegistrationFormShowed,
    toggle: toggleUpdatePassword,
  } = useModal();

  const [nameUser, setNameUser] = useState("");
  const [idUser, setIdUser] = useState("");

  const [newNameUser, setNewNameUser] = useState(nameUser);
  const [newMdp, setNewMdp]=useState("")
  const [errorFromAPI, setErrorFromAPI]= useState("")
  
  useEffect(() => {
    AxiosServices.infoUser()
      .then((response) => {
        setNameUser(response.name);
        setIdUser(response.id);
      })
      .catch((e) => {
        console.log("error");
      });
  }, []);

  const logout = () => {
    AxiosServices.logout();
    deconnected(false);
  };
  const updateProfil = (e) => {
    e.preventDefault();
    if (!newNameUser) {
      setErrorFromAPI("Profil is required!");
    }else {
      AxiosServices.updateUser(idUser, {name:newNameUser})
      .then(() => {
        setNameUser(newNameUser);
        toggleUpdateProfil();
      })
      .catch((e) =>{
        setErrorFromAPI(e.response.data["hydra:description"])
      }
      )
    }
  };

  const updateMdp = (e) => {
    e.preventDefault();
    if (!newMdp) {
      setErrorFromAPI("Password is required!");
    } else if (newMdp.length < 4) {
      setErrorFromAPI("Password must be more than 4 characters");
    } else if (newMdp.length > 16) {
      setErrorFromAPI("Password cannot be more than 16 characters");
    } else {
      AxiosServices.updateUser(idUser, {password:newMdp})
      .then(() =>toggleUpdatePassword())
      .catch((e) =>{
        setErrorFromAPI(e.response.data["hydra:description"])
      }
      )
    }
  };
  const handleChangeName=(e)=>{
    setNewNameUser(e.target.value)
  }
  const handleChangePwd=(e)=>{
    setNewMdp(e.target.value)
  }
  // const connected=this.state.userConnected
  if (isConnected) {
    return (
      <>
        <div className="d-flex align-items-center">
          Bonjour {nameUser}
          <div className="dropdown ms-3">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-gear"></i>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a
                className="dropdown-item"
                href="#"
                onClick={toggleUpdateProfil}
              >
                mettre à jour profil
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={toggleUpdatePassword}
              >
                mettre à jour mdp
              </a>
              <a className="dropdown-item" onClick={logout} href="#">
                logout
              </a>
            </div>
          </div>
        </div>
        <Modal
          isShowing={isLoginFormShowed}
          hide={toggleUpdateProfil}
          title="Mettre à jour son profil"
        >
          <form onSubmit={updateProfil}>
            <div className="form-group">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Profil"
                name="profilName"
                value={newNameUser}
                onChange={handleChangeName}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Modifier"
                className="btn btn-primary"
              />
            </div>
            {errorFromAPI && (
              <div className="alert alert-danger mt-3">{errorFromAPI}</div>
            )}
          </form>
        </Modal>
        <Modal
          isShowing={isRegistrationFormShowed}
          hide={toggleUpdatePassword}
          title="Mettre à jour le mot de passe"
        >
          <form onSubmit={updateMdp}>
            <div className="form-group">
              <input type="password" placeholder="Password" 
                className="form-control mb-2"
                onChange={handleChangePwd}
                value={newMdp}
                />
            </div>
            <div className="form-group">
              <input type="submit" value="Enregistrer" 
                className="btn btn-primary"
                />
            </div>
            {errorFromAPI && (
              <div className="alert alert-danger mt-3">{errorFromAPI}</div>
            )}
          </form>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <div>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>{" "}
        </div>
      </>
    );
  }
}

export default Topbar;
