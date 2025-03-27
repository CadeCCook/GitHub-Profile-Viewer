import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

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
    <div className='home-container'>
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

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

      <Footer />


    </div>
  );
}

export default Home;