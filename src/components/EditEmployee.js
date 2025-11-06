import { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function EditEmployee() {
  const { id } = useParams();
  const [form, set] = useState({
    name:"", email:"", mobileNo:"", designation:"", gender:"", course:""
  });
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await api.get(`/api/employees/${id}`);
      set({
        name: res.data.name || "",
        email: res.data.email || "",
        mobileNo: res.data.mobileNo || "",
        designation: res.data.designation || "",
        gender: res.data.gender || "M",
        course: (res.data.course || []).join(", ")
      });
    })();
  }, [id]);

  const update = async (e) => {
    e.preventDefault();
    await api.put(`/api/employees/${id}`, {
      name: form.name.trim(),
      email: form.email.trim(),
      mobileNo: form.mobileNo.trim(),
      designation: form.designation.trim(),
      gender: (form.gender || "M").toUpperCase(),
      course: form.course ? form.course.split(",").map(c => c.trim()).filter(Boolean) : []
    });
    alert("Employee updated");
    nav("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Employee</h2>
      <form onSubmit={update}>
        <input value={form.name} onChange={e=>set({...form, name:e.target.value})} /><br/><br/>
        <input value={form.email} disabled /><br/><br/>
        <input value={form.mobileNo} onChange={e=>set({...form, mobileNo:e.target.value})} /><br/><br/>
        <input value={form.designation} onChange={e=>set({...form, designation:e.target.value})} /><br/><br/>
        Gender:
        <select value={form.gender} onChange={e=>set({...form, gender:e.target.value})}>
          <option value="M">M</option>
          <option value="F">F</option>
        </select><br/><br/>
        Courses:
        <input value={form.course} onChange={e=>set({...form, course:e.target.value})} /><br/><br/>
        <button>Update</button>&nbsp;
        <button type="button" onClick={()=>nav("/")}>Cancel</button>
      </form>
    </div>
  );
}
