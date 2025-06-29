import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Timeless Elegance</h1>
        <p className="hero-subtitle">
          Discover our exquisite collection of premium jewelry, crafted for those who appreciate luxury and sophistication
        </p>
        <button className="hero-button">Explore Collection</button>
      </div>
      <div className="hero-image">
        <img 
          src="https://images.unsplash.com/photo-1720686615374-ea04dac6a66e" 
          alt="Luxury Jewelry" 
          className="hero-img"
        />
      </div>
    </section>
  );
};

export default Hero;