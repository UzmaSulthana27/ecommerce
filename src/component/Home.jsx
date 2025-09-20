
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  FaShoppingCart,
  FaStar,
  FaTruck,
  FaLock,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    title: "Smart Inventory Management",
    description: "Efficient tracking and management of your products",
  },
  {
    url: "https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg",
    title: "Fast Delivery Service",
    description: "Quick and reliable shipping to your doorstep",
  },
  {
    url: "https://img.freepik.com/free-vector/product-quality-concept-illustration_114360-6345.jpg",
    title: "Quality Products",
    description: "Handpicked items for the best shopping experience",
  },
  {
    url: "https://img.freepik.com/free-vector/secure-payment-concept-illustration_114360-4568.jpg",
    title: "Secure Shopping",
    description: "Safe and encrypted payment processing",
  },
];

const features = [
  {
    icon: <FaShoppingCart size={36} color="#2563eb" />,
    title: "Easy Shopping",
    description: "Browse and purchase products with ease",
  },
  {
    icon: <FaStar size={36} color="#fbbf24" />,
    title: "Quality Products",
    description: "Handpicked items for the best experience",
  },
  {
    icon: <FaTruck size={36} color="#10b981" />,
    title: "Fast Delivery",
    description: "Quick and reliable shipping to your door",
  },
  {
    icon: <FaLock size={36} color="#ef4444" />,
    title: "Secure Payments",
    description: "Safe and encrypted payment processing",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );

  return (
    <div className="home-root">
      {/* Internal CSS */}
      <style>{`
        :root{
          --bg-from: #e3f0ff;
          --bg-to: #f9e7ff;
          --primary: #2563eb;
          --primary-dark: #1e40af;
          --muted: #6b7280;
          --card-shadow: 0 6px 20px rgba(16,24,40,0.06);
        }

        .home-root{
          min-height: 100vh;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          color: #0f172a;
          background: linear-gradient(135deg, var(--bg-from) 0%, var(--bg-to) 100%);
        }

        /* ---------- Carousel ---------- */
        .carousel {
          position: relative;
          height: 85vh;
          min-height: 400px;
          overflow: hidden;
          margin-bottom: 4rem;
        }

        .carousel-slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 0.7s ease-in-out, transform 0.7s ease-in-out;
          transform: scale(1.02);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-slide.active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }

        .carousel-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
        }

        .carousel-content {
          position: relative;
          z-index: 3;
          color: #fff;
          text-align: center;
          padding: 0 24px;
          max-width: 980px;
        }

        .carousel-title {
          font-size: 2.6rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          line-height: 1.05;
          text-shadow: 0 6px 20px rgba(0,0,0,0.35);
        }

        @media(min-width:1024px){
          .carousel-title { font-size: 3.6rem; }
        }

        .carousel-desc {
          font-size: 1.12rem;
          margin-bottom: 1.25rem;
          color: rgba(230,240,251,0.95);
        }

        .btn-primary {
          display: inline-block;
          background: var(--primary);
          color: #fff;
          padding: 12px 22px;
          border-radius: 10px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 6px 18px rgba(37,99,235,0.14);
          transition: transform .15s ease, background .15s ease;
        }

        .btn-primary:hover { background: var(--primary-dark); transform: translateY(-3px); }

        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.16);
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: background .16s ease, transform .12s ease;
          z-index: 4;
          backdrop-filter: blur(4px);
        }

        .nav-button:hover{ background: rgba(255,255,255,0.32); transform: translateY(-50%) scale(1.06); }

        .nav-left{ left: 12px; }
        .nav-right{ right: 12px; }

        .indicators {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 5;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: background .15s ease, transform .12s ease;
        }

        .indicator.active { background: #fff; transform: scale(1.15); }

        /* ---------- Hero ---------- */
        .hero {
          max-width: 1200px;
          margin: -6.5rem auto 3rem;
          display: flex;
          gap: 28px;
          align-items: center;
          padding: 0 20px;
          flex-wrap: wrap;
        }

        .hero-left { flex: 1 1 480px; min-width: 280px; }
        .hero-right { flex: 1 1 420px; display:flex; justify-content:center; }

        .hero-title { font-size: 2.4rem; font-weight: 900; color: #0f172a; margin-bottom: 12px; }
        .hero-desc { color: var(--muted); margin-bottom: 18px; font-size: 1.05rem; line-height: 1.6; max-width: 520px; }

        .hero-illustration { width: 100%; max-width: 520px; border-radius: 14px; box-shadow: 0 14px 40px rgba(2,6,23,0.08); }

        /* ---------- Features ---------- */
        .features { max-width: 1200px; margin: 0 auto 3.5rem; padding: 0 20px; }
        .features-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 18px; }

        @media(min-width:640px){ .features-grid { grid-template-columns: repeat(2,1fr); } }
        @media(min-width:1024px){ .features-grid { grid-template-columns: repeat(4,1fr); } }

        .feature-card {
          background: #fff;
          padding: 28px;
          border-radius: 14px;
          box-shadow: var(--card-shadow);
          text-align: center;
          transition: transform .25s ease, box-shadow .25s ease;
          display:flex;
          flex-direction:column;
          align-items:center;
        }

        .feature-card:hover { transform: translateY(-8px); box-shadow: 0 22px 50px rgba(16,24,40,0.12); }

        .feature-icon {
          width: 72px;
          height: 72px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius: 999px;
          margin-bottom: 14px;
          background: linear-gradient(135deg, rgba(239,246,255,1), rgba(241,244,255,1));
        }

        .feature-title { font-size: 1.05rem; font-weight: 700; margin-bottom: 8px; }

        .feature-desc { color: var(--muted); font-size: 0.98rem; }

        /* ---------- Why Choose Us ---------- */
        .why { max-width: 1200px; margin: 0 auto 4rem; padding: 0 20px; display:flex; gap: 24px; align-items:center; flex-wrap:wrap; }
        .why-img { flex: 1 1 420px; }
        .why-content { flex: 1 1 520px; min-width: 260px; }

        .why-title { font-size:1.6rem; font-weight: 800; margin-bottom: 12px; }
        .why-text { color: var(--muted); margin-bottom: 10px; line-height: 1.7; }

        /* Small screens adjustments */
        @media(max-width:780px){
          .carousel-title { font-size: 1.9rem; }
          .hero { margin-top: -3.5rem; }
          .nav-button { width:40px; height:40px; }
        }
      `}</style>

      <Navbar />

      {/* Carousel */}
      <section className="carousel" aria-label="Homepage carousel">
        {carouselImages.map((img, idx) => (
          <div
            key={idx}
            className={`carousel-slide ${idx === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${img.url})` }}
            role="img"
            aria-hidden={idx === currentSlide ? "false" : "true"}
          >
            <div className="carousel-overlay" aria-hidden="true" />
            <div className="carousel-content">
              <h2 className="carousel-title">{img.title}</h2>
              <p className="carousel-desc">{img.description}</p>
              <Link to="/login" className="btn-primary" aria-label="Explore products">
                Explore Products
              </Link>
            </div>
          </div>
        ))}

        <button
          className="nav-button nav-left"
          onClick={prevSlide}
          aria-label="Previous slide"
          title="Previous"
        >
          <FaChevronLeft />
        </button>

        <button
          className="nav-button nav-right"
          onClick={nextSlide}
          aria-label="Next slide"
          title="Next"
        >
          <FaChevronRight />
        </button>

        <div className="indicators" aria-hidden="false">
          {carouselImages.map((_, idx) => (
            <div
              key={idx}
              className={`indicator ${idx === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" ? setCurrentSlide(idx) : null)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Hero */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-left">
          <h1 id="hero-heading" className="hero-title">Welcome to Our Store</h1>
          <p className="hero-desc">
            Discover amazing products at unbeatable prices. Shop with confidence
            and enjoy premium quality — curated selections, simple checkout, and fast shipping.
          </p>
          <Link to="/login" className="btn-primary" aria-label="Start shopping">
            Start Shopping
          </Link>
        </div>
        <div className="hero-right">
          <img
            src="https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg"
            alt="Online shopping illustration"
            className="hero-illustration"
            loading="lazy"
          />
        </div>
      </section>

      {/* Features */}
      <section className="features" aria-labelledby="features-heading">
        <h2 id="features-heading" style={{ textAlign: "center", fontSize: "1.9rem", fontWeight: 800, marginBottom: 18 }}>
          Key Features
        </h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <article key={i} className="feature-card" aria-labelledby={`feature-${i}-title`}>
              <div className="feature-icon">{f.icon}</div>
              <h3 id={`feature-${i}-title`} className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="why" aria-labelledby="why-heading">
        <div className="why-img">
          <img
            src="https://img.freepik.com/free-vector/teamwork-concept-illustration_114360-896.jpg"
            alt="Teamwork illustration"
            style={{ width: "100%", borderRadius: 12, boxShadow: "0 14px 40px rgba(2,6,23,0.08)" }}
            loading="lazy"
          />
        </div>
        <div className="why-content">
          <h3 id="why-heading" className="why-title">We're Your Best Choice</h3>
          <p className="why-text">
            We provide the best shopping experience with quality products,
            competitive prices, and excellent customer service. Our commitment
            to customer satisfaction makes us your trusted online shopping destination.
          </p>
          <p className="why-text">
            With years of experience in the industry, we've built a reputation
            for reliability, quality, and exceptional service.
          </p>
          <div className="call-to-action">
            <Link to="/about" className="btn-primary">Learn More</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
