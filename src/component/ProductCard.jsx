// import React, { useContext } from 'react';
// import { ProductContext } from '../Context/ProductContext';

// const ProductCard = ({ product }) => {
//   const { cart, addToCart, increment, decrement } = useContext(ProductContext);
//   const quantity = cart[product.id] || 0;

//   return (
//     <div style={{
//       border: '1px solid #ddd',
//       padding: '16px',
//       marginBottom: '12px',
//       borderRadius: '4px',
//       width: '200px',
//       display: 'inline-block',
//       verticalAlign: 'top',
//       backgroundColor: '#f9f9f9', 
//       textAlign: 'center' ,
//     }}>
//       <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
//       <h4>{product.title}</h4>
//       <p>${product.price}</p>

//       {quantity === 0 ? (
//         <button onClick={() => addToCart(product.id)} style={{ padding: '8px', width: '100%' }}>Add to Cart</button>
//       ) : (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <button onClick={() => decrement(product.id)} style={{ padding: '6px 10px' }}>−</button>
//           <span style={{ margin: '0 10px' }}>{quantity}</span>
//           <button onClick={() => increment(product.id)} style={{ padding: '6px 10px' }}>+</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductCard;


import React, { useContext, useState } from 'react';
import { ProductContext } from '../Context/ProductContext';

const ProductCard = ({ product }) => {
  const { cart, addToCart, increment, decrement } = useContext(ProductContext);
  const quantity = cart[product.id] || 0;
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    border: isHovered ? '1.5px solid #007bff' : '1px solid #ddd',
    padding: '16px',
    marginBottom: '12px',
    borderRadius: '4px',
    width: '200px',
    display: 'inline-block',
    verticalAlign: 'top',
    backgroundColor: isHovered ? '#f1f8ff' : '#f9f9f9',
    textAlign: 'center',
    boxShadow: isHovered ? '0 4px 16px rgba(0,0,0,0.12)' : 'none',
    transform: isHovered ? 'translateY(-4px) scale(1.03)' : 'none',
    transition: 'all 0.2s'
  };

  const imgStyle = {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '3px',
    transition: 'transform 0.2s',
    transform: isHovered ? 'scale(1.05)' : 'none'
  };

  const buttonStyle = {
    padding: '8px',
    width: '100%',
    background: isHovered ? '#0056b3' : '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.2s'
  };

  const qtyBtnStyle = {
    padding: '6px 10px',
    background: isHovered ? '#007bff' : '#eee',
    color: isHovered ? '#fff' : '#333',
    border: '1px solid #ccc',
    borderRadius: '3px',
    margin: '0 2px',
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s, border-color 0.2s',
    borderColor: isHovered ? '#007bff' : '#ccc'
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={product.thumbnail} alt={product.title} style={imgStyle} />
      <h4>{product.title}</h4>
      <p>${product.price}</p>

      {quantity === 0 ? (
        <button
          onClick={() => addToCart(product.id)}
          style={buttonStyle}
        >
          Add to Cart
        </button>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={() => decrement(product.id)} style={qtyBtnStyle}>−</button>
          <span style={{ margin: '0 10px' }}>{quantity}</span>
          <button onClick={() => increment(product.id)} style={qtyBtnStyle}>+</button>
        </div>
      )}
      
    </div>
  );
};

export default ProductCard;