import { useEffect, useState } from "react";
import axios from "axios";

interface Settings {
  phone: string;
  email: string;
  address: string;
}

export default function ContactManager() {
  const [settings, setSettings] = useState<Settings>({
    phone: "",
    email: "",
    address: "",
  });
  const API = process.env.REACT_APP_BACKEND_URL!;


  const token = localStorage.getItem("adminToken");

  const loadSettings = async () => {
    const res = await axios.get(`${API}/api/contacts`);
    if (res.data) {
      setSettings(res.data);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const saveSettings = async () => {
    await axios.post(`${API}/api/contacts`, settings, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Contact information updated!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Contact Information</h2>

      <input
        placeholder="Phone"
        value={settings.phone}
        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        placeholder="Email"
        value={settings.email}
        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <textarea
        placeholder="Address"
        value={settings.address}
        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
        rows={3}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button
        onClick={saveSettings}
        style={{
          padding: "10px",
          width: "100%",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Save Contact Info
      </button>
    </div>
  );
}
