import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContributionsBarChart from '../ContributionsBarChart';
import LanguagePieChart from '../components/LanguagePieChart';
import { fetchContributions, aggregateContributionsByMonth } from '../githubService';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserCard from '../components/UserCard';

function Profile() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [contributionsData, setContributionsData] = useState(null);
  const [languageData, setLanguageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = process.env.REACT_APP_GITHUB_STATS_API_KEY;

      try {
        // Fetch user info
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          console.log(`Profile: failed to fetch user data ${userResponse.status} - ${errorText}`);
          return;
        }

        const userData = await userResponse.json();
        setUserInfo(userData);

        // Fetch repositories data
        const reposResponse = await fetch(userData.repos_url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!reposResponse.ok) {
          console.error('Profile: Failed to fetch repositories');
          return;
        }

        const reposData = await reposResponse.json();

        const languageCounts = {};
        reposData.forEach((repo) => {
          if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
          }
        });
        // const total = Object.values(languageCounts).reduce((acc, count) => acc + count, 0);
        const languages = Object.keys(languageCounts).map((language) => ({
          language,
          value: languageCounts[language],
          // value: Math.round((languageCounts[language] / total) * 1000) / 10,
        }));

        setLanguageData(languages);

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

  if (loading) {
    return <p>Loading user profile...</p>;
  }

  if (!userInfo) {
    return <p>No user data available</p>;
  }

  console.log("Language Data:", languageData);

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-title">
          <h2>Statistics</h2>
        </div>
        <div className="profile-info">
          <UserCard user={userInfo} variant="detailed" />
        </div>
        <div className="statistic-dropdown">
          <select>
            <option value="Monthly Activity">Monthly Activity</option>
            <option value="Repository Contributions">Repository Contributions</option>
          </select>
        </div>

        <div className='selected-statistic'>
          <h3>Selected Statistic: {selectedStatistic}</h3>
          
          {selectedStatistic === "Monthly Activity" ? (
            <div className="contribution-container">
              {contributionsData ? (
                <ContributionsBarChart data={contributionsData} />
              ) : (
                <p>No contribution data available.</p>
              )}
            </div>
          ) : (
            <div className="language-pie-chart">
              <h3>Languages Used</h3>
              {languageData.length > 0 ? (
                <LanguagePieChart data={languageData} />
              ) : (
                <p>No language data available</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;