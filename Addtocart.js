import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // 🧭 Import navigation tools

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // 🚀 useNavigate hook for programmatic navigation

  useEffect(() => {
    axios
      .get("http://localhost/shopease-backend/api/cart.php")
      .then((res) => setCart(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCheckout = () => {
    alert("Proceeding to Checkout...");
    navigate("/checkout"); // 👈 navigate to another route
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🛒 My Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="p-3 border-b bg-white rounded shadow-sm mb-3"
          >
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-gray-500">{item.description}</p>
            <p className="font-bold text-green-700">₹{item.price}</p>
          </div>
        ))
      )}

      <div className="mt-6 flex gap-3">
        {/* 🧭 Link navigation */}
        <Link
          to="/grocery"
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          ← Continue Shopping
        </Link>

        {/* 🚀 Programmatic navigation */}
        {cart.length > 0 && (
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;

