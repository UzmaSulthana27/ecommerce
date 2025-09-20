import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Login = () => {
  const [login, setLogin] = useState({ un: "", pass: "" });
  const [signup, setSignup] = useState({ un: "", email: "", pass: "", confirmPass: "" });
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // ✅ toggle state
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  // 🔹 Validation
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

  // 🔹 Input Handlers
  const handleLoginChange = (e) => {
    let { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    setError("");
  };

  const handleSignupChange = (e) => {
    let { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
    setError("");
  };

  // 🔹 Form Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateLogin();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (login.un === "uzzi" && login.pass === "uzzi2725") {
      alert("Login Successful ✅");
      navigate("/Products");
    } else {
      setError("Invalid username or password.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/users", { login });
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateSignup();
    if (validationError) {
      setError(validationError);
      return;
    }

    alert("Signup Successful 🎉 Now login with your credentials.");
    setIsSignup(false); // Switch back to login form

    try {
      await axios.post("http://localhost:5000/users", { signup });
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          height: "100vh",
          fontFamily: "Arial, sans-serif",
        }}
      >
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
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "1rem",
              animation: "float 3s ease-in-out infinite",
            }}
          >
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
            style={{
              width: "60%",
              marginTop: "2rem",
              transform: fadeIn ? "scale(1)" : "scale(0.9)",
              transition: "all 0.8s ease",
            }}
          />
        </div>

        {/* Right Section */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f9f9f9",
          }}
        >
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
            <h2
              style={{
                textAlign: "center",
                color: "#333",
                marginBottom: "1.5rem",
              }}
            >
              {isSignup ? "Create Account ✨" : "Welcome Back 👋"}
            </h2>

            {/* Username */}
            <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              Username
            </label>
            <input
              type="text"
              name="un"
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
                <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
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
            <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              Password
            </label>
            <input
              type="password"
              name="pass"
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
                <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPass"
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
            {error && (
              <p style={{ color: "red", textAlign: "center", margin: "0.5rem 0" }}>
                {error}
              </p>
            )}

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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
                fontSize: "0.9rem",
              }}
            >
              {!isSignup && (
                <span
                  style={{
                    color: "#007bff",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                  onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                >
                  Forgot Password?
                </span>
              )}
              <span
                style={{
                  color: isSignup ? "#007bff" : "#28a745",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
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

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./Navbar";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";

// // ✅ Validation Schemas
// const loginSchema = Yup.object().shape({
//   un: Yup.string()
//     .min(3, "Username must be at least 3 characters")
//     .required("Username is required"),
//   pass: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .matches(/\d/, "Password must contain at least one number")
//     .required("Password is required"),
// });

// const signupSchema = Yup.object().shape({
//   un: Yup.string()
//     .min(3, "Username must be at least 3 characters")
//     .required("Username is required"),
//   email: Yup.string()
//     .email("Enter a valid email")
//     .required("Email is required"),
//   pass: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .matches(/\d/, "Password must contain at least one number")
//     .required("Password is required"),
//   confirmPass: Yup.string()
//     .oneOf([Yup.ref("pass"), null], "Passwords do not match")
//     .required("Confirm password is required"),
// });

// const Login = () => {
//   const [fadeIn, setFadeIn] = useState(false);
//   const [isSignup, setIsSignup] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => setFadeIn(true), 100);
//   }, []);

//   // ✅ Hook Form with Yup
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(isSignup ? signupSchema : loginSchema),
//   });

//   // ✅ Submit Handler
//   const onSubmit = async (data) => {
//     if (isSignup) {
//       alert("Signup Successful 🎉 Now login with your credentials.");
//       setIsSignup(false);

//       try {
//         await axios.post("http://localhost:5000/users", data);
//       } catch (err) {
//         alert("Signup failed. Please try again.");
//       }
//     } else {
//       if (data.un === "uzzi" && data.pass === "uzzi2725") {
//         alert("Login Successful ✅");
//         navigate("/Products");
//       } else {
//         alert("Invalid username or password.");
//       }

//       try {
//         await axios.post("http://localhost:5000/users", data);
//       } catch (err) {
//         alert("Login failed. Please try again.");
//       }
//     }
//     reset();
//   };

//   return (
//     <>
//       <Navbar />
//       <div
//         style={{
//           display: "flex",
//           height: "100vh",
//           fontFamily: "Arial, sans-serif",
//         }}
//       >
//         {/* Left Section */}
//         <div
//           style={{
//             flex: 1,
//             background: "linear-gradient(135deg, #007bff, #0056b3)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             color: "white",
//             flexDirection: "column",
//             padding: "2rem",
//             transition: "all 0.5s ease",
//           }}
//         >
//           <h1
//             style={{
//               fontSize: "2.5rem",
//               marginBottom: "1rem",
//               animation: "float 3s ease-in-out infinite",
//             }}
//           >
//             🛒 MyShop
//           </h1>
//           <p
//             style={{
//               fontSize: "1.2rem",
//               maxWidth: "300px",
//               textAlign: "center",
//               opacity: fadeIn ? 1 : 0,
//               transform: fadeIn ? "translateY(0)" : "translateY(20px)",
//               transition: "all 0.8s ease",
//             }}
//           >
//             Discover amazing deals and shop the latest trends with ease.
//           </p>
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
//             alt="shopping illustration"
//             style={{
//               width: "60%",
//               marginTop: "2rem",
//               transform: fadeIn ? "scale(1)" : "scale(0.9)",
//               transition: "all 0.8s ease",
//             }}
//           />
//         </div>

//         {/* Right Section */}
//         <div
//           style={{
//             flex: 1,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             background: "#f9f9f9",
//           }}
//         >
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             style={{
//               background: "#fff",
//               padding: "2.5rem",
//               borderRadius: "12px",
//               boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//               width: "100%",
//               maxWidth: "380px",
//               opacity: fadeIn ? 1 : 0,
//               transform: fadeIn ? "translateY(0)" : "translateY(30px)",
//               transition: "all 0.8s ease",
//             }}
//           >
//             <h2
//               style={{
//                 textAlign: "center",
//                 color: "#333",
//                 marginBottom: "1.5rem",
//               }}
//             >
//               {isSignup ? "Create Account ✨" : "Welcome Back 👋"}
//             </h2>

//             {/* Username */}
//             <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
//               Username
//             </label>
//             <input
//               type="text"
//               {...register("un")}
//               style={{
//                 width: "100%",
//                 padding: "0.8rem",
//                 marginBottom: "0.3rem",
//                 border: "1px solid #ddd",
//                 borderRadius: "6px",
//                 outline: "none",
//                 transition: "all 0.3s ease",
//               }}
//             />
//             <p style={{ color: "red", marginBottom: "0.8rem" }}>
//               {errors.un?.message}
//             </p>

//             {/* Email only for signup */}
//             {isSignup && (
//               <>
//                 <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   {...register("email")}
//                   style={{
//                     width: "100%",
//                     padding: "0.8rem",
//                     marginBottom: "0.3rem",
//                     border: "1px solid #ddd",
//                     borderRadius: "6px",
//                     outline: "none",
//                     transition: "all 0.3s ease",
//                   }}
//                 />
//                 <p style={{ color: "red", marginBottom: "0.8rem" }}>
//                   {errors.email?.message}
//                 </p>
//               </>
//             )}

//             {/* Password */}
//             <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
//               Password
//             </label>
//             <input
//               type="password"
//               {...register("pass")}
//               style={{
//                 width: "100%",
//                 padding: "0.8rem",
//                 marginBottom: "0.3rem",
//                 border: "1px solid #ddd",
//                 borderRadius: "6px",
//                 outline: "none",
//                 transition: "all 0.3s ease",
//               }}
//             />
//             <p style={{ color: "red", marginBottom: "0.8rem" }}>
//               {errors.pass?.message}
//             </p>

//             {/* Confirm Password only for signup */}
//             {isSignup && (
//               <>
//                 <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   {...register("confirmPass")}
//                   style={{
//                     width: "100%",
//                     padding: "0.8rem",
//                     marginBottom: "0.3rem",
//                     border: "1px solid #ddd",
//                     borderRadius: "6px",
//                     outline: "none",
//                     transition: "all 0.3s ease",
//                   }}
//                 />
//                 <p style={{ color: "red", marginBottom: "0.8rem" }}>
//                   {errors.confirmPass?.message}
//                 </p>
//               </>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               style={{
//                 width: "100%",
//                 padding: "0.9rem",
//                 background: "#007bff",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "6px",
//                 fontSize: "1.1rem",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//                 marginTop: "0.5rem",
//                 transition: "all 0.3s ease",
//               }}
//               onMouseOver={(e) => {
//                 e.target.style.background = "#0056b3";
//                 e.target.style.transform = "scale(1.05)";
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.background = "#007bff";
//                 e.target.style.transform = "scale(1)";
//               }}
//             >
//               {isSignup ? "Signup" : "Login"}
//             </button>

//             {/* Toggle */}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 marginTop: "1rem",
//                 fontSize: "0.9rem",
//               }}
//             >
//               {!isSignup && (
//                 <span
//                   style={{
//                     color: "#007bff",
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                   }}
//                   onMouseOver={(e) =>
//                     (e.target.style.textDecoration = "underline")
//                   }
//                   onMouseOut={(e) => (e.target.style.textDecoration = "none")}
//                 >
//                   Forgot Password?
//                 </span>
//               )}
//               <span
//                 style={{
//                   color: isSignup ? "#007bff" : "#28a745",
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                 }}
//                 onMouseOver={(e) =>
//                   (e.target.style.textDecoration = "underline")
//                 }
//                 onMouseOut={(e) => (e.target.style.textDecoration = "none")}
//                 onClick={() => {
//                   setIsSignup(!isSignup);
//                   reset();
//                 }}
//               >
//                 {isSignup ? "Login" : "Signup"}
//               </span>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
