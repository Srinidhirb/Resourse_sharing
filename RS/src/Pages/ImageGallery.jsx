import { useState, useEffect } from "react";
import axios from "axios";

export default function ImageGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/images")
      .then((response) => setImages(response.data))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">📸 Image Gallery</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {images.map((image, index) => (
          <div key={index} className="bg-white p-4 border rounded-lg shadow-md">
            <img
              src={`http://localhost:5000/${image}`}
              alt={`Image ${index + 1}`}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
