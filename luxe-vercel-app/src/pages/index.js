import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import ProductDetailsModal from "../components/ProductDetailsModal";
import CategoryFilters from "../components/CategoryFilters";
import BrandSection from "../components/BrandSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import LoadingSpinner from "../components/LoadingSpinner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize sample data first
        await axios.post(`${API_URL}/init-data`);
        
        // Fetch all products
        const productsResponse = await axios.get(`${API_URL}/products`);
        setProducts(productsResponse.data);
        
        // Fetch featured products
        const featuredResponse = await axios.get(`${API_URL}/products/featured`);
        setFeaturedProducts(featuredResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <section className="featured-section">
              <div className="container">
                <h2 className="section-title">Featured Collection</h2>
                <p className="section-subtitle">Handpicked pieces that embody luxury and craftsmanship</p>
                <div className="products-grid">
                  {featuredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </div>
            </section>
            <BrandSection />
          </>
        );
      case 'products':
        return (
          <div className="page">
            <div className="container">
              <h1 className="page-title">Our Collections</h1>
              <CategoryFilters 
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return (
          <>
            <Hero />
            <section className="featured-section">
              <div className="container">
                <h2 className="section-title">Featured Collection</h2>
                <p className="section-subtitle">Handpicked pieces that embody luxury and craftsmanship</p>
                <div className="products-grid">
                  {featuredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </div>
            </section>
            <BrandSection />
          </>
        );
    }
  };

  return (
    <div className="App">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <ProductDetailsModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}