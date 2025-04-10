'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const facebookData = [
  { year: 2004, users: 1 },
  { year: 2006, users: 12 },
  { year: 2007, users: 58 },
  { year: 2008, users: 145 },
  { year: 2009, users: 360 },
  { year: 2010, users: 608 },
  { year: 2011, users: 845 },
  { year: 2012, users: 1056 },
  { year: 2013, users: 1230 },
  { year: 2014, users: 1393 },
  { year: 2015, users: 1591 },
  { year: 2016, users: 1860 },
  { year: 2017, users: 2130 },
  { year: 2018, users: 2320 },
  { year: 2019, users: 2498 },
  { year: 2020, users: 2797 },
  { year: 2021, users: 2910 },
  { year: 2022, users: 2958 },
  { year: 2023, users: 3050 }
];

export default function SocialMediaChart() {
  return (
    <div style={{ width: '100%', height: '450px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>Facebook Monthly Active Users (Millions)</h3>
      <ResponsiveContainer>
        <LineChart data={facebookData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis domain={[0, 3500]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#1877f2" name="Monthly Active Users (M)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <p style={{ fontSize: '0.8em', color: '#666', textAlign: 'center', margin: '10px 0 0 0' }}>
        Sources: <a href="https://investor.fb.com/financials/" target="_blank" rel="noopener noreferrer" style={{ color: '#4a90e2', textDecoration: 'none' }}>Meta Investor Relations</a> and <a href="https://www.statista.com/statistics/264810/number-of-monthly-active-facebook-users-worldwide/" target="_blank" rel="noopener noreferrer" style={{ color: '#4a90e2', textDecoration: 'none' }}>Statista</a>
      </p>
    </div>
  );
} 