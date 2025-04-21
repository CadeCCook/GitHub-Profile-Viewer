import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContributionsBarChart from '../../components/BarChart/ContributionsBarChart';
import LanguagePieChart from '../../components/PieChart/LanguagePieChart';
import { fetchContributions, aggregateContributionsByMonth } from '../../githubService';
import UserCard from '../../components/UserCard/UserCard';
import styles from './Profile.module.css';

function Profile() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatistic, setSelectedStatistic] = useState('Monthly Activity');
  const [contributionsData, setContributionsData] = useState(null);
  const [languageData, setLanguageData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const lastFourYears = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    const fetchData = async () => {
      const token = process.env.REACT_APP_GITHUB_STATS_API_KEY;

      try {
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

        const languages = Object.keys(languageCounts).map((language) => ({
          language,
          value: languageCounts[language],
        }));

        setLanguageData(languages);

        const weeks = await fetchContributions(username, token, selectedYear);
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
  }, [username, selectedYear]);

  if (loading) return <p className='loading'>Loading user profile...</p>;
  if (!userInfo) return <p>No user data available</p>;

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.profileTitle}>
          <h2>Statistics</h2>
        </div>
        <div className={styles.profileInfo}>
          <UserCard user={userInfo} variant="detailed" />
        </div>

        <div className={styles.statisticDropdown}>
          <select value={selectedStatistic} onChange={(e) => setSelectedStatistic(e.target.value)}>
            <option value="Monthly Activity">Monthly Activity</option>
            <option value="Languages Used">Languages Used</option>
          </select>
        </div>

        <div className={styles.selectedStatistic}>
          <h3>Selected Statistic: {selectedStatistic}</h3>

          {selectedStatistic === "Monthly Activity" ? (
            <div className={styles.contributionContainer}>
              {contributionsData ? (
                <ContributionsBarChart
                  data={contributionsData}
                  selectedYear={selectedYear}
                  onYearChange={(year) => setSelectedYear(Number(year))}
                />
              ) : (
                <p>No contribution data available.</p>
              )}
            </div>
          ) : (
            <div className={styles.languagePieChart}>
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
    </>
  );
}

export default Profile;