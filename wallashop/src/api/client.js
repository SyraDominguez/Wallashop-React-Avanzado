import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URLBASE,
});

client.interceptors.response.use(response => response.data, error => {
  if (error.response) {
    return Promise.reject({
      message: error.response.statusText,
      ...error.response,
      ...error.response.data,
    })
  }
  return Promise.reject({ message: error.message });

}
);

export const setAuthorizationHeader = token =>
  (client.defaults.headers.common['Authorization'] = `Bearer ${token}`);

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
}
