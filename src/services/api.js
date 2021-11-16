import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ifpiparnaiba.edu.br/node/node'
  // baseURL: 'http://localhost:3333/'
});

export default api;