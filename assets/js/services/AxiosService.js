import axios from "axios";

export function authenticate(credentials) {
  console.log("validate")
  return axios
    .post("https://still-atoll-53814.herokuapp.com/api/login", credentials)
    .then((response) => response.data.token)
    .then((token) => {
      localStorage.setItem("authToken", token);
      setAxiosToken(token);
    })
}

export function createUser(credentials) {
console.log(credentials)
  return axios
    .post("https://still-atoll-53814.herokuapp.com/api/users", credentials)
    .then((response) => response.data.token)
    .then((token) => {
      localStorage.setItem("authToken", token);
      // setAxiosToken(token);
    })
}

export function isConnected() {
  const tokenString = localStorage.getItem('authToken');
  const userToken = tokenString !== null ? true : false
  return userToken
}

export function logout(){
  localStorage.removeItem("authToken");
}

 const setAxiosToken = (token)=>{
  axios.defaults.headers["Authorization"] = "Bearer " + token;
};

const loadAllUser = () => {
    axios.get(`https://still-atoll-53814.herokuapp.com/api/users`).then((res) => {
      const liens = res.data["hydra:member"];
      console.log(liens);
    });
  };

export function loadAll() {
   return axios.get(`https://still-atoll-53814.herokuapp.com/api/liens`).then((res) => {
      const liens = res.data["hydra:member"];
       return liens
    });
    
  };

 export function supprime(id) {
    console.log("delete", id);
    axios.delete(`https://still-atoll-53814.herokuapp.com/api/liens/${id}`).then((res) => {
      this.loadAll();
    });
  };