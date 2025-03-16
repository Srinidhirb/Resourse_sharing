import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/product") // Fixed API endpoint
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">🛒 Product List</h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {products.map((product) => (
                    <div 
                        key={product._id} 
                        className="bg-white p-4 border rounded-lg shadow-md transition hover:shadow-lg"
                    >
                        {/* Display only the first image */}
                        <img
                            src={`http://localhost:5000/${product.images[0]}`} // Ensure correct path
                            alt={product.productName}
                            className="w-full h-40 object-cover rounded-md mb-3"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">{product.productName}</h3>
                        <p className="text-gray-600 font-medium">₹{product.price}</p>
                        <button
                            className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md"
                            onClick={() => navigate(`/product/${product._id}`)}
                        >
                            View More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
