import Button from "../../components/button";
import { login } from "./service";

export default function LoginPage (onLogin) {
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await login({
        email: event.target.email.value,
        password: event.target.password.value
      });
      onLogin(true);
      
    } catch (error) {
      console.error(error);
    }




  }

  return (
  <div>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <input type = "email" name = "email" placeholder = "Email" required/>
      <input type = "password" name = "password" placeholder = "Password" required/>
      <Button type="submit" $variant= "primary">Login</Button>
    </form>
  </div>
  );
}