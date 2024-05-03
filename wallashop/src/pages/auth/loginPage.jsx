import { useState } from "react";
import Button from "../../components/button";
import { login } from "./service";
import Layout from "../../components/layout/layout";
import { useAuth } from "./context.jsx";

export default function LoginPage() {
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

    console.log("Logada");
  };

  const { email, password } = formValues;
  const buttonDisabled = !email || !password;

  return (
    <Layout>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit" $variant="primary" disabled={buttonDisabled}>
            Login
          </Button>
        </form>
      </div>
    </Layout>
  );
}
