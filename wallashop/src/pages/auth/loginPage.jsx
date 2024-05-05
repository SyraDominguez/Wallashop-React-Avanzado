import { useState } from "react";
import styles from "./loginPage.module.css";
import Button from "../../components/button";
import { login } from "./service";
import Layout from "../../components/layout/layout";
import { useAuth } from "./context.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { onLogin } = useAuth();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(formValues);
      const to = location.state?.from || "/";
      navigate(to, { replace: true });
      if (typeof onLogin === "function") {
        onLogin(true);
      }
    } catch (error) {
      setError(`An error occurred: ${error.message}`);
    }
  };

  const resetError = () => setError(null);

  const { email, password } = formValues;
  const buttonDisabled = !email || !password;

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
          />
          <Button type="submit" disabled={buttonDisabled}>
            Login
          </Button>
        </form>
        {error && (
          <div className={styles.loginPageError} onClick={resetError}>
            {error} {/* Aquí se muestra el mensaje de error */}
          </div>
        )}
      </div>
    </Layout>
  );
}
