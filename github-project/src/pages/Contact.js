import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      <Header />
      <h2>Contact Us</h2>
      {!submitted ? (
        <form className="contact-form" onSubmit={handleSubmit}>
          <label name="name">Name:</label>
          <input type="text" name="name" placeholder="Enter your name..." required />
          <label name="email">Email:</label>
          <input type="email" name="email" placeholder="Enter your email..." required />
          <label name="message">What can we help you with?</label>
          <textarea name="message" placeholder="Enter your Message..." rows="4" required></textarea>
          <button id="contact-submit-btn" type="submit">Submit</button>
        </form>
      ) : (
        <div className="thank-you-message">
          <h3>Thank you for reaching out!</h3>
          <p>We appreciate your message and will get back to you as soon as possible.</p>
          <button onClick={() => navigate('/')}>Back to Home</button>
          <h4>No Further Action Required</h4>
          <p>Do you need to submit another form?</p>
          <a href="/contact">Click here</a>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Contact;
