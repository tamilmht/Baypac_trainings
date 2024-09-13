import axios from 'axios';
const client = axios.create({baseURL: 'http://127.0.0.1:5000'});

client.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
client.defaults.headers.common['Content-Type'] = 'application/json';

export default client;