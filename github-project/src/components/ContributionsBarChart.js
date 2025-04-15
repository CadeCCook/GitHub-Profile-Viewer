import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function ContributionsBarChart({ data, selectedYear, onYearChange }) {
  const lastFourYears = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="contributions-chart">
      <div className="year-selector">
        <label>Select Year: </label>
        <select value={selectedYear} onChange={(e) => onYearChange(e.target.value)}>
          {lastFourYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="90%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="contributions" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ContributionsBarChart;