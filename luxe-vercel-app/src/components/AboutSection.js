import React from 'react';

const AboutSection = () => {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">About LUXE</h1>
        
        <div className="about-content">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Founded with a passion for exceptional craftsmanship, LUXE has been creating timeless jewelry pieces 
              for discerning clients who appreciate the finer things in life. Our journey began with a simple mission: 
              to create jewelry that transcends trends and becomes cherished heirlooms.
            </p>
            
            <h2>Our Craftsmanship</h2>
            <p>
              Every piece in our collection is meticulously handcrafted by master artisans with decades of experience. 
              We use only the finest materials - ethically sourced diamonds, premium gold, and sterling silver - 
              ensuring each creation meets our exacting standards.
            </p>
            
            <h2>Our Values</h2>
            <ul className="values-list">
              <li>Excellence in every detail</li>
              <li>Ethical sourcing and sustainability</li>
              <li>Timeless design philosophy</li>
              <li>Exceptional customer service</li>
              <li>Craftsmanship heritage</li>
            </ul>
          </div>
          
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1658729565278-7c09292d7184" 
              alt="Luxury Jewelry Craftsmanship" 
              className="about-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;