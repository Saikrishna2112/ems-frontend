import { useState } from "react";
import api from "../api";
import "../App.css";

export default function AddEmployee() {
  const [form, set] = useState({
    name: "", email: "", mobileNo: "", designation: "", gender: "", course: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    if (!["M", "F"].includes((form.gender || "").toUpperCase())) {
      alert("Select Gender M or F"); return;
    }
    await api.post("/api/employees", {
      name: form.name.trim(),
      email: form.email.trim(),
      mobileNo: form.mobileNo.trim(),
      designation: form.designation.trim(),
      gender: form.gender.toUpperCase(),
      course: form.course ? form.course.split(",").map(c => c.trim()).filter(Boolean) : []
    });
    alert("Employee added");
    set({ name:"", email:"", mobileNo:"", designation:"", gender:"", course:"" });
  };

  return (
    <div className="container">
      <h2>Add Employee</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={e=>set({...form, name:e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e=>set({...form, email:e.target.value})} />
        <input placeholder="Mobile" value={form.mobileNo} onChange={e=>set({...form, mobileNo:e.target.value})} />
        <input placeholder="Designation" value={form.designation} onChange={e=>set({...form, designation:e.target.value})} />
        <label>Gender:</label>
        <select value={form.gender} onChange={e=>set({...form, gender:e.target.value})}>
          <option value="">--Select--</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <label>Courses (comma-separated):</label>
        <input value={form.course} onChange={e=>set({...form, course:e.target.value})} />
        <button>Save</button>
      </form>
    </div>
  );
}
