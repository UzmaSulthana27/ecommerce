import React, { useContext } from 'react';
import ProductCard from './ProductCard';
import { ProductContext } from '../Context/ProductContext';
import Navbar from './Navbar';

const ProductsList = () => {
  const { products } = useContext(ProductContext);

  if (!products.length) return <p>Loading products...</p>;

  return (
    <>
     <Navbar />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
   
    </>
  );
};

export default ProductsList;


