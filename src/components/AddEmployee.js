import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    course: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/employees`, 
        { ...form, course: form.course.split(",") },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("✅ Employee Added!");
      navigate("/"); // Go back to employee list
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add employee");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} required /><br /><br />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required /><br /><br />
        <input placeholder="Mobile No" onChange={e => setForm({ ...form, mobileNo: e.target.value })} required /><br /><br />
        <input placeholder="Designation" onChange={e => setForm({ ...form, designation: e.target.value })} required /><br /><br />

        Gender: 
        <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} required>
          <option value="">-- Select Gender --</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <br />
        <br />

        Courses (comma separated e.g. MCA,BCA)<br />
        <input onChange={e => setForm({ ...form, course: e.target.value })} required />
        <br />
        <br />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
