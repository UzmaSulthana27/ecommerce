// import React, { useContext } from 'react';
// import { ProductContext } from '../Context/ProductContext';


// const Cart = () => {
//   const { cart, products, increment, decrement, removeFromCart } = useContext(ProductContext);

//   const cartItems = Object.entries(cart); // [[id, qty], ...]

//   if (!cartItems.length) {
//     return <p>Your cart is empty.</p>;
//   }

//   return (
//     <div>
//       <h2>Your Cart</h2>
//       {cartItems.map(([id, qty]) => {
//         const product = products.find(p => p.id === parseInt(id));
//         return (
//           <div key={id} style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             padding: '8px 0',
//             borderBottom: '1px solid #eee'
//           }}>
//             <span>{product?.title} - ${product?.price}</span>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               <button onClick={() => decrement(product.id)} style={{ padding: '4px 8px' }}>−</button>
//               <span style={{ margin: '0 8px' }}>{qty}</span>
//               <button onClick={() => increment(product.id)} style={{ padding: '4px 8px' }}>+</button>
//               <button onClick={() => removeFromCart(product.id)} style={{ marginLeft: '10px', padding: '4px 8px' }}>
//                 Remove
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Cart;

// import React, { useContext } from 'react';
// import { ProductContext } from '../Context/ProductContext';
// import Navbar from './Navbar';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const { cart, products, increment, decrement, removeFromCart } = useContext(ProductContext);
//   const navigate = useNavigate();

//   const cartItems = Object.entries(cart); // [[id, qty], ...]

//   // ✅ If cart is empty
//   if (!cartItems.length) {
//     return (
//       <>
//         <Navbar />
//         <div style={{
//           maxWidth: '650px',
//           margin: '40px auto',
//           background: '#fff',
//           borderRadius: '10px',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//           padding: '40px',
//           textAlign: 'center'
//         }}>
//           <h2 style={{ marginBottom: '20px', color: '#555' }}>🛒 Your cart is empty</h2>
//           <p style={{ marginBottom: '25px', fontSize: '1rem', color: '#777' }}>
//             Looks like you haven’t added anything yet.
//           </p>
//           <button 
//             onClick={() => navigate('/products')}   // ✅ Redirects to products page
//             style={{
//               padding: '12px 28px',
//               background: '#007bff',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '8px',
//               fontSize: '1rem',
//               fontWeight: 'bold',
//               cursor: 'pointer',
//               boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
//               transition: 'background 0.3s ease'
//             }}
//             onMouseEnter={(e) => (e.target.style.background = "#0056b3")}
//             onMouseLeave={(e) => (e.target.style.background = "#007bff")}
//           >
//             Buy Now
//           </button>
//         </div>
//       </>
//     );
//   }

//   // ✅ Calculate total price
//   const totalPrice = cartItems.reduce((sum, [id, qty]) => {
//     const product = products.find(p => p.id === parseInt(id));
//     return sum + (product?.price || 0) * qty;
//   }, 0);

//   return (
//     <>
//       <Navbar />
//       <div style={{
//         maxWidth: '700px',
//         margin: '30px auto',
//         background: '#fff',
//         borderRadius: '10px',
//         boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//         padding: '24px'
//       }}>
//         <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>Your Cart</h2>
        
//         {cartItems.map(([id, qty]) => {
//           const product = products.find(p => p.id === parseInt(id));
//           return (
//             <div key={id} style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               padding: '16px 0',
//               borderBottom: '1px solid #eee'
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
//                 <img
//                   src={product?.thumbnail}
//                   alt={product?.title}
//                   style={{
//                     width: '60px',
//                     height: '60px',
//                     objectFit: 'cover',
//                     borderRadius: '6px',
//                     marginRight: '16px',
//                     border: '1px solid #ddd'
//                   }}
//                 />
//                 <div>
//                   <div style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{product?.title}</div>
//                   <div style={{ color: '#555', fontSize: '0.95rem' }}>${product?.price}</div>
//                 </div>
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <button
//                   onClick={() => decrement(product.id)}
//                   style={{
//                     padding: '6px 12px',
//                     background: '#007bff',
//                     border: 'none',
//                     color: '#fff',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                     fontWeight: 'bold',
//                     marginRight: '4px',
//                     transition: 'background 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => (e.target.style.background = "#0056b3")}
//                   onMouseLeave={(e) => (e.target.style.background = "#007bff")}
//                 >−</button>
//                 <span style={{ margin: '0 8px', minWidth: '24px', textAlign: 'center', fontWeight: 'bold' }}>{qty}</span>
//                 <button
//                   onClick={() => increment(product.id)}
//                   style={{
//                     padding: '6px 12px',
//                     background: '#007bff',
//                     border: 'none',
//                     color: '#fff',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                     fontWeight: 'bold',
//                     marginLeft: '4px',
//                     transition: 'background 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => (e.target.style.background = "#0056b3")}
//                   onMouseLeave={(e) => (e.target.style.background = "#007bff")}
//                 >+</button>
//                 <button
//                   onClick={() => removeFromCart(product.id)}
//                   style={{
//                     marginLeft: '14px',
//                     padding: '6px 12px',
//                     background: '#dc3545',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                     fontWeight: 'bold',
//                     transition: 'background 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => (e.target.style.background = "#b52a37")}
//                   onMouseLeave={(e) => (e.target.style.background = "#dc3545")}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           );
//         })}

