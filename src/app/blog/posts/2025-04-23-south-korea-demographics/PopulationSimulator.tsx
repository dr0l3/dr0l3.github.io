'use client';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import initialData from '@/data/south_korea_demographics.json';

// --- Cohort simulation helpers ---
type AgeDistribution = number[]; // index = age, last index for 100+

const bracketsToAgeArray = (ageBrackets: AgeBrackets): AgeDistribution => {
  const ageArray: number[] = [];
  Object.entries(ageBrackets).forEach(([bracket, population]) => {
    const [startStr, endStr] = bracket.split('-');
    const start = parseInt(startStr, 10);
    // Handle "100+" bracket
    const end = bracket.endsWith('+') ? 100 : parseInt(endStr, 10);
    const width = end - start + 1;
    const perYear = population / width;
    for (let age = start; age <= end; age++) {
      ageArray[age] = perYear;
    }
  });
  return ageArray;
};

const simulateOneYear = (ageArray: AgeDistribution, fertilityRate: number): AgeDistribution => {
  const maxAge = ageArray.length - 1;
  const newAgeArray: number[] = Array(maxAge + 1).fill(0);
  const survivalRate = (age: number): number => {
    if (age < 1) return 0.98;
    if (age < 15) return 0.999;
    if (age < 65) return 0.995;
    if (age < 80) return 0.97;
    return 0.90;
  };
  // Age each cohort
  for (let age = maxAge; age > 0; age--) {
    newAgeArray[age] = (ageArray[age - 1] || 0) * survivalRate(age - 1);
  }
  // Calculate births: assume half are women, fertilityRate is TFR over reproductive span (20-39)
  const fertilePop = ageArray.slice(20, 40).reduce((sum, pop) => sum + pop / 2, 0);
  // Distribute TFR over 20 years
  const births = fertilePop * (fertilityRate / 20);
  newAgeArray[0] = births;
  return newAgeArray;
};

const ageArrayToBrackets = (ageArray: AgeDistribution): AgeBrackets => {
  const brackets: AgeBrackets = {};
  ageArray.forEach((pop, age) => {
    const bracket = age >= 100
      ? '100+'
      : `${Math.floor(age / 5) * 5}-${Math.floor(age / 5) * 5 + 4}`;
    brackets[bracket] = (brackets[bracket] || 0) + pop;
  });
  return brackets;
};

type AgeBrackets = { [key: string]: number };

const calculateStats = (ageArray: AgeDistribution) => {
  const totalPop = ageArray.reduce((sum, pop) => sum + pop, 0);
  const weightedAgeSum = ageArray.reduce((sum, pop, age) => sum + pop * age, 0);
  const avgAge = weightedAgeSum / totalPop;
  
  // Calculate working age ratio
  const children = ageArray.slice(0, 19).reduce((sum, pop) => sum + pop, 0);
  const elderly = ageArray.slice(70).reduce((sum, pop) => sum + pop, 0);
  const workingAge = totalPop - children - elderly;
  const workingRatio = workingAge / (children + elderly);
  
  return { totalPop, avgAge, workingRatio };
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(num);
};

const formatChange = (current: number, initial: number) => {
  const change = current - initial;
  const sign = change >= 0 ? '+' : '';
  if (Math.abs(change) > 1000000) {
    return `${sign}${formatNumber(change)}`;
  }
  if (Math.abs(change) < 1) {
    return `${sign}${change.toFixed(1)}`;
  }
  return `${sign}${Math.round(change).toLocaleString()}`;
};

