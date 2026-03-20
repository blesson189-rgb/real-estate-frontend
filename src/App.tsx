import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import SliderManager from "./pages/SliderManager";
import ProjectsManager from "./pages/ProjectManager";
import TrustedManager from "./pages/TrustedManager";
import EnquiriesPage from "./pages/EnquiriesPage";
import ContactManager from "./pages/ContactManager";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminPanel />} />
        <Route path="/admin/slider" element={<SliderManager />} />
        <Route path="/admin/projects" element={<ProjectsManager />} />
        <Route path="/admin/trusted" element={<TrustedManager />} />
        <Route path="/admin/enquiries" element={<EnquiriesPage />} />
        <Route path="/admin/contact" element={<ContactManager />} />


      </Routes>
    </Router>
  );
}
