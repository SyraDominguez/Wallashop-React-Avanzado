import { useState } from "react";
import Button from "../../components/button";
import { login } from "./service";

export default function LoginPage(onLogin) {
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

    try {
      const response = await login(formValues);
      if (response.status === 200) {
        onLogin(false);
      } else {
        console.error("Error al iniciar sesión: ", response.status);
      }
    } catch (error) {
      console.error("Hay un error", error);
    }
    console.log("Logada");
  };

  const { email, password } = formValues;
  const buttonDisabled = !email || !password;

  return (
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
  );
}
