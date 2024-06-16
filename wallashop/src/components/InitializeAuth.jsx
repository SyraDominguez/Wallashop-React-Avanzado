import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthorizationHeader } from "../api/client";
import { login } from "../store/actions/authActions";
import { getUserInfo } from "../pages/auth/service";
import storage from "../storage";

const InitializeAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initialize = async () => {
      const accessToken = storage.get("auth");
      if (accessToken) {
        setAuthorizationHeader(accessToken);
        try {
          const user = await getUserInfo();
          dispatch(login({ user, token: accessToken }));
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    initialize();
  }, [dispatch]);

  return null;
};

export default InitializeAuth;
