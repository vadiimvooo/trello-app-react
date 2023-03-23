import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://trello-clone-api-production.up.railway.app',
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'}
});