import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import styles from './BarChart.module.css';

function ContributionsBarChart({ data, selectedYear, onYearChange }) {
  const lastFourYears = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className={styles.contributionsChart}>
      <div className={styles.yearSelector}>
        <label>Select Year: </label>
        <select value={selectedYear} onChange={(e) => onYearChange(e.target.value)}>
          {lastFourYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="contributions" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ContributionsBarChart;