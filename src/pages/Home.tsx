import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

interface SliderImage {
  _id: string;
  url: string;
  title: string;
}

interface TrustedLogo {
  _id: string;
  name: string;
  logoUrl: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  image: string; // full URL from backend
}

export default function Home() {
  const [slider, setSlider] = useState<SliderImage[]>([]);
  const [trusted, setTrusted] = useState<TrustedLogo[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const API = process.env.REACT_APP_BACKEND_URL!;
  console.log("ENV",API);


  useEffect(() => {
    axios.get(`${API}/api/slider`).then((r) => setSlider(r.data));
    axios.get(`${API}/api/trusted`).then((r) => setTrusted(r.data));
    axios.get(`${API}/api/projects`).then((r) => setProjects(r.data));
  }, []);

  return (
    <div>

      {/* HERO SLIDER */}
      <div style={{ width: "100%", overflow: "hidden" }}>
        {slider.length > 0 ? (
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000 }}
            loop
            style={{ width: "100%", height: "500px" }}
          >
            {slider.map((s) => (
              <SwiperSlide key={s._id}>
                <div style={{ position: "relative" }}>
                  <img
                    src={s.url}
                    alt={s.title}
                    style={{ width: "100%", height: "500px", objectFit: "cover" }}
                  />
                  <h2
                    style={{
                      position: "absolute",
                      bottom: "40px",
                      left: "40px",
                      color: "white",
                      fontSize: "40px",
                      textShadow: "0 0 10px rgba(0,0,0,0.5)",
                    }}
                  >
                    {s.title}
                  </h2>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div style={{ height: "400px", background: "#ddd" }}></div>
        )}
      </div>

      {/* TRUSTED */}
      {/* TRUSTED */}
      <div style={{ padding: "60px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>
          Trusted By Industry Leaders
        </h2>
        <p style={{ marginTop: "10px", fontSize: "18px", color: "#555" }}>
          Our Esteemed Partners
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "30px",
            marginTop: "40px",
          }}
        >
          {trusted.map((t) => (
            <div
              key={t._id}
              style={{
                width: "180px",          // FIXED WIDTH
                height: "120px",         // FIXED HEIGHT
                borderRadius: "10px",
                background: "#fff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <img
                src={t.logoUrl}
                alt={t.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",   // FULL IMAGE, NO CROP
                }}
              />
            </div>
          ))}
        </div>
      </div>



      {/* PROJECTS */}
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

    </div>
  );
}