const transformData = (ageBrackets: AgeBrackets) => {
  const total = Object.values(ageBrackets).reduce((sum, val) => sum + val, 0);
  const brackets = Object.entries(ageBrackets).map(([age, population]) => ({
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

type ChartData = {
  age: string;
  population: number;
  percentage: string;
};

const simulateYear = (currentData: AgeBrackets, fertilityRate: number): AgeBrackets => {
  const ageArray = bracketsToAgeArray(currentData);
  const newAgeArray = simulateOneYear(ageArray, fertilityRate);
  return ageArrayToBrackets(newAgeArray);
};

export const PopulationSimulator = () => {
  const [year, setYear] = useState(initialData.year);
  const [fertilityRate, setFertilityRate] = useState(0.78);
  const [ageBrackets, setAgeBrackets] = useState<AgeBrackets>(initialData.age_brackets_5);
  const [history, setHistory] = useState<{year: number, brackets: AgeBrackets}[]>([
    {year: initialData.year, brackets: initialData.age_brackets_5}
  ]);
  
  const initialAgeArray = bracketsToAgeArray(initialData.age_brackets_5);
  const initialStats = calculateStats(initialAgeArray);
  const currentAgeArray = bracketsToAgeArray(ageBrackets);
  const currentStats = calculateStats(currentAgeArray);

  const advanceYear = () => {
    const newYear = year + 1;
    const newBrackets = simulateYear(ageBrackets, fertilityRate);
    setYear(newYear);
    setAgeBrackets(newBrackets);
    setHistory(prev => [...prev, {year: newYear, brackets: newBrackets}]);
  };

  const undo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      const lastState = newHistory[newHistory.length - 1];
      setYear(lastState.year);
      setAgeBrackets(lastState.brackets);
      setHistory(newHistory);
    }
  };

  const reset = () => {
    setYear(initialData.year);
    setAgeBrackets(initialData.age_brackets_5);
    setHistory([{year: initialData.year, brackets: initialData.age_brackets_5}]);
  };

  const chartData = transformData(ageBrackets);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={advanceYear}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Advance Year
        </button>
        <button
          onClick={undo}
          disabled={history.length <= 1}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Undo
        </button>
        <button
          onClick={reset}
          disabled={history.length <= 1}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset
        </button>
        <div className="flex items-center gap-2">
          <label className="text-sm">Fertility Rate:</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.01"
            value={fertilityRate}
            onChange={(e) => setFertilityRate(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm">{fertilityRate.toFixed(2)}</span>
        </div>
        <span className="text-sm">Year: {year}</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-gray-400 text-sm">Total Population</div>
          <div className="text-white text-xl font-bold">{formatNumber(currentStats.totalPop)}</div>
          <div className="text-sm text-gray-400">
            Change: <span className={currentStats.totalPop >= initialStats.totalPop ? "text-green-400" : "text-red-400"}>
              {formatChange(currentStats.totalPop, initialStats.totalPop)}
            </span>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-gray-400 text-sm">Average Age</div>
          <div className="text-white text-xl font-bold">{currentStats.avgAge.toFixed(1)}</div>
          <div className="text-sm text-gray-400">
            Change: <span className={currentStats.avgAge <= initialStats.avgAge ? "text-green-400" : "text-red-400"}>
              {formatChange(currentStats.avgAge, initialStats.avgAge)}
            </span>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-gray-400 text-sm">Working Age Ratio</div>
          <div className="text-white text-xl font-bold">{currentStats.workingRatio.toFixed(2)}</div>
          <div className="text-sm text-gray-400">
            Change: <span className={currentStats.workingRatio >= initialStats.workingRatio ? "text-green-400" : "text-red-400"}>
              {formatChange(currentStats.workingRatio, initialStats.workingRatio)}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Working age (19-69) per dependent</div>
        </div>
      </div>

      <a 
        href={`https://chat.openai.com/?model=gpt-4o&q=Describe+what+life+would+be+like+in+South+Korea+in+${year}+with+these+demographics:+Total+population+${formatNumber(currentStats.totalPop)},+average+age+${currentStats.avgAge.toFixed(1)},+and+${currentStats.workingRatio.toFixed(2)}+working+age+people+per+dependent.+Consider+social,+economic,+and+cultural+implications.`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors mb-4"
      >
        Explore societal implications in ChatGPT
      </a>
      
      <div style={{ width: '100%', height: '600px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
          >
            <XAxis type="number" unit="M" stroke="#d1d5db" />
            <YAxis type="category" dataKey="age" width={60} stroke="#d1d5db" />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="population" 
              fill="#4A90E2"
              label={<CustomLabel />}
              onMouseEnter={(data: ChartData) => {
                const bar = document.querySelector(`path[name="${data.age}"]`);
                if (bar) bar.setAttribute('fill', '#357ABD');
              }}
              onMouseLeave={(data: ChartData) => {
                const bar = document.querySelector(`path[name="${data.age}"]`);
                if (bar) bar.setAttribute('fill', '#4A90E2');
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 