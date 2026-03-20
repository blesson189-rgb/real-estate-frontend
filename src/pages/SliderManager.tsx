import { useEffect, useState } from "react";
import axios from "axios";

interface SliderItem {
    _id: string;
  url: string;
  title?: string;
}

export default function SliderManager() {
    const [sliders, setSliders] = useState<SliderItem[]>([]);
    const [image, setImage] = useState<File | null>(null);

    const token = localStorage.getItem("adminToken");
    const API = process.env.REACT_APP_BACKEND_URL!;


    // Fetch all slider images
    const loadSliders = async () => {
        try {
            const res = await axios.get(`${API}/api/slider`);
            setSliders(res.data);
        } catch (err) {
            console.error("Error loading sliders:", err);
        }
    };

    useEffect(() => {
        loadSliders();
    }, []);

    // Upload new slider image
    const uploadSlider = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append("image", image);

        try {
            await axios.post(`${API}/api/slider`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setImage(null);
            loadSliders();
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed. Check token or backend.");
        }
    };

    // Delete slider image
    const deleteSlider = async (id: string) => {
        try {
            await axios.delete(`${API}/api/slider/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            loadSliders();
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Delete failed.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Slider Images</h2>

            {/* Upload Section */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="file"
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setImage(e.target.files[0]);
                        }
                    }}
                />
                <button
                    onClick={uploadSlider}
                    style={{
                        marginLeft: "10px",
                        padding: "8px 12px",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                    }}
                >
                    Upload
                </button>
            </div>

            {/* Display Existing Images */}
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {sliders.map((item) => {
                    return (
                        <div
                            key={item._id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                borderRadius: "8px",
                                width: "250px",
                            }}
                        >
                            <img
                                src={item.url}
                                alt="slider"
                                style={{ width: "100%", borderRadius: "6px" }}
                            />

                            <button
                                onClick={() => deleteSlider(item._id)}
                                style={{
                                    marginTop: "10px",
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
                    );
                })}
            </div>
        </div>
    );
}
