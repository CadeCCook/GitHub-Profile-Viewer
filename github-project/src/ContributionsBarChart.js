import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const ContributionsBarChart = ({ data }) => {

  console.log('Raw contribution data:', data);

  if (
    !data ||
    Object.keys(data).length === 0 ||
    Object.values(data).every((val) => Number(val) === 0)
  ) {
    return <p style={{ textAlign: 'center', padding: '1rem' }}>No contributions made in the past year.</p>;
  }

  const sortedMonthIndices = Object.keys(data)
    .map(Number)
    .sort((a, b) => a - b);

  const labels = sortedMonthIndices.map(index => MONTH_NAMES[index]);
  const contributions = sortedMonthIndices.map(index => data[index] || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Contributions',
        data: contributions,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'GitHub Contributions (Monthly)',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        title: {
          display: true,
          text: 'Contributions',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ContributionsBarChart;