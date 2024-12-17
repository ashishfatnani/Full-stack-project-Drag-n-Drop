import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { message } from "antd";
import apiService from "../api/apiService";
import "./AuthForm.css"; // Shared CSS for styling

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await apiService.register(username, email, password);
      message.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      message.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="auth-link">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
