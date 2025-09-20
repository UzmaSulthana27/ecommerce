import React, { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

const MyOrders = () => {
  const { cart, products, clearCart, getTotalItems, getTotalPrice } =
    useContext(ProductContext);

  const navigate = useNavigate();

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = products.find((p) => p.id === Number(id));
    return { ...product, qty };
  });

  // ✅ Order Date
  const orderDate = new Date().toLocaleString();

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: "700px",
            margin: "40px auto",
            background: "#fff",
            borderRadius: "10px",
            padding: "40px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2>⚡ No active orders</h2>
          <p>
            Please go to <Link to="/products">Products</Link> and place an order.
          </p>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: "1000px",
          margin: "30px auto",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: "24px",
        }}
      >
        {/* Header */}
        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          ✅ Order Confirmation
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}
        >
          Thank you for shopping with us! Your order has been placed successfully.
        </motion.p>

        {/* ✅ Order Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "0.95rem",
            color: "#444",
          }}
        >
          <strong>📅 Order Date:</strong> {orderDate}
        </motion.div>

        {/* ✅ Split layout: Items left | Delivery info right */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            alignItems: "flex-start",
          }}
        >
          {/* Left side - Order Items */}
          <div style={{ flex: 2 }}>
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * index }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #eee",
                  padding: "15px 0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      marginRight: "16px",
                      border: "1px solid #ddd",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
                      {item.title}
                    </div>
                    <div style={{ color: "#555", fontSize: "0.95rem" }}>
                      ₹{item.price} × {item.qty} ={" "}
                      <strong>₹{item.price * item.qty}</strong>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Summary Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                marginTop: "20px",
                padding: "16px",
                background: "#f8f9fa",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
            >
              <h3 style={{ margin: "0 0 12px" }}>Order Summary</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span>Total Items:</span>
                <span>{getTotalItems()}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span>Delivery:</span>
                <span style={{ color: "green" }}>FREE</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                <span>Total Price:</span>
                <span>₹{getTotalPrice()}</span>
              </div>
            </motion.div>
          </div>

          {/* Right side - Delivery Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              flex: 1,
              padding: "16px",
              background: "#e9f7ef",
              borderRadius: "6px",
              border: "1px solid #cce5cc",
              minHeight: "200px",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#2e7d32" }}>
              📦 Delivery Information
            </h3>
            <p style={{ margin: "4px 0" }}>
              Your order will be delivered within{" "}
              <strong>3-5 business days</strong>.
            </p>
            <p style={{ margin: "4px 0" }}>
              Track your order in{" "}
              <Link to="/ordersuccess" style={{ color: "#007bff" }}>
                My Orders
              </Link>{" "}
              section.
            </p>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            textAlign: "center",
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {/* Continue Shopping */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              clearCart();
              navigate("/products");
            }}
            style={{
              padding: "12px 28px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
            }}
          >
            Continue Shopping
          </motion.button>

          {/* Pay Now */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/payment")}
            style={{
              padding: "12px 28px",
              background: "green",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
            }}
          >
            Pay Now
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MyOrders;
