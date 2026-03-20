import axios from "axios";
import { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Project {
  _id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  image: string; // full URL from backend
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const API = process.env.REACT_APP_BACKEND_URL!;


  useEffect(() => {
    axios.get(`${API}/api/projects`)
      .then(res => setProjects(res.data));
  }, []);

  return (
  <div style={{ padding: "40px" }}>
        <h2 style={{ textAlign: "center" }}>Top Trending Properties</h2>

        {projects.length > 2 ? (
          /* SLIDER VERSION */
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000 }}
            loop
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ marginTop: "30px", paddingBottom: "40px" }}
          >
            {projects.map((p) => (
              <SwiperSlide key={p._id}>
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: "#fff",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "contain",
                      backgroundColor: "#000",
                    }}
                  />

                  <div style={{ padding: "15px" }}>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <p><strong>Starting at:</strong> {p.price}</p>
                    <p><strong>Location:</strong> {p.location}</p>

                    <button
                      style={{
                        marginTop: "10px",
                        padding: "10px 15px",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => alert(`Enquiry for ${p.title}`)}
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          /* GRID VERSION */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {projects.map((p) => (
              <div
                key={p._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "contain",
                    backgroundColor: "#000",
                  }}
                />

                <div style={{ padding: "15px" }}>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <p><strong>Starting at:</strong> {p.price}</p>
                  <p><strong>Location:</strong> {p.location}</p>

                  <button
                    style={{
                      marginTop: "10px",
                      padding: "10px 15px",
                      background: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => alert(`Enquiry for ${p.title}`)}
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  );
}
