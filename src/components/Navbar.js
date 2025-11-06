import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    nav("/login");
  };

  return (
    <nav style={{ padding: 10, background: "#eee", marginBottom: 10 }}>
      <button onClick={() => nav("/")}>Employees</button>
      {(token && (role === "HR" || role === "Manager")) && (
        <button onClick={() => nav("/add")} style={{ marginLeft: 10 }}>Add Employee</button>
      )}
      {token ? (
        <button onClick={logout} style={{ marginLeft: 10, color: "red" }}>Logout</button>
      ) : (
        <button onClick={() => nav("/login")} style={{ marginLeft: 10 }}>Login</button>
      )}
    </nav>
  );
}
