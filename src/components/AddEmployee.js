import React, { useState } from "react";
import axios from "axios";

export default function AddEmployee() {
  const [form, setForm] = useState({
  name: "", email: "", mobileNo: "", designation: "",
  gender: "", course: ""
});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await axios.post("https://ems-backend-r5bn.onrender.com/api/employees", form, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("Employee Added!");
  };

  const handleCourse = (e) => {
    setForm({ ...form, course: e.target.value.split(",") });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} /><br /><br />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} /><br /><br />
        <input placeholder="Mobile" onChange={e => setForm({ ...form, mobileNo: e.target.value })} /><br /><br />
        <input placeholder="Designation" onChange={e => setForm({ ...form, designation: e.target.value })} /><br /><br />
        
        Gender: 
        <select
          value={form.gender}
          onChange={e => setForm({ ...form, gender: e.target.value })}
          required
        >
          <option value="">-- Select Gender --</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>

        <br /><br />

        Courses (comma separated e.g. MCA,BCA)<br />
        <input onChange={handleCourse} /><br /><br />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
