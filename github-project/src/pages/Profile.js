import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContributionsBarChart from '../ContributionsBarChart';
import { fetchContributions, aggregateContributionsByMonth } from '../githubService';
import '../App.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
import UserCard from '../components/UserCard';

function Profile() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [contributionsData, setContributionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = process.env.REACT_APP_GITHUB_TOKEN;

      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(userResponse);

        /*const rateLimitResponse = await fetch('https://api.github.com/rate_limit', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const rateData = await rateLimitResponse.json();
        console.log('Rate Limit:', rateData);*/

        if(!userResponse.ok) {
          const errorText = await userResponse.text();
          console.log(`Profile: failed to fetch user data ${userResponse.status} - ${errorText}`);
          return;
        }

        const userData = await userResponse.json();
        setUserInfo(userData);

        const weeks = await fetchContributions(username, token);
        const aggregatedData = aggregateContributionsByMonth(weeks);
        setContributionsData(aggregatedData);
        setLoading(false);
      } catch (error) {
        console.error('Profile: Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className='profile-title'>
          <h2>Statistics</h2>
        </div>
        <div className='profile-info'>
          <UserCard user={userInfo} variant='detailed' />
        </div>
        <div className='statistic-dropdown'>
            <select>
            <option value="Monthly Activity">Monthly Activity</option>
            <option value="Repository Contributions">Repository Contributions</option>
          </select>
        </div>
        
        <div className='contribution-container'>
          {contributionsData ? (
            <ContributionsBarChart data={contributionsData} />
          ) : (
            <p>No contribution data available.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
