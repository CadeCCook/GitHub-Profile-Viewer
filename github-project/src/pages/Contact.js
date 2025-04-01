import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="contact-container">
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

      <div className="contact-page">
        <main>
          {!submitted ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Contact Us</h2>
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" placeholder="Enter your name..." required />
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" placeholder="Enter your email..." required />
              <label htmlFor="message">What can we help you with?</label>
              <textarea name="message" placeholder="Enter your Message..." rows="4" required></textarea>
              <button id="contact-submit-btn" type="submit">Submit</button>
            </form>
          ) : (
            <div className="thank-you-message">
              <h2>Thank you for reaching out!</h2>
              <p>We appreciate your message and will get back to you as soon as possible.</p>
              <button onClick={() => navigate('/')}>Back to Home</button>
              <h4>No Further Action Required</h4>
              <p>Do you need to submit another form? <a href="/contact">Click here</a></p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
