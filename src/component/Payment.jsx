import React, { useContext, useState } from "react";
import { ProductContext } from "../Context/ProductContext";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { getTotalItems, getTotalPrice, clearCart } = useContext(ProductContext);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    // Simple validation (can be expanded)
    if (paymentMethod === "card" && (!formData.cardNumber || !formData.cvv)) {
      alert("Please fill card details");
      return;
    }
    if (paymentMethod === "upi" && !formData.upiId) {
      alert("Please enter UPI ID");
      return;
    }

    // ✅ Payment success simulation
    alert("✅ Payment Successful!");
    clearCart();
    navigate("/ordersuccess");
 // Redirect  Order Success page
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: "900px",
          margin: "30px auto",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: "24px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "30px",
        }}
      >
        {/* Payment Methods */}
        <div>
          <h2 style={{ marginBottom: "20px" }}>💳 Choose Payment Method</h2>

          {/* Card Payment */}
          <div
            style={{
              border: paymentMethod === "card" ? "2px solid #007bff" : "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              💳 Credit/Debit Card
            </label>

            {paymentMethod === "card" && (
              <div style={{ marginTop: "15px" }}>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  onChange={handleChange}
                  style={{
                    width: "48%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    marginRight: "4%",
                  }}
                />
                <input
                  type="password"
                  name="cvv"
                  placeholder="CVV"
                  onChange={handleChange}
                  style={{
                    width: "48%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            )}
          </div>

          {/* UPI Payment */}
          <div
            style={{
              border: paymentMethod === "upi" ? "2px solid #007bff" : "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              📲 UPI
            </label>

            {paymentMethod === "upi" && (
              <div style={{ marginTop: "15px" }}>
                <input
                  type="text"
                  name="upiId"
                  placeholder="Enter UPI ID (e.g. yourname@upi)"
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            )}
          </div>

          {/* Cash on Delivery */}
          <div
            style={{
              border: paymentMethod === "cod" ? "2px solid #007bff" : "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              🚚 Cash on Delivery
            </label>
          </div>

          {/* Net Banking */}
          <div
            style={{
              border: paymentMethod === "netbanking" ? "2px solid #007bff" : "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="radio"
                name="paymentMethod"
                value="netbanking"
                checked={paymentMethod === "netbanking"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              🏦 Net Banking
            </label>
          </div>

          {/* Pay Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePayment}
            style={{
              padding: "14px 28px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "20px",
              width: "100%",
            }}
          >
            Pay Securely ₹{getTotalPrice()}
          </motion.button>
        </div>

        {/* Order Summary */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#f8f9fa",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>🧾 Order Summary</h3>
          <p>Total Items: {getTotalItems()}</p>
          <p>Delivery: <span style={{ color: "green" }}>FREE</span></p>
          <h3>Total Amount: ₹{getTotalPrice()}</h3>
        </div>
      </motion.div>
    </>
  );
};

export default Payment;
