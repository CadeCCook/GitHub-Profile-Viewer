export const fetchContributions = async (username, token) => {
  try {
    const response = await fetch(`https://api.github.com/graphql`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          user(login: "${username}") {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }`,
      }),
    });

    const data = await response.json();
    console.log(data);
    
    if (!data?.data?.user?.contributionsCollection) {
      throw new Error('No contribution data found');
    }

    return data.data.user.contributionsCollection.contributionCalendar.weeks;
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return null;
  }
};

export const aggregateContributionsByMonth = (weeks) => {
  if (!weeks || weeks.length === 0) {
    console.warn("No contribution data available to process.");
    return [];
  }

  const contributionsByMonth = {};

  weeks.forEach((week) => {
    week.contributionDays.forEach(({ date, contributionCount }) => {
      const month = date.slice(0, 7); // Extract YYYY-MM
      contributionsByMonth[month] = (contributionsByMonth[month] || 0) + contributionCount;
    });
  });

  return Object.entries(contributionsByMonth).map(([month, count]) => ({
    month,
    contributions: count,
  }));
};