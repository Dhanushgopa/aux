import React from 'react';

const ProductDetailsModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-body">
          <div className="modal-images">
            <div className="main-image">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="modal-product-image"
              />
            </div>
            <div className="model-image">
              <img 
                src={product.model_image_url} 
                alt={`${product.name} worn by model`} 
                className="modal-model-image"
              />
            </div>
          </div>
          
          <div className="modal-details">
            <div className="product-header">
              <h2 className="modal-product-name">{product.name}</h2>
              <span className="modal-product-category">{product.category}</span>
              {product.is_featured && (
                <span className="modal-featured-badge">Featured</span>
              )}
            </div>
            
            <div className="modal-price">${product.price.toLocaleString()}</div>
            
            <div className="product-description-section">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="material-details-section">
              <h3>Material Details</h3>
              <div className="material-grid">
                <div className="material-item">
                  <span className="material-label">Material:</span>
                  <span className="material-value">{product.material_details?.material || 'N/A'}</span>
                </div>
                <div className="material-item">
                  <span className="material-label">Gemstones:</span>
                  <span className="material-value">{product.material_details?.gemstones || 'N/A'}</span>
                </div>
                <div className="material-item">
                  <span className="material-label">Weight:</span>
                  <span className="material-value">{product.material_details?.weight || 'N/A'}</span>
                </div>
                <div className="material-item">
                  <span className="material-label">Origin:</span>
                  <span className="material-value">{product.material_details?.origin || 'N/A'}</span>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="inquiry-button">Send Inquiry</button>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;