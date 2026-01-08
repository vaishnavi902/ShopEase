import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost/shopease-backend/api/register.php",
        { name, email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data && res.data.status === "success") {
        setMessage("✅ Registered successfully! Now you can login.");
      } else if (res.data && res.data.status === "error") {
        setMessage("❌ " + res.data.message);
      } else {
        setMessage("❌ Unexpected server response");
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setMessage(
        "Server error: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-fixed bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/ShopEase.png)`,
      }}
    >
      <div className="bg-blue-100 bg-opacity-70 p-8 rounded-2xl shadow w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-4 text-gray-800 color-red">
          Register Your Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="customer">Customer</option>
              <option value="shopkeeper">Shopkeeper</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-200 text-sm"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-3 text-center text-sm font-medium text-red-800">
            {message}
          </p>
        )}

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
