import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API_URL}/contact`, formData);
      setSubmitMessage('Thank you for your message. We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Contact Us</h1>
        
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <h3>Visit Our Showroom</h3>
                <p>123 Luxury Avenue<br />New York, NY 10001</p>
              </div>
              
              <div className="contact-item">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              
              <div className="contact-item">
                <h3>Email</h3>
                <p>info@luxejewelry.com</p>
              </div>
              
              <div className="contact-item">
                <h3>Hours</h3>
                <p>Mon - Fri: 10AM - 7PM<br />Sat: 10AM - 6PM<br />Sun: 12PM - 5PM</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="form-textarea"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="form-submit"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitMessage && (
                <p className="submit-message">{submitMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;