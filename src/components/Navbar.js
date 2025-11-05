import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav style={{ padding: 10, background: "#eee" }}>
      <span style={{ marginRight: 20, fontWeight: "bold" }}>EMS App</span>

      {token ? (
        <>
          <button onClick={() => navigate("/")}>Employees</button>
          <button onClick={() => navigate("/add")}>Add Employee</button>
          <button onClick={handleLogout} style={{ marginLeft: 10, color: "red" }}>Logout</button>
        </>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </nav>
  );
}
