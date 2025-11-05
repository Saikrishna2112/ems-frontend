import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import Navbar from "./components/Navbar";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddEmployee /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditEmployee /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}
