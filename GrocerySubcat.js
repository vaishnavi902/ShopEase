import React, { useState } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";

function QRScanner({ onScanClose }) {
  const [scannedData, setScannedData] = useState("");

  const handleScan = async (data) => {
    if (data) {
      try {
        const parsed = JSON.parse(data);  // QR contains {"product_id":1}
        const res = await axios.post("http://localhost/shopease-backend/api/cart.php", {
          product_id: parsed.product_id,
          quantity: 1
        });
        if (res.data.status === "success") {
          alert("✅ Product added to cart!");
          onScanClose();
        }
      } catch (err) {
        console.error("Error scanning:", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-2">Scan Product QR</h2>
        <QrReader
          delay={300}
          style={{ width: "300px" }}
          onError={(err) => console.error(err)}
          onScan={handleScan}
        />
        <button 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          onClick={onScanClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default QRScanner;
