import React from 'react';

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="product-image product-image-main"
        />
        <img 
          src={product.model_image_url} 
          alt={`${product.name} worn by model`} 
          className="product-image product-image-model"
        />
        {product.is_featured && (
          <span className="featured-badge">Featured</span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-price">${product.price.toLocaleString()}</div>
        <button 
          className="product-button"
          onClick={() => onViewDetails(product)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;