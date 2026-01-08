import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ added axios to call backend

export default function Login() {
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ send login data to backend for authentication
      const res = await axios.post(
        "http://localhost/shopease-backend/api/login.php",
        { email, password, role },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data && res.data.status === "success") {
        setMessage("✅ Login successful!");
        setTimeout(() => navigate("/dashboard"), 1000); // ✅ redirect after success
      } else {
        setMessage("❌ Invalid credentials!"); // ✅ show error if login fails
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setMessage(
        "Server error: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed" style={{ backgroundImage:`url(${process.env.PUBLIC_URL}/ShopEase.png)`,minHeight: "100vh"}}>
      <div className="bg-blue-100 bg-opacity-70 p-8 rounded-2xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 font-serif">Welcome,In ShopEase!!</h1>

        <label className="block text-sm font-medium mb-1">Choose Role</label>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="customer">Customer</option>
            <option value="shopkeeper">Shopkeeper</option>
          </select>

          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            <span
            onClick={() => navigate("/Dashboard")}
            >
              Login
            </span>
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

        {message && (
          <p className="text-center text-red-600 font-medium mt-2">{message}</p>
        )}
      </div>
    </div>
  );
}
