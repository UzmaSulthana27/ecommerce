import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // axios instance (see snippet below)
import Navbar from "./Navbar";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [login, setLogin] = useState({ un: "", pass: "" });
  const [signup, setSignup] = useState({ un: "", email: "", pass: "", confirmPass: "" });
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const { login: setAuth } = useContext(AuthContext); // login(token, userData)

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  // Validation
  const validateLogin = () => {
    if (!login.un || !login.pass) return "Please enter both username and password.";
    if (login.un.length < 3) return "Username must be at least 3 characters.";
    if (login.pass.length < 6) return "Password must be at least 6 characters.";
    if (!/\d/.test(login.pass)) return "Password must contain at least one number.";
    return "";
  };

  const validateSignup = () => {
    if (!signup.un || !signup.email || !signup.pass || !signup.confirmPass)
      return "All fields are required.";
    if (signup.un.length < 3) return "Username must be at least 3 characters.";
    if (!/\S+@\S+\.\S+/.test(signup.email)) return "Enter a valid email.";
    if (signup.pass.length < 6) return "Password must be at least 6 characters.";
    if (!/\d/.test(signup.pass)) return "Password must contain at least one number.";
    if (signup.pass !== signup.confirmPass) return "Passwords do not match.";
    return "";
  };

  // Input Handlers
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin((p) => ({ ...p, [name]: value }));
    setError("");
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignup((p) => ({ ...p, [name]: value }));
    setError("");
  };

  // Form Submit - LOGIN
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateLogin();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Call backend login endpoint
      // server should return { accessToken, user } and optionally set HttpOnly refresh cookie
      const resp = await api.post("/auth/login", {
        username: login.un,
        password: login.pass,
      });

      const { accessToken, user } = resp.data;

      if (!accessToken) {
        setError("Login failed: no token received from server.");
        return;
      }

      // save token & user to context
      setAuth(accessToken, user);

      // clear local form state and redirect
      setLogin({ un: "", pass: "" });
      navigate("/products"); // lowercase based on your routes
    } catch (err) {
      // show friendly error
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else if (err.response && err.response.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("Network or server error. Please try again.");
      }
      console.error("Login error:", err);
    }
  };

  // Form Submit - SIGNUP
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateSignup();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Call backend register endpoint
      // server might return created user or a success message
      await api.post("/auth/register", {
        username: signup.un,
        email: signup.email,
        password: signup.pass,
      });

      // success flow
      alert("Signup successful! Please login with your new credentials.");
      setSignup({ un: "", email: "", pass: "", confirmPass: "" });
      setIsSignup(false);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Signup failed. Please try again.");
      }
      console.error("Signup error:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
        {/* Left Section */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #007bff, #0056b3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            flexDirection: "column",
            padding: "2rem",
            transition: "all 0.5s ease",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", animation: "float 3s ease-in-out infinite" }}>
            🛒 MyShop
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              maxWidth: "300px",
              textAlign: "center",
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease",
            }}
          >
            Discover amazing deals and shop the latest trends with ease.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
            alt="shopping illustration"
            style={{ width: "60%", marginTop: "2rem", transform: fadeIn ? "scale(1)" : "scale(0.9)", transition: "all 0.8s ease" }}
          />
        </div>

        {/* Right Section */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", background: "#f9f9f9" }}>
          <form
            onSubmit={isSignup ? handleSignupSubmit : handleLoginSubmit}
            style={{
              background: "#fff",
              padding: "2.5rem",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              width: "100%",
              maxWidth: "380px",
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease",
            }}
          >
            <h2 style={{ textAlign: "center", color: "#333", marginBottom: "1.5rem" }}>
              {isSignup ? "Create Account ✨" : "Welcome Back 👋"}
            </h2>

            {/* Username */}
            <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Username</label>
            <input
              type="text"
              name="un"
              value={isSignup ? signup.un : login.un}
              onChange={isSignup ? handleSignupChange : handleLoginChange}
              style={{
                width: "100%",
                padding: "0.8rem",
                marginBottom: "1rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
              onBlur={(e) => (e.target.style.border = "1px solid #ddd")}
            />

            {/* Email only for signup */}
            {isSignup && (
              <>
                <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={signup.email}
                  onChange={handleSignupChange}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    marginBottom: "1rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    outline: "none",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
                  onBlur={(e) => (e.target.style.border = "1px solid #ddd")}
                />
              </>
            )}

            {/* Password */}
            <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Password</label>
            <input
              type="password"
              name="pass"
              value={isSignup ? signup.pass : login.pass}
              onChange={isSignup ? handleSignupChange : handleLoginChange}
              style={{
                width: "100%",
                padding: "0.8rem",
                marginBottom: "1rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
              onBlur={(e) => (e.target.style.border = "1px solid #ddd")}
            />

            {/* Confirm Password only for signup */}
            {isSignup && (
              <>
                <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPass"
                  value={signup.confirmPass}
                  onChange={handleSignupChange}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    marginBottom: "1rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    outline: "none",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
                  onBlur={(e) => (e.target.style.border = "1px solid #ddd")}
                />
              </>
            )}

            {/* Error */}
            {error && <p style={{ color: "red", textAlign: "center", margin: "0.5rem 0" }}>{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.9rem",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "1.1rem",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "0.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#0056b3";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "#007bff";
                e.target.style.transform = "scale(1)";
              }}
            >
              {isSignup ? "Signup" : "Login"}
            </button>

            {/* Toggle */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", fontSize: "0.9rem" }}>
              {!isSignup && (
                <span
                  style={{ color: "#007bff", cursor: "pointer", transition: "all 0.3s ease" }}
                  onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                  onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                >
                  Forgot Password?
                </span>
              )}
              <span
                style={{ color: isSignup ? "#007bff" : "#28a745", cursor: "pointer", transition: "all 0.3s ease" }}
                onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError("");
                }}
              >
                {isSignup ? "Login" : "Signup"}
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
