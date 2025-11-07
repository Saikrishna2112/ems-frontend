import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    nav("/login");
  };

  return (
    <nav>
      <div className="nav-left">
        <Link to="/" className="brand">Employee Management System</Link>
      </div>

      {token && (
        <div className="nav-right">
          <span className="user-info">
            👤 {username || "User"} ({role})
          </span>
          <Link to="/">Home</Link>
          {(role === "HR" || role === "Manager") && (
            <Link to="/add">Add Employee</Link>
          )}
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      )}
    </nav>
  );
}
