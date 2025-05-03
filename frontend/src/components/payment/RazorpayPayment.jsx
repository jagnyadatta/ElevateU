// RazorpayPayment.jsx
import React from "react";

const RazorpayPayment = () => {
  const loadRazorpay = () => {
    const options = {
      key: "YOUR_KEY_ID", // Replace with your Razorpay key ID
      amount: 50000, // Amount in paise = INR 500
      currency: "INR",
      name: "CSPeditor Pvt Ltd",
      description: "Test Transaction",
      image: "https://yourlogo.url/logo.png", // optional
      handler: function (response) {
        alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Chandra",
        email: "chandra@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "CSP Office, India",
      },
      theme: {
        color: "#6366f1",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600 text-center">Pay with Razorpay</h2>
        <button
          onClick={loadRazorpay}
          className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Pay ₹500
        </button>
      </div>
    </div>
  );
};

export default RazorpayPayment;
