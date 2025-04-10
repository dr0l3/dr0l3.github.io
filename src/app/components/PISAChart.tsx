'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const pisaData = [
  { year: 2000, math: 492, reading: 493, science: null },
  { year: 2003, math: 499, reading: 494, science: null },
  { year: 2006, math: 494, reading: 489, science: 498 },
  { year: 2009, math: 495, reading: 493, science: 501 },
  { year: 2012, math: 494, reading: 496, science: 501 },
  { year: 2015, math: 490, reading: 493, science: 493 },
  { year: 2018, math: 489, reading: 487, science: 489 },
  { year: 2022, math: 472, reading: 476, science: 485 }
];

export default function PISAChart() {
  return (
    <div style={{ width: '100%', height: '450px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>OECD International Average PISA Scores (2000-2022)</h3>
      <ResponsiveContainer>
        <LineChart data={pisaData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis domain={[450, 550]} />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          <Line type="monotone" dataKey="math" stroke="#8884d8" name="Mathematics" />
          <Line type="monotone" dataKey="reading" stroke="#82ca9d" name="Reading" />
          <Line type="monotone" dataKey="science" stroke="#ffc658" name="Science" connectNulls />
        </LineChart>
      </ResponsiveContainer>
      <p style={{ fontSize: '0.8em', color: '#666', textAlign: 'center', margin: '10px 0 0 0' }}>
        Source: <a href="https://en.wikipedia.org/wiki/Programme_for_International_Student_Assessment" target="_blank" rel="noopener noreferrer" style={{ color: '#4a90e2', textDecoration: 'none' }}>Wikipedia - Programme for International Student Assessment</a>
      </p>
    </div>
  );
}