import { client, removeAuthorizationHeader, setAuthorizationHeader } from "../../api/client";
import storage from "../../storage";

export const login = async credentials => {
  const response = await client.post('api/auth/login', credentials);
  const { accessToken } = response;
  setAuthorizationHeader(accessToken);
  storage.set('auth', accessToken);

  const userResponse = await client.get('api/auth/me');
  const user = userResponse;

  return { user, token: accessToken };
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
