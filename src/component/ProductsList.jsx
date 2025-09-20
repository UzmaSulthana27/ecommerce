// import React, { useContext } from 'react';
// import ProductCard from './ProductCard';
// import { ProductContext } from '../Context/ProductContext';
// import Navbar from './Navbar';

// const ProductsList = () => {
//   const { products } = useContext(ProductContext);

//   if (!products.length) return <p>Loading products...</p>;

//   return (
//     <>
//      <Navbar />
//     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
//       {products.map(product => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
   
//     </>
//   );
// };

// export default ProductsList;



import React, { useContext, useRef } from "react";
import ProductCard from "./ProductCard";
import { ProductContext } from "../Context/ProductContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProductsList = () => {
  const { products, addToCart } = useContext(ProductContext);

  if (!products.length) return <p>Loading products...</p>;

  const categories = [...new Set(products.map((p) => p.category))];
  const scrollRefs = useRef({});

  // Pick best selling & cheapest
  const bestSelling = [...products].sort((a, b) => b.rating - a.rating)[0];
  const cheapest = [...products].sort((a, b) => a.price - b.price)[0];

  // Internal CSS
  const styles = {
    page: { padding: "20px" },
    categorySection: { marginBottom: "60px" },
    categoryHeader: {
      marginBottom: "12px",
    },
    title: {
      fontSize: "22px",
      fontWeight: "bold",
      fontFamily: "Poppins",
      borderLeft: "5px solid #007bff",
      paddingLeft: "10px",
    },
    scrollContainer: {
      display: "flex",
      gap: "16px",
      overflowX: "auto",
      padding: "10px 0",
      scrollSnapType: "x mandatory",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
    },
    productCard: { scrollSnapAlign: "start" },

    // 🔥 Banner Styles
    banner: {
      margin: "40px 0",
      padding: "25px",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      color: "white",
      fontFamily: "Poppins, sans-serif",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    bannerHover: {
      transform: "translateY(-5px) scale(1.02)",
      boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
    },
    bannerBest: {
      background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    },
    bannerCheap: {
      background: "linear-gradient(135deg, #43e97b, #38f9d7)",
    },
    bannerContent: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      maxWidth: "60%",
    },
    bannerLabel: {
      fontSize: "14px",
      letterSpacing: "2px",
      fontWeight: "600",
      opacity: 0.9,
      textTransform: "uppercase",
    },
    bannerTitle: {
      fontSize: "26px",
      fontWeight: "800",
      lineHeight: "1.2",
      textShadow: "0 2px 6px rgba(0,0,0,0.25)",
    },
    bannerSub: {
      fontSize: "16px",
      opacity: 0.9,
    },
    bannerImage: {
      height: "140px",
      borderRadius: "12px",
      transition: "transform 0.3s ease",
    },
    bannerBtnRow: {
      display: "flex",
      gap: "12px",
      marginTop: "12px",
    },
    bannerBtn: {
      padding: "10px 18px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "15px",
      transition: "0.3s",
    },
    addBtn: {
      background: "#fff",
      color: "#ff416c",
    },
    buyBtn: {
      background: "#222",
      color: "#fff",
    },
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        {categories.map((category, index) => (
          <div key={category} style={styles.categorySection}>
            {/* Category Header */}
            <div style={styles.categoryHeader}>
              <h2 style={styles.title}>{category.toUpperCase()}</h2>
            </div>

            {/* Scrollable Row */}
            <div
              style={styles.scrollContainer}
              ref={(el) => (scrollRefs.current[category] = el)}
            >
              {products
                .filter((p) => p.category === category)
                .map((product) => (
                  <div key={product.id} style={styles.productCard}>
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>

            {/* Banner */}
            {index % 2 === 0 ? (
              <div
                style={{ ...styles.banner, ...styles.bannerBest }}
                onMouseOver={(e) =>
                  Object.assign(e.currentTarget.style, styles.bannerHover)
                }
                onMouseOut={(e) =>
                  Object.assign(e.currentTarget.style, {
                    transform: "none",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  })
                }
              >
                <div style={styles.bannerContent}>
                  <span style={styles.bannerLabel}>🔥 Hot Pick</span>
                  <h3 style={styles.bannerTitle}>Best Selling Product</h3>
                  <p style={styles.bannerSub}>
                    {bestSelling?.title} – Rated {bestSelling?.rating}★
                  </p>
                  <div style={styles.bannerBtnRow}>
                    <button
                      style={{ ...styles.bannerBtn, ...styles.addBtn }}
                      onClick={() => addToCart(bestSelling.id)}
                    >
                      Add to Cart
                    </button>
                    <button
                      
                      style={{ ...styles.bannerBtn, ...styles.buyBtn }}
                      onClick={() => alert("Proceeding to buy now 🚀")}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
                <img
                  src={bestSelling.thumbnail}
                  alt={bestSelling.title}
                  style={styles.bannerImage}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            ) : (
              <div
                style={{ ...styles.banner, ...styles.bannerCheap }}
                onMouseOver={(e) =>
                  Object.assign(e.currentTarget.style, styles.bannerHover)
                }
                onMouseOut={(e) =>
                  Object.assign(e.currentTarget.style, {
                    transform: "none",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  })
                }
              >
                <div style={styles.bannerContent}>
                  <span style={styles.bannerLabel}>💰 Save More</span>
                  <h3 style={styles.bannerTitle}>Cheapest Deal</h3>
                  <p style={styles.bannerSub}>
                    {cheapest?.title} – Only ${cheapest?.price}
                  </p>
                  <div style={styles.bannerBtnRow}>
                    <button
                      style={{ ...styles.bannerBtn, ...styles.addBtn }}
                      onClick={() => addToCart(cheapest.id)}
                    >
                      Add to Cart
                    </button>
                    <button
                      style={{ ...styles.bannerBtn, ...styles.buyBtn }}
                      onClick={() => alert("Proceeding to buy now 🚀")}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
                <img
                  src={cheapest.thumbnail}
                  alt={cheapest.title}
                  style={styles.bannerImage}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ProductsList;
