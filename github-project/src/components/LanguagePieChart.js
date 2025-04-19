import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const LanguagePieChart = ({ data }) => {
  console.log('Data received in Pie Chart:', data);

  const COLORS = [
    '#FF4444', // Vibrant red
    '#A28CFF', // Bright violet
    '#00D2FF', // Electric sky blue
    '#FF66C4', // Hot pink
    '#FF6F00', // Deep orange
    '#7FFFD4', // Aquamarine
    '#FFD700', // Bright gold
    '#00FA9A', // Medium spring green
    '#DA70D6'  // Orchid
  ];

  return (
    <div className='chart-wrapper'>
      <ResponsiveContainer>
        <PieChart className='pie-container'>
          <Pie
            data={data}
            dataKey="value"
            nameKey="language"
            cx="50%"
            cy="50%"
            outerRadius={120} 
            fill="#8884d8"
            label
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend className='pie-legend'/>
        </PieChart>
      </ResponsiveContainer>
    </div>
    
  );
};

export default LanguagePieChart;