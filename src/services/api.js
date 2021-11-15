import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ifpiparnaiba.edu.br/node/node',
});

export default api;