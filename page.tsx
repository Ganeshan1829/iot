"use client";
import React, { useEffect, useState } from 'react';
import GaugeMeter from './components/GaugeMeter';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Readings {
  voltage: number;
  current: number;
  power: number;
  kWh: number;
  time: string;
}

interface MaxValues {
  voltage: number;
  current: number;
  power: number;
  kWh: number;
}

interface GaugeColors {
  voltage: string;
  current: string;
  power: string;
  kWh: string;
}

const ElectricityDashboard: React.FC = () => {
  const maxValues: MaxValues = {
    voltage: 240,
    current: 63,
    power: 15000,
    kWh: 10000
  };

  const gaugeColors: GaugeColors = {
    voltage: "#3b82f6", // blue
    current: "#ef4444", // red
    power: "#10b981",   // green
    kWh: "#8b5cf6"      // purple
  };

  const generateRandomReadings = (): Readings => ({
    voltage: Math.floor(Math.random() * maxValues.voltage),
    current: Math.floor(Math.random() * maxValues.current),
    power: Math.floor(Math.random() * maxValues.power),
    kWh: Math.floor(Math.random() * maxValues.kWh),
    time: new Date().toLocaleString()
  });

  const [readings, setReadings] = useState<Readings>(generateRandomReadings());

  useEffect(() => {
    const interval = setInterval(() => {
      setReadings(generateRandomReadings());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Voltage and Current Graph Data
  const voltageData = {
    labels: Array.from({ length: 10 }, (_, i) => `T-${i + 1}`),
    datasets: [
      {
        label: "Voltage (V)",
        data: Array.from({ length: 10 }, () => Math.floor(Math.random() * maxValues.voltage)),
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        fill: false
      }
    ]
  };

  const currentData = {
    labels: Array.from({ length: 10 }, (_, i) => `T-${i + 1}`),
    datasets: [
      {
        label: "Current (A)",
        data: Array.from({ length: 10 }, () => Math.floor(Math.random() * maxValues.current)),
        borderColor: "#ef4444",
        backgroundColor: "#ef4444",
        fill: false
      }
    ]
  };

  const aiPredictedBillData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Predicted Bill (₹)',
        data: [320, 340, 310, 370],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen w-full p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-screen-xl grid grid-cols-3 gap-8">
        
        {/* Gauge Section (Left Top) */}
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-2xl font-bold text-black">Electricity Monitor</h1>
          <p className="text-sm text-black">Last Updated: {readings.time}</p>

          {/* Voltage and Current Gauges */}
          <div className="grid grid-cols-2 gap-8 w-full">
            <div className="flex flex-col items-center">
              <h2 className="text-md font-medium mb-2 text-black">Voltage</h2>
              <div className="w-full h-52">
                <GaugeMeter 
                  value={readings.voltage} 
                  maxValue={maxValues.voltage}
                  color={gaugeColors.voltage}
                  unit="V"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-md font-medium mb-2 text-black">Current</h2>
              <div className="w-full h-52">
                <GaugeMeter 
                  value={readings.current} 
                  maxValue={maxValues.current}
                  color={gaugeColors.current}
                  unit="A"
                />
              </div>
            </div>
          </div>

          {/* Power and Energy (kWh) */}
          <div className="grid grid-cols-2 gap-8 w-full">
            <div className="flex flex-col items-center">
              <h2 className="text-md font-medium mb-2 text-black">Power</h2>
              <div className="w-full h-52">
                <GaugeMeter 
                  value={readings.power} 
                  maxValue={maxValues.power}
                  color={gaugeColors.power}
                  unit="W"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-md font-medium mb-2 text-black">Energy (kWh)</h2>
              <div className="w-full h-52">
                <GaugeMeter 
                  value={readings.kWh} 
                  maxValue={maxValues.kWh}
                  color={gaugeColors.kWh}
                  unit="kWh"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Voltage Graph Section */}
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-lg font-bold text-black mb-4">Voltage Graph</h2>
          <div className="w-full h-96">
            <Line data={voltageData} />
          </div>
        </div>

        {/* Current Graph Section */}
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-lg font-bold text-black mb-4">Current Graph</h2>
          <div className="w-full h-96">
            <Line data={currentData} />
          </div>
        </div>

      

      </div>
    </div>
  );
};

export default ElectricityDashboard;
