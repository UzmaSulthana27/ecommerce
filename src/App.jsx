import React from 'react';
import { ProductProvider } from './Context/ProductContext';  // ✅ updated path
import ProductsList from './component/ProductsList';
import Cart from './component/Cart';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';

let router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/Cart',
    element: <Cart />
  },
  {
    path: '/Login',
    element: <Login />
  },
  {
    path: '/Products',
    element: <ProductsList />
  }
]);

const App = () => {
  return (
    <>
    
    <ProductProvider>
      <RouterProvider router={router}></RouterProvider>
    </ProductProvider>
   </>
  );
};

export default App;


