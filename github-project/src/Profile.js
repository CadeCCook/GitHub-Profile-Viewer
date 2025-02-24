import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/'); // If no token, redirect to home
    } else {
      // If token exists, fetch user info (for example purposes, we'll simulate this)
      setUserInfo({
        username: 'John Doe',
        email: 'john@example.com',
        bio: 'A passionate developer.',
      });
    }
  }, [navigate]);

  return (
    <div>
      <h2>User Profile</h2>
      {userInfo ? (
        <div>
          <p>Username: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
          <p>Bio: {userInfo.bio}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;