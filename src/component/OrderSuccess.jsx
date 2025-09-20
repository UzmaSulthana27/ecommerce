// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const OrderSuccess = () => {
//   const navigate = useNavigate();
//   const orderId = Math.floor(Math.random() * 1000000); // fake order ID

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       style={{
//         textAlign: "center",
//         marginTop: "80px",
//         padding: "30px",
//       }}
//     >
//       <h1>✅ Payment Successful!</h1>
//       <p>Your order has been placed successfully.</p>
//       <h3>Order ID: #{orderId}</h3>

//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => navigate("/orders")}
//         style={{
//           marginTop: "20px",
//           padding: "12px 24px",
//           background: "#007bff",
//           color: "white",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//         }}
//       >
//         Go to My Orders
//       </motion.button>

//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => navigate("/")}
//         style={{
//           marginTop: "20px",
//           marginLeft: "10px",
//           padding: "12px 24px",
//           background: "#28a745",
//           color: "white",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//         }}
//       >
//         Continue Shopping
//       </motion.button>
//     </motion.div>
//   );
// };

// export default OrderSuccess;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBox, FaTruck, FaShippingFast, FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const orderId = Math.floor(Math.random() * 1000000);

  // ✅ Progress statuses
  const statuses = [
    { label: "Ordered", icon: <FaBox /> },
    { label: "Packed", icon: <FaTruck /> },
    { label: "Shipped", icon: <FaShippingFast /> },
    { label: "Delivered", icon: <FaCheckCircle /> },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  // ✅ Auto-advance progress every 3s
  useEffect(() => {
    if (currentStep < statuses.length - 1) {
      const timer = setInterval(() => {
        setCurrentStep((prev) => (prev < statuses.length - 1 ? prev + 1 : prev));
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [currentStep]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "30px",
        textAlign: "center",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ color: "#28a745", marginBottom: "10px" }}
      >
        ✅ Payment Successful!
      </motion.h1>

      <p>Your order has been placed successfully 🎉</p>
      <h3 style={{ margin: "10px 0 30px", color: "#444" }}>
        Order ID: <span style={{ color: "#007bff" }}>#{orderId}</span>
      </h3>

      {/* Progress Bar */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "40px 0",
          padding: "0 20px",
        }}
      >
        {/* Background line */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "40px",
            right: "40px",
            height: "5px",
            background: "#ddd",
            zIndex: 0,
            borderRadius: "4px",
          }}
        />

        {/* Animated progress line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (statuses.length - 1)) * 100}%` }}
          transition={{ duration: 0.8 }}
          style={{
            position: "absolute",
            top: "20px",
            left: "40px",
            height: "5px",
            background: "#28a745",
            zIndex: 1,
            borderRadius: "4px",
          }}
        />

        {/* Status Icons */}
        {statuses.map((status, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: index <= currentStep ? 1 : 0.5,
              y: 0,
            }}
            transition={{ delay: index * 0.2 }}
            style={{ textAlign: "center", zIndex: 2, flex: 1 }}
          >
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                background: index <= currentStep ? "#28a745" : "#bbb",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: "20px",
              }}
            >
              {status.icon}
            </div>
            <div
              style={{
                marginTop: "6px",
                fontSize: "0.9rem",
                fontWeight: index === currentStep ? "bold" : "normal",
                color: index <= currentStep ? "#28a745" : "#888",
              }}
            >
              {status.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ marginTop: "40px" }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/orders")}
          style={{
            marginRight: "12px",
            padding: "12px 24px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📦 Go to My Orders
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          style={{
            padding: "12px 24px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🛒 Continue Shopping
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default OrderSuccess;
