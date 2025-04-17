import React, { useState } from 'react';
import axios from "axios";
import '../App.css';
import UserCard from '../components/UserCard';

function Home() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className='home-container'>
      <main>
        <div className='top-content'>
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
        </div>

        <div className='middle-content'>
          {userData.length > 0 && (
            <div className="user-list">
              {userData.map((user) => (
                <UserCard 
                  key={user.id}
                  user={user} 
                  variant='compact'
                />
              ))}
            </div>
          )}
        </div>

        <div className='bottom-content'>
          <section className="video-section">
            <video className="background-video" autoPlay loop muted>
              <source src="GitHunt_video.mp4" type="video/mp4"/>
            </video>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;