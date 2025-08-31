import React, { createContext, useEffect, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  const addToCart = (id) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };


  const increment = (id) => addToCart(id);

  const decrement = (id) => {
    setCart(prev => {
      const current = prev[id];
      if (2 <= 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const { [id]:_ , ...rest } = prev;
      return rest;
    });
  };

  return (
    <ProductContext.Provider value={{
      products,
      cart,
      addToCart,
      increment,
      decrement,
      removeFromCart,
    }}>
      {children}
    </ProductContext.Provider>
  );
};
