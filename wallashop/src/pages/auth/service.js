import { client, removeAuthorizationHeader, setAuthorizationHeader } from "../../api/client";
import storage from "../../storage";

export const login = async credentials => {
  const response = await client.post('api/auth/login', credentials);
  console.log("API Login Response:", response); // Agregar un console.log para depurar la respuesta
  const { accessToken } = response;
  setAuthorizationHeader(accessToken);
  storage.set('auth', accessToken);

  // Hacer una solicitud para obtener la información del usuario
  const userResponse = await client.get('api/auth/me');
  console.log("User Info Response:", userResponse); // Agregar un console.log para depurar la respuesta del usuario
  const user = userResponse; // Acceder correctamente al objeto usuario

  return { user, token: accessToken }; // Devolver el usuario y el token
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove('auth');
  });
};

export const getUserInfo = () => {
  return client.get('api/auth/me');
};
