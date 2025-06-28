import React, { useState } from 'react';
import './App.css';

// Components
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-900 hover:text-teal-600 transition-colors duration-300">High Jewelry</a>
            <a href="#" className="text-gray-900 hover:text-teal-600 transition-colors duration-300">Jewelry</a>
            <a href="#" className="text-gray-900 hover:text-teal-600 transition-colors duration-300">Love & Engagement</a>
          </div>
          
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 tracking-wider">JEWELLEY & CO.</h1>
          </div>
          
          {/* Right Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-900 hover:text-teal-600 transition-colors duration-300">Fine Watches</a>
            <a href="#" className="text-gray-900 hover:text-teal-600 transition-colors duration-300">Home</a>
            <a href="#" className="text-gray-900 hover:text-teal-600 transition-colors duration-300">Contact</a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 hover:text-teal-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 text-gray-900 hover:text-teal-600">High Jewelry</a>
              <a href="#" className="block px-3 py-2 text-gray-900 hover:text-teal-600">Jewelry</a>
              <a href="#" className="block px-3 py-2 text-gray-900 hover:text-teal-600">Love & Engagement</a>
              <a href="#" className="block px-3 py-2 text-gray-900 hover:text-teal-600">Fine Watches</a>
              <a href="#" className="block px-3 py-2 text-gray-900 hover:text-teal-600">Home</a>
              <a href="#" className="block px-3 py-2 text-gray-900 hover:text-teal-600">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-teal-400 to-teal-600 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white space-y-6 animate-fade-in">
            <h2 className="text-5xl lg:text-6xl font-light leading-tight">
              HardWear by Jewelley
            </h2>
            <p className="text-xl leading-relaxed opacity-90">
              Showcasing individual stories of power and resilience, 
              award-winning actresses Greta Lee and Mikey Madison and acclaimed painter Anna Weyant 
              wear the bold links of HardWear by Jewelley, a symbol of love's transformative strength.
            </p>
            <button className="bg-white text-teal-600 px-8 py-3 font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
              Shop Now
            </button>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/3434997/pexels-photo-3434997.jpeg" 
              alt="Luxury Jewelry Collection"
              className="w-full h-auto rounded-lg shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Elegant Heart Necklace",
      category: "Early Access",
      image: "https://images.unsplash.com/photo-1589128530085-7e772389eb7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbmVja2xhY2VzfGVufDB8fHx3aGl0ZXwxNzUxMTAyNTUzfDA&ixlib=rb-4.1.0&q=85"
    },
    {
      id: 2,
      name: "Classic Gold Necklace",
      category: "Early Access",
      image: "https://images.unsplash.com/photo-1717605383891-e25d2cbf4203?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxlbGVnYW50JTIwbmVja2xhY2VzfGVufDB8fHx3aGl0ZXwxNzUxMTAyNTUzfDA&ixlib=rb-4.1.0&q=85"
    },
    {
      id: 3,
      name: "Diamond Solitaire Ring",
      category: "Early Access",
      image: "https://images.pexels.com/photos/10581426/pexels-photo-10581426.jpeg"
    },
    {
      id: 4,
      name: "Vintage Diamond Ring",
      category: "Early Access",
      image: "https://images.unsplash.com/photo-1591210244853-ea68b6126edf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxkaWFtb25kJTIwcmluZ3N8ZW58MHx8fHdoaXRlfDE3NTExMDI1MzR8MA&ixlib=rb-4.1.0&q=85"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-light text-gray-900 mb-4">Early Access Online: New Jewelry</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-sm text-gray-600">{product.category}</span>
                  <div className="w-6 h-6 border border-gray-300 rounded-full mt-2"></div>
                </div>
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-lg font-medium text-gray-900">{product.name}</h4>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="border border-gray-900 text-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition-colors duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

const CollectionShowcase = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lifestyle Collection */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1618522755367-bcbb050438b6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxqZXdlbHJ5JTIwbGlmZXN0eWxlfGVufDB8fHx3aGl0ZXwxNzUxMTAyNTU5fDA&ixlib=rb-4.1.0&q=85"
              alt="Lifestyle Jewelry"
              className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h4 className="text-2xl font-light mb-2">Lifestyle Jewelry</h4>
              <button className="text-white border-b border-white hover:border-teal-300 transition-colors duration-300">
                Shop Now →
              </button>
            </div>
          </div>
          
          {/* Pearl Collection */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1703034390461-0b978d9bd21d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxwZWFybCUyMGJyYWNlbGV0c3xlbnwwfHx8d2hpdGV8MTc1MTEwMjU0Nnww&ixlib=rb-4.1.0&q=85"
              alt="Pearl Jewelry"
              className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h4 className="text-2xl font-light mb-2">Pearl Jewelry</h4>
              <button className="text-white border-b border-white hover:border-teal-300 transition-colors duration-300">
                Shop Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ShopByCategory = () => {
  const categories = [
    {
      name: "Necklaces & Pendants",
      image: "https://images.unsplash.com/photo-1589128530085-7e772389eb7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbmVja2xhY2VzfGVufDB8fHx3aGl0ZXwxNzUxMTAyNTUzfDA&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "Earrings",
      image: "https://images.unsplash.com/photo-1702476320482-0736c4b962f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxnb2xkJTIwZWFycmluZ3N8ZW58MHx8fHdoaXRlfDE3NTExMDI1NDB8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "Rings",
      image: "https://images.pexels.com/photos/10581426/pexels-photo-10581426.jpeg"
    },
    {
      name: "Bracelets",
      image: "https://images.unsplash.com/photo-1703034390461-0b978d9bd21d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxwZWFybCUyMGJyYWNlbGV0c3xlbnwwfHx8d2hpdGV8MTc1MTEwMjU0Nnww&ixlib=rb-4.1.0&q=85"
    },
    {
      name: "Home",
      image: "https://images.pexels.com/photos/3434997/pexels-photo-3434997.jpeg"
    },
    {
      name: "Watches",
      image: "https://images.unsplash.com/photo-1591210244853-ea68b6126edf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxkaWFtb25kJTIwcmluZ3N8ZW58MHx8fHdoaXRlfDE3NTExMDI1MzR8MA&ixlib=rb-4.1.0&q=85"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-light text-gray-900 mb-4">Shop by Category</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Jewelley & Co. designs feature the world's finest diamonds and unparalleled craftsmanship—signatures of the House for almost two centuries.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg bg-teal-100 aspect-square">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-sm font-medium text-gray-900">{category.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-16 bg-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h3 className="text-4xl font-light mb-6">Get in Touch</h3>
            <p className="text-xl mb-8 opacity-90">
              Experience the artistry and craftsmanship of our luxury jewelry collection. 
              Contact us for personalized service and exclusive pieces.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@jewelleyandco.com</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Fifth Avenue, New York, NY</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 px-6 rounded-md hover:bg-teal-700 transition-colors duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h4 className="text-2xl font-bold mb-4">JEWELLEY & CO.</h4>
            <p className="text-gray-400 mb-6">
              Crafting luxury jewelry with unparalleled artistry and the world's finest diamonds for over a century.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold mb-4">Collections</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-300">High Jewelry</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Engagement Rings</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Wedding Bands</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Necklaces</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Earrings</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold mb-4">Customer Care</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Care Instructions</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Jewelley & Co. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <FeaturedProducts />
      <CollectionShowcase />
      <ShopByCategory />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;