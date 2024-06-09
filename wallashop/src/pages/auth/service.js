import { client, removeAuthorizationHeader, setAuthorizationHeader } from "../../api/client";
import storage from "../../storage";

export const login = credentials => {
  return client
    .post('api/auth/login', credentials)
    .then(({ accessToken, user }) => {
      setAuthorizationHeader(accessToken);
      storage.set('auth', accessToken);
      return user;
    });
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
