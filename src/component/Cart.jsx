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

import React, { useContext } from 'react';
import { ProductContext } from '../Context/ProductContext';
import Navbar from './Navbar';

const Cart = () => {
  const { cart, products, increment, decrement, removeFromCart } = useContext(ProductContext);

  const cartItems = Object.entries(cart); // [[id, qty], ...]

  if (!cartItems.length) {
    return (
      <>
      <Navbar />
      <div style={{
        textAlign: 'center',
        padding: '40px',
        fontSize: '1.2rem',
        color: '#888'
      }}>
        Your cart is empty.
      </div>
      </>
    );
  }

  return (
    <>
    <Navbar />
    <div style={{
      maxWidth: '600px',
      margin: '30px auto',
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '24px'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Your Cart</h2>
      {cartItems.map(([id, qty]) => {
        const product = products.find(p => p.id === parseInt(id));
        return (
          <div key={id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 0',
            borderBottom: '1px solid #eee'
          }}>
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
              <button
                onClick={() => decrement(product.id)}
                style={{
                  padding: '6px 12px',
                  background: '#eee',
                  border: '1px solid #ccc',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginRight: '4px'
                }}
              >−</button>
              <span style={{ margin: '0 8px', minWidth: '24px', textAlign: 'center', fontWeight: 'bold' }}>{qty}</span>
              <button
                onClick={() => increment(product.id)}
                style={{
                  padding: '6px 12px',
                  background: '#eee',
                  border: '1px solid #ccc',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginLeft: '4px'
                }}
              >+</button>
              <button
                onClick={() => removeFromCart(product.id)}
                style={{
                  marginLeft: '14px',
                  padding: '6px 12px',
                  background: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
};

export default Cart;
