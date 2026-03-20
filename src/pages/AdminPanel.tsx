import { Link } from "react-router-dom";

export default function AdminPanel() {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    window.location.href = "/admin";
    return null;
  }

  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <button
        onClick={logout}
        style={{
          background: "red",
          color: "white",
          padding: "8px 12px",
          border: "none",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        Logout
      </button>

      <ul style={{ lineHeight: "2rem", fontSize: "18px" }}>
        <li><Link to="/admin/slider">Manage Slider Images</Link></li>
        <li><Link to="/admin/projects">Manage Projects</Link></li>
        <li><Link to="/admin/trusted">Manage Trusted Logos</Link></li>
        <li><Link to="/admin/enquiries">View Enquiries</Link></li>
        <li><Link to="/admin/contact">Manage Contact Info</Link></li>
      </ul>
    </div>
  );
}
