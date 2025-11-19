import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // axios instance (baseURL + withCredentials)
import Navbar from "./Navbar";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  // renamed local login state to avoid name collision with context.login
  const [creds, setCreds] = useState({ un: "", pass: "" });
  const [signupData, setSignupData] = useState({ un: "", email: "", pass: "", confirmPass: "" });
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // Safety: if AuthContext not provided, show a friendly message instead of crashing
  if (!auth) {
    return (
      <>
        <Navbar />
        <div style={{ padding: 40, textAlign: "center" }}>
          <h2>Authentication not initialized</h2>
          <p>
            Auth provider is missing. Make sure <code>AuthProvider</code> wraps your app.
          </p>
        </div>
      </>
    );
  }

  // auth.login is the function from context (login(accessToken, userObj))
  const { login: loginContext } = auth;

  useEffect(() => {
    const t = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Validation functions
  const validateLogin = () => {
    if (!creds.un || !creds.pass) return "Please enter both username and password.";
    if (creds.un.length < 3) return "Username must be at least 3 characters.";
    if (creds.pass.length < 6) return "Password must be at least 6 characters.";
    if (!/\d/.test(creds.pass)) return "Password must contain at least one number.";
    return "";
  };

  const validateSignup = () => {
    if (!signupData.un || !signupData.email || !signupData.pass || !signupData.confirmPass)
      return "All fields are required.";
    if (signupData.un.length < 3) return "Username must be at least 3 characters.";
    if (!/\S+@\S+\.\S+/.test(signupData.email)) return "Enter a valid email.";
    if (signupData.pass.length < 6) return "Password must be at least 6 characters.";
    if (!/\d/.test(signupData.pass)) return "Password must contain at least one number.";
    if (signupData.pass !== signupData.confirmPass) return "Passwords do not match.";
    return "";
  };

  // Handlers
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setCreds((p) => ({ ...p, [name]: value }));
    setError("");
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((p) => ({ ...p, [name]: value }));
    setError("");
  };

  // Submit - Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateLogin();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const resp = await api.post("/auth/login", {
        username: creds.un,
        password: creds.pass,
      });

      const { accessToken, user } = resp.data;
      if (!accessToken) {
        setError("Login failed: no token received from server.");
        setLoading(false);
        return;
      }

      // save token & user using AuthContext
      loginContext(accessToken, user);

      // clear local form and redirect
      setCreds({ un: "", pass: "" });
      navigate("/products");
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.msg || err.response.data.message || "Login failed.");
      } else {
        setError("Network or server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Submit - Signup
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateSignup();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", {
        username: signupData.un,
        email: signupData.email,
        password: signupData.pass,
      });

      alert("Signup successful! Please login with your new credentials.");
      setSignupData({ un: "", email: "", pass: "", confirmPass: "" });
      setIsSignup(false);
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.msg || err.response.data.message || "Signup failed.");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
        {/* Left */}
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

        {/* Right: Form */}
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
              value={isSignup ? signupData.un : creds.un}
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
              disabled={loading}
            />

            {/* Email (signup) */}
            {isSignup && (
              <>
                <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
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
                  disabled={loading}
                />
              </>
            )}

            {/* Password */}
            <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Password</label>
            <input
              type="password"
              name="pass"
              value={isSignup ? signupData.pass : creds.pass}
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
              disabled={loading}
            />

            {/* Confirm (signup) */}
            {isSignup && (
              <>
                <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPass"
                  value={signupData.confirmPass}
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
                  disabled={loading}
                />
              </>
            )}

            {/* Error */}
            {error && <p style={{ color: "red", textAlign: "center", margin: "0.5rem 0" }}>{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.9rem",
                background: loading ? "#6ea0ff" : "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "1.1rem",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "bold",
                marginTop: "0.5rem",
                transition: "all 0.3s ease",
              }}
            >
              {loading ? (isSignup ? "Signing up..." : "Logging in...") : isSignup ? "Signup" : "Login"}
            </button>

            {/* Toggle */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", fontSize: "0.9rem" }}>
              {!isSignup && (
                <span style={{ color: "#007bff", cursor: "pointer" }}>Forgot Password?</span>
              )}
              <span
                style={{ color: isSignup ? "#007bff" : "#28a745", cursor: "pointer" }}
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
