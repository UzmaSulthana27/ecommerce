import React from 'react';
import { ProductProvider } from './Context/ProductContext';
import { AuthProvider } from "./Context/AuthContext";

import ProductsList from './component/ProductsList';
import Cart from './component/Cart';
import Home from './component/Home';
import Login from './component/Login';
import MyOrders from './component/MyOrders';
import Payment from "./component/Payment";
import OrderSuccess from "./component/OrderSuccess";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

let router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/products',
    element: <ProductsList />
  },
  {
    path: '/orders',
    element: <MyOrders />
  },
  {
    path: '/payment',
    element: <Payment />
  },
  {
    path: '/ordersuccess',
    element: <OrderSuccess />
  }
]);

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
