import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import '../css/pieChart.css';

// Pie chart data type
type PieChartData = {
  name: string;
  value: number;
};

// Define the pie chart colors
const COLORS = ['#8BC1F7', '#BDE2B9', '#B2B0EA', '#F9E0A2', '#F4B678', '#C9190B', '#B8BBBE'];

export const ColorPieChart: React.FC<{ data: PieChartData[] }> = ({ data }) => {
  return (
    <div className='pieChartCSS'>
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    </div>
  );
};