import { useEffect, useState } from "react";
import axios from "axios";

interface TrustedLogo {
  _id: string;
  name: string;
  logoUrl: string;
}

export default function TrustedManager() {
  const [trusted, setTrusted] = useState<TrustedLogo[]>([]);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);

  const token = localStorage.getItem("adminToken");
  const API = process.env.REACT_APP_BACKEND_URL!;


  const loadTrusted = async () => {
    const res = await axios.get(`${API}/api/trusted`);
    setTrusted(res.data);
  };

  useEffect(() => {
    loadTrusted();
  }, []);

  const uploadTrusted = async () => {
    if (!logo || !name) return;

    const formData = new FormData();
    formData.append("logo", logo);
    formData.append("name", name);
    const API = process.env.REACT_APP_BACKEND_URL!;


    await axios.post(`${API}/api/trusted`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setName("");
    setLogo(null);
    loadTrusted();
  };

  const deleteTrusted = async (id: string) => {
    await axios.delete(`${API}/api/trusted/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadTrusted();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Trusted Partners</h2>

      {/* Upload Form */}
      <div style={{ marginBottom: "20px", maxWidth: "400px" }}>
        <input
          placeholder="Partner Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="file"
          onChange={(e) =>
            setLogo(e.target.files ? e.target.files[0] : null)
          }
        />

        <button
          onClick={uploadTrusted}
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "100%",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Add Partner
        </button>
      </div>

      {/* List Logos */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {trusted.map((t) => (
          <div
            key={t._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={t.logoUrl}
              alt={t.name}
              style={{
                width: "100%",
                height: "100px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />

            <p>{t.name}</p>

            <button
              onClick={() => deleteTrusted(t._id)}
              style={{
                background: "red",
                color: "white",
                padding: "8px",
                width: "100%",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
