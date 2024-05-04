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

  const handleChange = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(formValues);
    if (typeof onLogin === "function") {
      onLogin(true);
    }

    const to = location.state?.from || "/";
    navigate(to);
    console.log("Logada");
  };

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
      </div>
    </Layout>
  );
}
