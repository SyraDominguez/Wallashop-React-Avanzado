import { useState, useEffect } from "react";
import styles from "./loginPage.module.css";
import Button from "../../components/button";
import { login as apiLogin } from "./service";
import Layout from "../../components/layout/layout";
import { useAuth } from "./context.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import storage from "../../storage";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/authActions"; // Importar acción de Redux
import { setAuthorizationHeader } from "../../api/client"; // Importar función para establecer el encabezado de autorización

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Usar useDispatch de Redux

  const { onLogin } = useAuth();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // Recuperar datos del localStorage al cargar el componente
  useEffect(() => {
    const savedEmail = storage.get("savedEmail");
    const rememberMe = storage.get("rememberMe");
    if (savedEmail) {
      setFormValues((currentFormValues) => ({
        ...currentFormValues,
        email: savedEmail,
        rememberMe: rememberMe || false,
      }));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsFetching(true);
      const { user, token } = await apiLogin(formValues);
      console.log("Login response:", { user, token }); // Agregar un console.log para depurar
      setIsFetching(false);

      // Verificar si el token está presente
      if (!token) {
        throw new Error("Token no encontrado en la respuesta del servidor");
      }

      // Establecer el encabezado de autorización con el token real
      setAuthorizationHeader(token);

      // Despachar acción de login de Redux con el token real y el usuario
      dispatch(login({ user, token }));

      if (formValues.rememberMe) {
        storage.set("savedEmail", formValues.email);
        storage.set("rememberMe", true);
      } else {
        storage.remove("savedEmail");
        storage.remove("rememberMe");
      }

      const to = location.state?.from || "/";
      navigate(to, { replace: true });

      if (typeof onLogin === "function") {
        onLogin(user);
      }
    } catch (error) {
      setIsFetching(false);
      setError(`An error occurred: ${error.message}`);
    }
  };

  const resetError = () => setError(null);

  const { email, password, rememberMe } = formValues;
  const buttonDisabled = !email || !password || isFetching;

  return (
    <Layout>
      <div className={styles.loginPage}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={rememberMe}
              onChange={handleChange}
            />
            <small>Recuérdame</small>
          </label>
          <Button type="submit" disabled={buttonDisabled}>
            Login
          </Button>
        </form>
        {error && (
          <div className={styles.loginPageError} onClick={resetError}>
            {error}
          </div>
        )}
      </div>
    </Layout>
  );
}