//         {/* ✅ Cart Summary */}
//         <div style={{
//           marginTop: '20px',
//           padding: '16px',
//           background: '#f8f9fa',
//           borderRadius: '6px',
//           border: '1px solid #ddd',
//           boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
//         }}>
//           <h3 style={{ margin: '0 0 12px', fontSize: '1.1rem', color: '#333' }}>Order Summary</h3>
//           <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', marginBottom: '12px' }}>
//             <span>Total Items:</span>
//             <span>{cartItems.reduce((acc, [, qty]) => acc + qty, 0)}</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem' }}>
//             <span>Total Price:</span>
//             <span>${totalPrice.toFixed(2)}</span>
//           </div>
//         </div>

//         {/* ✅ Buy Now Button */}
//         <div style={{ textAlign: 'center', marginTop: '30px' }}>
//           <button 
//             onClick={() => navigate('/orders')}
//             style={{
//               padding: '12px 28px',
//               background: '#007bff',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '8px',
//               fontSize: '1rem',
//               fontWeight: 'bold',
//               cursor: 'pointer',
//               boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
//               transition: 'background 0.3s ease'
//             }}
//             onMouseEnter={(e) => (e.target.style.background = "#0056b3")}
//             onMouseLeave={(e) => (e.target.style.background = "#007bff")}
//           >
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cart;

import React, { useContext } from 'react';
import { ProductContext } from '../Context/ProductContext';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";   // ✅ Cart Icon
import { motion } from "framer-motion";            // ✅ Animations

const Cart = () => {
  const { cart, products, increment, decrement, removeFromCart } = useContext(ProductContext);
  const navigate = useNavigate();

  const cartItems = Object.entries(cart); // [[id, qty], ...]

  // ✅ If cart is empty
  if (!cartItems.length) {
    return (
      <>
        <Navbar />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            maxWidth: '650px',
            margin: '40px auto',
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '40px',
            textAlign: 'center'
          }}
        >
          <h2 style={{ marginBottom: '20px', color: '#555' }}>🛒 Your cart is empty</h2>
          <p style={{ marginBottom: '25px', fontSize: '1rem', color: '#777' }}>
            Looks like you haven’t added anything yet.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/products')}   // ✅ Redirects to products page
            style={{
              padding: '12px 28px',
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
              transition: 'background 0.3s ease'
            }}
          >
            Buy Now
          </motion.button>
        </motion.div>
      </>
    );
  }

  // ✅ Calculate total price
  const totalPrice = cartItems.reduce((sum, [id, qty]) => {
    const product = products.find(p => p.id === parseInt(id));
    return sum + (product?.price || 0) * qty;
  }, 0);

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '700px',
          margin: '30px auto',
          background: '#fff',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '24px'
        }}
      >
        {/* ✅ Animated Header with Icon */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            color: '#333',
            fontSize: '1.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <FaShoppingCart style={{ color: "#007bff" }} /> Your Shopping Cart
        </motion.h2>
        
        {cartItems.map(([id, qty], index) => {
          const product = products.find(p => p.id === parseInt(id));
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 0',
                borderBottom: '1px solid #eee'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <img
                  src={product?.thumbnail}
                  alt={product?.title}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginRight: '16px',
                    border: '1px solid #ddd'
                  }}
                />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{product?.title}</div>
                  <div style={{ color: '#555', fontSize: '0.95rem' }}>${product?.price}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => decrement(product.id)}
                  style={{
                    padding: '6px 12px',
                    background: '#007bff',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    marginRight: '4px'
                  }}
                >−</motion.button>
                <span style={{ margin: '0 8px', minWidth: '24px', textAlign: 'center', fontWeight: 'bold' }}>{qty}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => increment(product.id)}
                  style={{
                    padding: '6px 12px',
                    background: '#007bff',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    marginLeft: '4px'
                  }}
                >+</motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => removeFromCart(product.id)}
                  style={{
                    marginLeft: '14px',
                    padding: '6px 12px',
                    background: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Remove
                </motion.button>
              </div>
            </motion.div>
          );
        })}

        {/* ✅ Cart Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            marginTop: '20px',
            padding: '16px',
            background: '#f8f9fa',
            borderRadius: '6px',
            border: '1px solid #ddd',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
          }}
        >
          <h3 style={{ margin: '0 0 12px', fontSize: '1.1rem', color: '#333' }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', marginBottom: '12px' }}>
            <span>Total Items:</span>
            <span>{cartItems.reduce((acc, [, qty]) => acc + qty, 0)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem' }}>
            <span>Total Price:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </motion.div>

        {/* ✅ Buy Now Button */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/orders')}
            style={{
              padding: '12px 28px',
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
              transition: 'background 0.3s ease'
            }}
          >
            Buy Now
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default Cart;
