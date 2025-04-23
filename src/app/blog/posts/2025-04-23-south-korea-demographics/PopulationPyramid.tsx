'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from '@/data/south_korea_demographics.json';

const transformData = () => {
  const total = data.total_population;
  const brackets = Object.entries(data.age_brackets_5).map(([age, population]) => ({
    age,
    population: population / 1000000,
    percentage: (population / total * 100).toFixed(1)
  }));
  return brackets.reverse();
};

type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      percentage: string;
    };
  }>;
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-3 border border-gray-700 rounded-lg shadow-lg">
        <p className="text-gray-200 font-medium">{`Age: ${label}`}</p>
        <p className="text-gray-300">{`Population: ${payload[0].value.toFixed(2)}M`}</p>
        <p className="text-gray-300">{`${payload[0].payload.percentage}% of total`}</p>
      </div>
    );
  }
  return null;
};

type LabelProps = {
  x?: number;
  y?: number;
  height?: number;
  payload?: {
    percentage: string;
  };
};

const CustomLabel = (props: LabelProps) => {
  if (!props || !props.payload || !props.payload.percentage) return null;
  const percentage = Number(props.payload.percentage);
  return percentage > 7 ? (
    <text x={props.x! + 5} y={props.y! + props.height! / 2} fill="#d1d5db" dy={4}>
      {`${percentage}%`}
    </text>
  ) : null;
};


export const PopulationPyramid = () => {
  const chartData = transformData();
  
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
        >
          <XAxis type="number" unit="M" stroke="#d1d5db" />
          <YAxis type="category" dataKey="age" width={60} stroke="#d1d5db" />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ fill: '#1f2937' }}
          />
          <Legend />
          <Bar 
            dataKey="population" 
            fill="#6366f1"
            name="Population (millions)"
            label={<CustomLabel />}
            onMouseOver={() => {
              // Optional: Add any hover effects here
            }}
            style={{
              cursor: 'pointer',
              transition: 'fill 0.2s',
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}; 