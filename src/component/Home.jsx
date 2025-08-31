
import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const carouselImages = [
  {
  src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
  title: 'Big Sale!',
  desc: 'Up to 50% off on electronics'
},
  {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    title: 'New Arrivals',
    desc: 'Latest fashion trends'
  },
  {
    src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80',
    title: 'Shop Essentials',
    desc: 'Everything for your home'
  }
];
 const features = [
    {
      icon: "🛒",
      title: "Easy Shopping",
      description: "Browse and purchase products with ease",
    },
    {
      icon: "⭐",
      title: "Quality Products",
      description: "Handpicked items for the best experience",
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Quick and reliable shipping to your door",
    },
    {
      icon: "🔒",
      title: "Secure Payments",
      description: "Safe and encrypted payment processing",
    },
  ];

const Home = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 3500);
    return () => clearTimeout(timer);
  }, [current]);

  const goPrev = () => setCurrent((current - 1 + carouselImages.length) % carouselImages.length);
  const goNext = () => setCurrent((current + 1) % carouselImages.length);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #e3e8ff 60%, #f5f5f5 100%)',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      <Navbar />
      <div style={{ marginTop: '80px' }}>
        {/* Full Width Carousel */}
        <div style={{
          position: 'relative',
          width: 'auto',
          height: '420px',
          maxHeight: '60vh',
          overflow: 'hidden',
          // borderRadius: '0 0 32px 32px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          background: '#fff',
          animation: 'fadeIn 1s'
        }}>
          {carouselImages.map((img, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: current === idx ? 1 : 0,
                transition: 'opacity 0.7s',
                zIndex: current === idx ? 2 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(90deg, rgba(0,40,80,0.25) 0%, rgba(0,188,212,0.15) 100%), url(${img.src}) center/cover no-repeat`
              }}
            >
              <div style={{
                background: 'rgba(0,40,80,0.45)',
                borderRadius: '18px',
                padding: '32px 56px',
                color: '#fff',
                boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
                textAlign: 'center',
                animation: current === idx ? 'slideUp 0.7s' : 'none'
              }}>
                <h2 style={{
                  fontSize: '2.6rem',
                  fontWeight: 'bold',
                  marginBottom: '14px',
                  letterSpacing: '1px',
                  textShadow: '0 2px 8px #007bff'
                }}>{img.title}</h2>
                <p style={{
                  fontSize: '1.25rem',
                  marginBottom: '22px',
                  letterSpacing: '0.5px'
                }}>{img.desc}</p>
                <Link to="/Login" style={{
                  background: 'linear-gradient(90deg, #007bff 60%, #00bcd4 100%)',
                  color: '#fff',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '1.15rem',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0,123,255,0.08)',
                  transition: 'background 0.2s, box-shadow 0.2s'
                }}>Shop Now</Link>
              </div>
            </div>
          ))}
          {/* Carousel Controls */}
          <button
            onClick={goPrev}
            style={{
              position: 'absolute',
              top: '50%',
              left: '32px',
              transform: 'translateY(-50%)',
              background: 'rgba(0,123,255,0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,123,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            aria-label="Previous"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={goNext}
            style={{
              position: 'absolute',
              top: '50%',
              right: '32px',
              transform: 'translateY(-50%)',
              background: 'rgba(0,123,255,0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,123,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            aria-label="Next"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <Outlet />
      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
//           {features.map((f, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 20%",
                border: "1px solid rgba(255,255,255,0.1)",
                textAlign: "center",
                padding: "20px",
                borderRadius: "6px",
                background: "transparent",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "8px" }}>{f.icon}</div>
              <h3>
                {f.title}
              </h3>
              <p >{f.description}</p>
            </div>
          ))}
        </div>
         <div style={{ textAlign: "center", marginTop: "4rem" }}>
//           <h2>
//             Why Choose Us?
//           </h2>

//           <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "2rem",
              marginTop: "2rem",
            }}
          >
            <div style={{ flex: "1 1 50%" }}>
              <img
                src="/src/assets/award.png"
                alt="Best Award"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  borderRadius: "12px",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
                }}
              />
            </div>
            <div style={{ flex: "1 1 50%", textAlign: "left" }}>
              <h3 >
                We're Your Best Choice
              </h3>
              <p >
                We provide the best shopping experience with quality products,
                competitive prices, and excellent customer service. Our
                commitment to customer satisfaction makes us your trusted online
                shopping destination.
              </p>
              <p >
                With years of experience in the industry, we've built a
                reputation for reliability, quality, and exceptional service.
                Our team of experts ensures that every product meets our high
                standards.
              </p>
            </div>
          </div>
        </div>
      <Footer/>
    </div>
  );
};

export default Home;

