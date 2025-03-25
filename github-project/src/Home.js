import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './App.css';

function Home() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchGitHubUsers = async () => {
    if (!username) return;

    try {
      setError(null);
      const searchResponse = await axios.get(`https://api.github.com/search/users?q=${username}&per_page=5`);
      
      const users = await Promise.all(
        searchResponse.data.items.map(async (user) => {
          const userDetails = await axios.get(`https://api.github.com/users/${user.login}`);
          return userDetails.data;
        })
      );

      setUserData(users);
    } catch (err) {
      setUserData([]);
      setError("No users found! Try another search.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className="left-section">
          <div className="logo">GitHunt</div>
           <button className="users-btn" onClick={() => navigate('/users')}>Users</button>
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
        <p className="intro-text">
          The easiest way to find and view user profiles and statistics. <br />
          Give it a try!
        </p>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a user..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchGitHubUsers()}
          />
          <button className="search-btn" onClick={fetchGitHubUsers}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        {/* Display for Users */}
        {userData.length > 0 && (
          <div className="user-list">
            {userData.map((user) => (
              <div key={user.id} className="user-profile">
                <img src={user.avatar_url} alt="User Avatar" width="100" />
                <h2>{user.name || "No Name Provided"}</h2>
                <p>Username: {user.login}</p>
                <p>{user.bio || "No bio available"}</p>
                <p>Public Repos: {user.public_repos}</p>
                <p>Followers: {user.followers} | Following: {user.following}</p>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                  View Profile
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Video Section */}
      <section className="video-section">
        <video className="background-video" autoPlay loop muted>
          <source src="project_video.mp4" type="video/mp4" />
        </video>
      </section>

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

export default Home;