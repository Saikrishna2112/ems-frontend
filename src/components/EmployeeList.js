import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const role = localStorage.getItem("role");
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/employees/all");
        setEmployees(res.data);
      } catch {
        alert("Please log in again");
        localStorage.clear();
        nav("/login");
      }
    })();
  }, [nav]);

  const deleteEmp = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    await api.delete(`/api/employees/${id}`);
    setEmployees((prev) => prev.filter((e) => e._id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Employees</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Mobile</th><th>Designation</th><th>Gender</th><th>Course</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.mobileNo}</td>
              <td>{e.designation}</td>
              <td>{e.gender}</td>
              <td>{(e.course || []).join(", ")}</td>
              <td>
                {(role === "HR" || role === "Manager")
                  ? <>
                      <button onClick={() => nav(`/edit/${e._id}`)}>Edit</button>
                      &nbsp;
                      <button onClick={() => deleteEmp(e._id)} style={{ color: "red" }}>Delete</button>
                    </>
                  : "View Only"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
