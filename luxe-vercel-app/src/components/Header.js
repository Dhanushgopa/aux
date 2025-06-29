import React from 'react';

const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1 className="logo-text">LUXE</h1>
          <span className="logo-subtitle">Premium Jewelry</span>
        </div>
        <nav className="nav">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
          >
            Home
          </a>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setCurrentPage('products'); }}
            className={`nav-link ${currentPage === 'products' ? 'active' : ''}`}
          >
            Collections
          </a>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }}
            className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
          >
            About
          </a>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}
            className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;