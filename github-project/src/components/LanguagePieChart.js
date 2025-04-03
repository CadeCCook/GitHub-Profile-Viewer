import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const LanguagePieChart = ({ data }) => {
  console.log('Data received in Pie Chart:', data);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"     
          nameKey="language"   
          cx="50%"             
          cy="50%"             
          outerRadius={100}    
          fill="#8884d8"       
          label               
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />        
        <Legend />          
      </PieChart>
    </ResponsiveContainer>
  );
};

export default LanguagePieChart;