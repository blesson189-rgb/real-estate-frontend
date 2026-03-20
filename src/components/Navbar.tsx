import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 40px",
        background: "#ffffff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        Property Pulse
      </div>

      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#333" }}>Home</Link>
        <Link to="/projects" style={{ textDecoration: "none", color: "#333" }}>Projects</Link>
        <Link to="/contact" style={{ textDecoration: "none", color: "#333" }}>Contact</Link>

        <Link
          to="/contact"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            borderRadius: "5px",
            textDecoration: "none",
          }}
        >
          Enquire Now
        </Link>
      </div>
    </nav>
  );
}
