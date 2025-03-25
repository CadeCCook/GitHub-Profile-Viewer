import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Users() {
  const [randomUsers, setRandomUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to generate random users
  const generateRandomUsers = async () => {
    try {
      setError(null);

      // Fetch users
      const searchResponse = await axios.get('https://api.github.com/search/users?q=user&per_page=50');

      // Pick 4 random users from the search results
      const randomUsers = [];
      while (randomUsers.length < 4) {
        const randomIndex = Math.floor(Math.random() * searchResponse.data.items.length);
        const randomUser = searchResponse.data.items[randomIndex];

        if (!randomUsers.some(user => user.id === randomUser.id)) {
          randomUsers.push(randomUser);
        }
      }

      // Fetch full details of the random users
      const users = await Promise.all(
        randomUsers.map(async (user) => {
          const userDetails = await axios.get(user.url);
          return userDetails.data;
        })
      );

      setRandomUsers(users);
    } catch (err) {
      setRandomUsers([]);
      setError("Error fetching random users.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  useEffect(() => {
    generateRandomUsers();
  }, []);

  return (
    <div>
      {/* Header */}
      <header>
        <div className="left-section">
          <div className="logo">GitHunt</div>
          <button className="home-btn" onClick={() => navigate('/')}>Home</button>
          {isAuthenticated && <button className="user-btn" onClick={handleLogout}>Log Out</button>}
        </div>
        <div className="auth-buttons">
          {!isAuthenticated ? (
            <>
              <button className="signup-btn">Sign Up</button>
              <button className="login-btn">Log In</button>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>Log Out</button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <h2 id="random-user-title">Random GitHub Users</h2>

        <button className="generate-btn" onClick={generateRandomUsers}>Generate New Users</button>

        {error && <p className="error">{error}</p>}

        {/* Display Random Users */}
        <div className="user-list">
          {randomUsers.length > 0 ? (
            randomUsers.map((user) => (
              <div key={user.id} className="user-profile">
                <img src={user.avatar_url} alt="User Avatar" width="100" />
                <h3>{user.name || "No Name Provided"}</h3>
                <div className="user-actions">
                  <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                    View Profile
                  </a>
                  <button onClick={() => navigate(`/profile/${user.login}`)}>View</button>
                </div>
              </div>
            ))
          ) : (
            <p>Loading users...</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-left">©2025 GitHunt. All Rights Reserved</div>
        <div className="footer-center">
          <button className="about-btn" onClick={() => navigate('/about')}>About Us</button>
          <button className="contact-btn">Contact Us</button>
        </div>
        <div className="footer-right">
          <label className="switch">
            <input type="checkbox" id="darkModeToggle" />
            <span className="slider round"></span>
          </label>
        </div>
      </footer>
    </div>
  );
}

export default Users;