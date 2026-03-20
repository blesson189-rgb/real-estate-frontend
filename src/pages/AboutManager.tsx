import { useEffect, useState } from "react";
import axios from "axios";

export default function AboutManager() {
  const API = process.env.REACT_APP_BACKEND_URL!;
  const token = localStorage.getItem("adminToken");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get(`${API}/api/about`).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, []);

  const save = async () => {
    await axios.post(
      `${API}/api/admin/about`,
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("About Us updated");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit About Us</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 20 }}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: 200, padding: 10 }}
      />

      <button onClick={save} style={{ marginTop: 20, padding: "10px 20px" }}>
        Save
      </button>
    </div>
  );
}
