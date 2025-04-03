import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserCard from '../components/UserCard';

function Users() {
  const [randomUsers, setRandomUsers] = useState([]);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);

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
    } finally {
      setLoading(false);
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
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

      {/* Main Content */}
      <main>
        <h2>Random GitHub Users</h2>

        <button className="generate-btn" onClick={generateRandomUsers}>Generate New Users</button>
        
        <h3 className='users-displayed'>Show 
          <select>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
            <option value="20">20</option>
          </select> at Once</h3>

        {error && !loading && <p className="error">{error}</p>}

        {/* Display Random Users */}
        <div className="user-list">
          {loading ? (
            <p className='loading-users'>Loading users...</p>
          ) : randomUsers.length > 0 ? (
            randomUsers.map((user) => (
              user && <UserCard user={user} variant='compact' />
          ))
            ) : (
              !error && <p>No Users Found.</p>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Users;