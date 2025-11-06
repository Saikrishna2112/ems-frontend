import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

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
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Username" onChange={(e) => setU(e.target.value)} /><br /><br />
        <input type="password" placeholder="Password" onChange={(e) => setP(e.target.value)} /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
