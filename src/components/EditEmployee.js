import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    course: ""
  });

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`https://ems-backend-r5bn.onrender.com/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setForm({
        ...res.data,
        course: res.data.course.join(", ")
      });

    } catch (error) {
      alert("Failed to load employee!");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const updateEmployee = async (e) => {
    e.preventDefault();

    if (role !== "HR" && role !== "Manager") {
      alert("You are not authorized to update!");
      return;
    }

    try {
      await axios.put(
        `https://ems-backend-r5bn.onrender.com/api/employees/${id}`,
        {
          ...form,
          course: form.course.split(",").map(c => c.trim())
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Employee Updated!");
      navigate("/");
    } catch (err) {
      alert("Error updating employee");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Employee</h2>

      <form onSubmit={updateEmployee}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
        /><br /><br />

        <input
          value={form.email}
          disabled   // ❗ Prevent editing email
          placeholder="Email"
        /><br /><br />

        <input
          value={form.mobileNo}
          onChange={(e) => setForm({ ...form, mobileNo: e.target.value })}
          placeholder="Mobile"
          required
        /><br /><br />

        <input
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
          placeholder="Designation"
          required
        /><br /><br />

        Gender:
        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          required
        >
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
        <br /><br />

        Courses (comma separated)<br />
        <input
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          placeholder="e.g., MCA, BCA"
        /><br /><br />

        {(role === "HR" || role === "Manager") ? (
          <>
            <button type="submit">Update</button>&nbsp;
            <button type="button" onClick={() => navigate("/")}>Cancel</button>
          </>
        ) : (
          <button type="button" onClick={() => navigate("/")}>Back</button>
        )}
      </form>
    </div>
  );
}
