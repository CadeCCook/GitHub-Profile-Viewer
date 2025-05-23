import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Contact.module.css';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
  
    try {
      const response = await fetch("https://formspree.io/f/xwplwgaz", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
  
      if (response.ok) {
        setSubmitted(true);
        form.reset(); 
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Error submitting the form. Please check your connection.");
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className={styles.contactContaine}>
      <div className={styles.contactPage}>
        <main>
          {!submitted ? (
            <form className={styles.contactForm} onSubmit={handleSubmit}>
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
            <div className={styles.thankYouMessage}>
              <h2>Thank you for reaching out!</h2>
              <p>We appreciate your message and will get back to you as soon as possible.</p>
              <button className={styles.backHomeBtn} onClick={() => navigate('/')}>Back to Home</button>
              <h4>No Further Action Required</h4>
              <p>Do you need to submit another form? <a href="/contact">Click here</a></p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Contact;
