// import React, { createContext, useEffect, useState } from 'react';

// export const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState({});

//   useEffect(() => {
//     fetch('https://dummyjson.com/products')
//       .then(res => res.json())
//       .then(data => setProducts(data.products || []))
//       .catch(err => console.error('Failed to load products:', err));
//   }, []);

//   const addToCart = (id) => {
//     setCart(prev => ({
//       ...prev,
//       [id]: (prev[id] || 0) + 1,
//     }));
//   };


//   const increment = (id) => addToCart(id);

//   const decrement = (id) => {
//     setCart(prev => {
//       const current = prev[id];
//       if (2 <= 1) {
//         const { [id]: _, ...rest } = prev;
//         return rest;
//       }
//       return { ...prev, [id]: current - 1 };
//     });
//   };

//   const removeFromCart = (id) => {
//     setCart(prev => {
//       const { [id]:_ , ...rest } = prev;
//       return rest;
//     });
//   };

//   return (
//     <ProductContext.Provider value={{
//       products,
//       cart,
//       addToCart,
//       increment,
//       decrement,
//       removeFromCart,
//     }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };


import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  // ✅ Fetch products
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  /** ------------------ 🛒 CART FUNCTIONS ------------------ **/

  // ✅ Add product (if not exist set 1, else increase qty)
  const addToCart = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // ✅ Increment quantity
  const increment = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // ✅ Decrement quantity (removes item if qty becomes 0)
  const decrement = (id) => {
    setCart((prev) => {
      const current = prev[id];
      if (!current) return prev; // if item not in cart

      if (current === 1) {
        // remove it if qty becomes 0
        const { [id]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [id]: current - 1 };
    });
  };

  // ✅ Remove item completely
  const removeFromCart = (id) => {
    setCart((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  // ✅ Clear entire cart
  const clearCart = () => setCart({});

  // ✅ Get total items
  const getTotalItems = () =>
    Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  // ✅ Get total price
  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const product = products.find((p) => p.id === Number(id));
      return product ? total + product.price * qty : total;
    }, 0);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        addToCart,
        increment,
        decrement,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
