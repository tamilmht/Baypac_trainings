import axios from 'axios';
const client = axios.create({baseURL: 'http://192.168.5.150:8000/api/'});

client.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
client.defaults.headers.common['Content-Type'] = 'application/json';

export default client;