import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/users/login", { username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      nav("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Employee Portal Login</h2>
        <form onSubmit={submit}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setU(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setP(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
