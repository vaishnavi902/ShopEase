import React, { useState } from "react";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, QrCode } from "lucide-react";

function GrocerySubcategory() {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Refined Sugar", desc: "Premium sugar", img: "https://img.freepik.com/free-photo/world-diabetes-day-sugar-wooden-bowl-dark-surface_1150-26666.jpg?semt=ais_hybrid&w=740&q=80", unit: ["1","2","5"], measure: "kg" },
    { id: 2, name: "Whole Wheat Atta", desc: "Healthy atta", img: "https://media.istockphoto.com/id/480241244/photo/bowl-filled-with-wheat-flour.jpg?s=612x612&w=0&k=20&c=GfezwqMcv8sfHjL750Ujk_rEc-4rQB5fpM2MRTizTi0=", unit: ["1","2","5"], measure: "kg" },
    { id: 3, name: "Assam Chai Powder", desc: "Strong Assam tea", img: "https://5.imimg.com/data5/SELLER/Default/2025/3/493427570/YQ/AK/PY/109217771/assam-tea-500x500.jpg", unit: ["100","250","500"], measure: "g" },
    { id: 4, name: "Basmati Rice", desc: "Perfect for Biryani", img: "https://media.istockphoto.com/id/153737841/photo/rice.jpg?s=612x612&w=0&k=20&c=lfO7iLT0UsDDzra0uBOsN1rvr2d5OEtrG2uwbts33_c=", unit: ["1","2","5"], measure: "kg" },
    { id: 5, name: "Masoor Dal", desc: "Nutritious and easy to cook", img: "https://www.shutterstock.com/shutterstock/videos/3546379407/thumb/1.jpg?ip=x480", unit: ["1","2","5"], measure: "kg" },
    { id: 6, name: "Organic Turmeric Powder", desc: "Vibrant colour and health benefits", img: "https://media.istockphoto.com/id/1492535011/photo/turmeric-powder-and-fresh-turmeric.jpg?s=612x612&w=0&k=20&c=XzlnvuFgaRJKOP5gFq2HVE5NPKMEzAxcwYo2ZvXTTsU=", unit: ["100","250","500"], measure: "g" },
  ];

  const [selectedUnit, setSelectedUnit] = useState({});
  const [message, setMessage] = useState("");

  const handleAddToCart = async (item) => {
    try {
      const res = await axios.post("http://localhost/shopease-backend/api/add_to_cart.php", {
        product_id: item.id,
        product_name: item.name,
        quantity: selectedUnit[item.id] || 1,
        unit: selectedUnit[item.id] || item.unit[0],
        measure: item.measure,
      });

      if (res.data.status === "success") {
        setMessage(`✅ ${item.name} added to cart`);
      } else {
        setMessage(`❌ ${res.data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-violet-600">ShopEase</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 mx-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
        />
        <div className="flex items-center space-x-6">
          {/* ✅ Fixed Login button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-700 hover:text-violet-600"
          >
            <UserIcon className="h-6 w-6 mr-1" />
            Login
          </button>
          <button className="flex items-center text-gray-700 hover:text-violet-600">
            <ShoppingCartIcon className="h-6 w-6 mr-1" />
            Cart
          </button>
        </div>
      </header>

      {/* Page Title */}
      <div className="px-6 py-6">
        <h2 className="text-2xl font-bold font-sans">Grocery Subcategory</h2>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </div>

      {/* Product Grid */}
      <div className="px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4">
            <img src={item.img} alt={item.name} className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-3">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{item.desc}</p>

            {/* Quantity Select */}
            <div className="flex items-center space-x-2 mb-2">
              <select
                className="border rounded px-2 py-1"
                onChange={(e) =>
                  setSelectedUnit({ ...selectedUnit, [item.id]: e.target.value })
                }
              >
                {item.unit.map((u, i) => (
                  <option key={i}>{u}</option>
                ))}
              </select>
              <span>{item.measure}</span>
            </div>

            {/* Buttons */}
            <button className="flex items-center justify-center gap-2 border text-green-600 border-green-600 px-3 py-2 rounded mb-2 hover:bg-green-50">
              <QrCode size={16} /> Scan with QR
            </button>
            <button
              onClick={() => handleAddToCart(item)}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GrocerySubcategory;
