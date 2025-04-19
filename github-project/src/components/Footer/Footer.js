import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

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
        <div className={styles.footerLeft}>©2025 GitHunt. All Rights Reserved</div>
  
        <div className={styles.footerCenter}>
          <button className={styles.aboutBtn} onClick={() => navigate('/about')}>About Us</button>
          <button className={styles.contactBtn} onClick={() => navigate('/contact')}>Contact Us</button>
        </div>
  
        <div className={styles.footerRight}>
          <label className={styles.switch}>
            <input 
                type="checkbox" 
                id="darkModeToggle" 
                checked={isDarkMode}
                onChange={handleDarkModeToggle}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </footer>
    );
  };

  export default Footer;