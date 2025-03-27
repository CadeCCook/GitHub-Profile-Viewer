import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const handleDarkModeToggle = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
      <footer>
        <div className="footer-left">©2025 GitHunt. All Rights Reserved</div>
  
        <div className="footer-center">
          <button className="about-btn" onClick={() => navigate('/about')}>About Us</button>
          <button className="contact-btn" onClick={() => navigate('/contact')}>Contact Us</button>
        </div>
  
        <div className="footer-right">
          <label className="switch">
            <input 
                type="checkbox" 
                id="darkModeToggle" 
                checked={isDarkMode}
                onChange={handleDarkModeToggle}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </footer>
    );
  };

  export default Footer;