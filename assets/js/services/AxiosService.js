import axios from "axios";
import jwt_decode from "jwt-decode";

export function authenticate(credentials) {
  // console.log("validate");
  return axios
    .post(`${process.env.URL_PROJECT}api/login`, credentials)
    .then((response) => response.data.token)
    .then((token) => {
      localStorage.setItem("authToken", token);
      // console.log(token);
      setAxiosToken(token);
    });
}

export function createUser(credentials) {
  // console.log(credentials)
  return axios
    .post(`${process.env.URL_PROJECT}api/users`, credentials)
    .then((response) => response.data.token)
    .then((token) => {
      localStorage.setItem("authToken", token);
      // setAxiosToken(token);
    });
}

export function infoUser() {
  return axios
  .post(`${process.env.URL_PROJECT}api/me`)
  .then((response)=>response.data.token)
}

export function isConnected() {
  const tokenString = localStorage.getItem("authToken");  
  if (tokenString) {
    const { exp: expiration } = jwt_decode(tokenString);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}

export function logout() {
  localStorage.removeItem("authToken");
}

const setAxiosToken = (token) => {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
};

export function verifTokenExist () {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const { exp: expiration } = jwt_decode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
      console.log("set Token after reload");
    }else{
      console.log("token expired", expiration * 1000);

    }
  }
}

const loadAllUser = () => {
  axios.get(`${process.env.URL_PROJECT}api/users`).then((res) => {
    const liens = res.data["hydra:member"];
    // console.log(liens);
  });
};

export function loadAllTags() {
  return axios.get(`${process.env.URL_PROJECT}api/tags`).then((res) => {
    const tags = res.data["hydra:member"];
    return tags
  });
}

export function loadAll() {
  return axios.get(`${process.env.URL_PROJECT}api/liens`).then((res) => {
    const liens = res.data["hydra:member"];
    // console.log(liens);
    return liens;
  });
}

export function loadByTag(id) {
  return axios.get(`${process.env.URL_PROJECT}${id}/liens`)
  .then( (res)=> {
    return res.data["hydra:member"];
  }

  )
}

export function supprime(id) {
  console.log("delete", id);
  return axios
    .delete(`${process.env.URL_PROJECT}api/liens/${id}`)
    .then((res) => {
      return res;
    });
}
