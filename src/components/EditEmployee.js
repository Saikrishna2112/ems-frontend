import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [form, setForm] = useState({
    name: "", email: "", mobileNo: "", designation: "", gender: "", course: ""
  });

  const fetchEmployee = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/employees/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setForm({
      ...res.data,
      course: res.data.course.join(", ")
    });
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const updateEmployee = async (e) => {
    e.preventDefault();

    if (role !== "HR" && role !== "Manager") {
      alert("Unauthorized");
      return;
    }

    await axios.put(`${process.env.REACT_APP_API_URL}/api/employees/${id}`, {
      ...form,
      course: form.course.split(",").map(c => c.trim())
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("Updated!");
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Employee</h2>
      <form onSubmit={updateEmployee}>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /><br /><br />
        <input value={form.email} disabled /><br /><br />
        <input value={form.mobileNo} onChange={e => setForm({ ...form, mobileNo: e.target.value })} /><br /><br />
        <input value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} /><br /><br />

        Gender:
        <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
          <option value="M">M</option><option value="F">F</option>
        </select>
        <br /><br />

        <input value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} /><br /><br />

        <button type="submit">Update</button>&nbsp;
        <button onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}
