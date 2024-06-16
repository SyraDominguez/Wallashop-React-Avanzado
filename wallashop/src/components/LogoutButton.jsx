import { useDispatch } from "react-redux";
import { logout } from "../store/actions/authActions";
import Button from "./button";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      dispatch(logout());
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
