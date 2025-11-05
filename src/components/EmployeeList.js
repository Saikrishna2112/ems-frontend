import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:5000/api/employees/all", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await axios.delete(`http://localhost:5000/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Employee Deleted!");
      fetchEmployees();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Employees List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.mobileNo}</td>
              <td>{emp.designation}</td>
              <td>{emp.gender}</td>
              <td>{emp.course.join(", ")}</td>
              <td>
                {(role === "HR" || role === "Manager") ? (
                  <>
                  <button onClick={() => navigate(`/edit/${emp._id}`)}>Edit</button>
                  &nbsp;
                  <button onClick={() => deleteEmployee(emp._id)} style={{ color: "red" }}>Delete</button>
                </>
                ) : "View Only"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
