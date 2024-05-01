import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URLBASE,
});

client.interceptors.response.use(response => response.data);