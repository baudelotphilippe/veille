import axios from "axios";

export function authenticate(credentials) {
//   const credentials = {
//     username: "phil",
//     password: "phil",
//   };

//   console.log(infos);
  axios
    .post("http://127.0.0.1:8000/api/login", credentials)
    .then((response) => response.data.token)
    .then((token) => {
      console.log(token);
      // // Je stocke le token dans mon localStorage
      // window.localStorage.setItem("authToken", token);
      // // On prévient Axios qu'on a maintenant un header par défaut sur toutes nos futures requetes HTTP
      setAxiosToken(token);
    });
}

 const setAxiosToken = (token)=>{
  axios.defaults.headers["Authorization"] = "Bearer " + token;
  loadAllUser();
};

const loadAllUser = () => {
    axios.get(`http://127.0.0.1:8000/api/users`).then((res) => {
      const liens = res.data["hydra:member"];
      console.log(liens);
    });
  };

export function loadAll() {
    axios.get(`http://127.0.0.1:8000/api/liens`).then((res) => {
      const liens = res.data["hydra:member"];
      return liens
    });
  };

 export function supprime(id) {
    console.log("delete", id);
    axios.delete(`http://127.0.0.1:8000/api/liens/${id}`).then((res) => {
      this.loadAll();
    });
  };