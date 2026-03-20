import { useEffect, useState } from "react";
import axios from "axios";

export default function About() {
  const API = process.env.REACT_APP_BACKEND_URL!;
  const [about, setAbout] = useState<any>(null);

  useEffect(() => {
    axios.get(`${API}/api/about`).then((res) => setAbout(res.data));
  }, []);

  return (
    <div style={{ padding: "60px 40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
        {about?.title || "About Property Pulse"}
      </h1>

      <p style={{ fontSize: "18px", lineHeight: "1.6", whiteSpace: "pre-line" }}>
        {about?.content || "Add About Us content from admin panel."}
      </p>
    </div>
  );
}
