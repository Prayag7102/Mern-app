import React, { useState, useMemo } from 'react';
import CategoryFilter, { CATEGORIES } from '../components/product/CategoryFilter';
import NoProducts from '../components/product/NoProducts';
import ProductCard from '../components/product/ProductCard';

const ProductsCard = ({products, handleAddToCart, navigate}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = useMemo(() => 
    selectedCategory === 'all' 
      ? products 
      : products.filter(product => product.categories.includes(selectedCategory)),
    [products, selectedCategory]
  );

  const categoryName = selectedCategory === 'all' 
    ? 'All Products' 
    : CATEGORIES.find(c => c.id === selectedCategory)?.name;

  return (
    <div className='mb-5 mt-5'>
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      <h1 className='text-3xl text-center mb-5 text-blue-700 font-semibold'>
        {categoryName}
      </h1>

      <div className="flex flex-wrap justify-center gap-5 items-center px-3">
        {filteredProducts.length === 0 ? (
          <NoProducts />
        ) : (
          filteredProducts.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              handleAddToCart={handleAddToCart} 
              navigate={navigate}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsCard;