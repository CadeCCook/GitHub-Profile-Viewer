import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      <Header />
      {!submitted ? (
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Contact Us</h2>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="thank-you-message">
          <h2>Thank you for reaching out!</h2>
          <p>We appreciate your message and will get back to you as soon as possible.</p>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ContactUs;
