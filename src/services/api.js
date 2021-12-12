import axios from "axios";

const api = axios.create({
  // baseURL: "https://ifpi-refeitorio.herokuapp.com/node",
  // baseURL: "http://ifpiparnaiba.edu.br/node/node",
  baseURL: "http://localhost:3334/node",
});

export default api;
