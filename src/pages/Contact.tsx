import { useState, useEffect } from "react";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const API = process.env.REACT_APP_BACKEND_URL!;


  // Contact info from backend
  const [settings, setSettings] = useState({
    phone: "",
    email: "",
    address: "",
  });

  // Load editable contact info
  useEffect(() => {
    axios.get(`${API}/api/contacts`).then((res) => {
      if (res.data) {
        setSettings(res.data);
      }
    });
  }, []);

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.includes("@")) return "Valid email is required";
    if (form.phone.length < 10) return "Valid phone number required";
    if (!form.message.trim()) return "Message cannot be empty";
    return "";
  };

  const submit = async () => {
    const error = validate();
    if (error) return setStatus(error);

    const res = await axios.post(`${API}/api/contact`, form);
    if (res.data.success) {
      setStatus("Thank you! We will contact you soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <div style={{ display: "flex", padding: "40px", gap: "40px" }}>
      
      {/* LEFT SIDE */}
      <div style={{ width: "40%" }}>

        <h2 style={{ marginTop: "20px" }}>Contact Information</h2>

        <p><strong>Phone:</strong> {settings.phone || "Not set"}</p>
        <p><strong>Email:</strong> {settings.email || "Not set"}</p>
        <p><strong>Address:</strong> {settings.address || "Not set"}</p>
      </div>

      {/* RIGHT SIDE FORM */}
      <div style={{ width: "60%" }}>
        <h2>Get In Touch</h2>

        <input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />

        <input
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />

        <input
          placeholder="Your Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />

        <textarea
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={{ width: "100%", padding: "10px", margin: "10px 0", height: "120px" }}
        />

        <button
          onClick={submit}
          style={{
            padding: "12px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>

        <p style={{ marginTop: "10px", color: "green" }}>{status}</p>
      </div>
    </div>
  );
}
