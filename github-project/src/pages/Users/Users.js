import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserCard from '../../components/UserCard/UserCard';
import styles from './Users.module.css';

function Users() {
  const [randomUsers, setRandomUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userCount, setUserCount] = useState(4);
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

      const searchResponse = await axios.get('https://api.github.com/search/users?q=user&per_page=50');

      const randomUsers = [];
      while (randomUsers.length < userCount) {
        const randomIndex = Math.floor(Math.random() * searchResponse.data.items.length);
        const randomUser = searchResponse.data.items[randomIndex];

        if (!randomUsers.some(user => user.id === randomUser.id)) {
          randomUsers.push(randomUser);
        }
      }

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

  const handleUserCountChange = (e) => {
    setUserCount(parseInt(e.target.value));
  };

  useEffect(() => {
    generateRandomUsers();
  }, [userCount]);

  return (
      <div className={styles.usersPage}>
        <main>
        <h2>Random GitHub Users</h2>

        <button className={styles.generateBtn} onClick={generateRandomUsers}>Generate New Users</button>
        
        <h3 className={styles.usersDisplayed}>Show 
          <select value={userCount} onChange={handleUserCountChange}>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
            <option value="20">20</option>
          </select> at Once</h3>

        {error && <p className="error">{error}</p>}


        <div className={styles.userList}>
          {randomUsers.length > 0 ? (
            randomUsers.map((user) => (
              user && (
                <UserCard  
                  key={user.id}
                  user={user} 
                  compact={true}
                />
              )
            ))
          ) : (
            <p>Loading users...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Users;