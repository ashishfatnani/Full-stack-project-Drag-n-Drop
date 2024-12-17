import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { message } from "antd";
import apiService from "../api/apiService";
import "./AuthForm.css"; // Shared CSS for styling

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await apiService.login(email, password);
      localStorage.setItem("token", data.token); // Save token
      message.success("Login successful!");
      navigate("/");
    } catch (err) {
      message.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Dont have an account?
        <Link to="/register" className="auth-link">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
