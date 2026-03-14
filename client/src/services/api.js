import axios from 'axios';

const API = axios.create({
  baseURL: "https://resume-builder-i46l.onrender.com/api"
});

export default API;