import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContributionsBarChart from './ContributionsBarChart';
import { fetchContributions, aggregateContributionsByMonth } from './githubService';
import './App.css';

function Profile() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [contributionsData, setContributionsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = process.env.REACT_APP_GITHUB_TOKEN;

      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userResponse.json();
        setUserInfo(userData);

        const weeks = await fetchContributions(username, token);
        const aggregatedData = aggregateContributionsByMonth(weeks);
        setContributionsData(aggregatedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="profile-container">
      <h2>{userInfo?.name || username}'s Profile</h2>
      {userInfo && (
        <div className="profile-info">
          <img src={userInfo.avatar_url} alt="User Avatar" width="100" />
          <p>Username: {userInfo.login}</p>
          <p>{userInfo.bio || "No bio available"}</p>
          <p>Followers: {userInfo.followers} | Following: {userInfo.following}</p>
          <a href={userInfo.html_url} target="_blank" rel="noopener noreferrer">View GitHub Profile</a>
        </div>
      )}

{contributionsData ? (
  <ContributionsBarChart data={contributionsData} />
) : (
  <p>No contribution data available.</p>
)}
    </div>
  );
}

export default Profile;