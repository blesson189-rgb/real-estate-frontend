import { useEffect, useState } from "react";
import axios from "axios";

interface Project {
  _id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  image: string;
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [editing, setEditing] = useState<Project | null>(null);

  const token = localStorage.getItem("adminToken");
  const API = process.env.REACT_APP_BACKEND_URL!;

  

  const loadProjects = async () => {
    const res = await axios.get(`${API}/api/projects`);
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleImage = (file: File | null) => {
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");
    setImage(null);
    setPreview(null);
    setEditing(null);
  };

  const uploadProject = async () => {
    if (!image || !title) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);

    await axios.post(`${API}/api/projects`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    resetForm();
    loadProjects();
  };

  const startEdit = (p: Project) => {
    setEditing(p);
    setTitle(p.title);
    setDescription(p.description);
    setPrice(p.price);
    setLocation(p.location);
    setPreview(p.image);
  };

  const updateProject = async () => {
    if (!editing) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);

    if (image) {
      formData.append("image", image);
    }

    await axios.put(
      `${API}/api/projects/${editing._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    resetForm();
    loadProjects();
  };

  const deleteProject = async (id: string) => {
    await axios.delete(`${API}/api/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadProjects();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Projects</h2>

      {/* FORM */}
      <div style={{ marginBottom: "20px", maxWidth: "400px" }}>
        <input
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          placeholder="Starting Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="file"
          onChange={(e) =>
            handleImage(e.target.files ? e.target.files[0] : null)
          }
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          />
        )}

        <button
          onClick={editing ? updateProject : uploadProject}
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "100%",
            background: editing ? "orange" : "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {editing ? "Update Project" : "Add Project"}
        </button>

        {editing && (
          <button
            onClick={resetForm}
            style={{
              marginTop: "10px",
              padding: "10px",
              width: "100%",
              background: "gray",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* PROJECT LIST */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {projects.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              width: "250px",
            }}
          >
            <img
              src={p.image}
              alt="project"
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />

            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p><strong>Price:</strong> {p.price}</p>
            <p><strong>Location:</strong> {p.location}</p>

            <button
              onClick={() => startEdit(p)}
              style={{
                background: "orange",
                color: "white",
                padding: "8px",
                width: "100%",
                border: "none",
                borderRadius: "5px",
                marginBottom: "5px",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteProject(p._id)}
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
