// import React from 'react'
// import { Link } from 'react-router-dom'



// const Navbar = () => {
//   return (
//     <div>
//       <nav style={{backgroundColor: 'black', color: 'white', height: '60px', display: 'flex', alignItems: 'center', padding: '0 20px'}}>
//          <ul>
//         <li>
//             <Link style={{textDecoration:"none",color:"white"}} to="/">Home</Link>
//         </li>
//         <li>
//             <Link style={{textDecoration:"none",color:"white"}} to="/Cart">Cart</Link>
//         </li>
//         <li>
//             <Link style={{textDecoration:"none",color:"white"}} to="/Login">Login</Link>
//         </li>
//         <li>
//             <Link style={{textDecoration:"none",color:"white"}} to="/Products">Products</Link>
//    </li>
//       </ul>
//       </nav>
//     </div>
//   )
// }

// export default Navbar

import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";

const Navbar = () => {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  const { cart } = useContext(ProductContext); // <-- Get cart from context
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const navStyle = {
    background: "linear-gradient(90deg, rgba(0,40,80,0.85) 0%, rgba(0,188,212,0.85) 100%)",
    color: "white",
    height: "64px",
    display: "flex",
    alignItems: "center",
    padding: "0 32px",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    justifyContent: "space-between",
    boxSizing: "border-box",
    backdropFilter: "blur(8px)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
    borderBottom: "1.5px solid rgba(255,255,255,0.08)",
  };

  const ulStyle = {
    listStyle: "none",
    display: "flex",
    gap: "32px",
    margin: 0,
    padding: 0,
    flexWrap: "wrap",
  };

  const linkBase = {
    textDecoration: "none",
    color: "white",
    fontSize: "17px",
    fontWeight: "600",
    padding: "6px 0",
    position: "relative",
    letterSpacing: "0.5px",
    transition: "color 0.2s",
    background: "none",
  };

  const getLinkStyle = (path) => ({
    ...linkBase,
    color:
       hovered === path
        ? "#007bff" // Blue on hover
        : location.pathname === path
        ? "#00bcd4"
        : "white",
    transition: "color 0.2s",
  });

  const getUnderlineStyle = (path) => ({
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "3px",
    background:
      location.pathname === path || hovered === path
        ? "linear-gradient(90deg, #00bcd4 0%, #fff 100%)"
        : "transparent",
    borderRadius: "2px",
    transition: "background 0.3s",
  });

  return (
    <div>
      <nav style={navStyle}>
        {/* Logo / Brand name on left */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            letterSpacing: "2px",
            color: "#fff",
            textShadow: "0 2px 8px #00bcd4",
            fontFamily: "Montserrat, sans-serif",
            userSelect: "none",
          }}
        >
          ShopWave
        </div>

        {/* Links on right */}
        <ul style={ulStyle}>
          {[
            { to: "/", label: "Home" },
            { to: "/Cart", label: `Cart${cartCount > 0 ? ` (${cartCount})` : ""}` },
            { to: "/Login", label: "Login" },
            { to: "/Products", label: "Products" },
          ].map((item) => (
            <li key={item.to} style={{ position: "relative" }}>
              <Link
                to={item.to}
                style={getLinkStyle(item.to)}
                onMouseEnter={() => setHovered(item.to)}
                onMouseLeave={() => setHovered(null)}
              >
                {item.label}
                <span style={getUnderlineStyle(item.to)} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Spacer so content doesn’t hide under navbar */}
      <div style={{ marginTop: "64px" }}></div>
    </div>
  );
};

export default Navbar;