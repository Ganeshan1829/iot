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

  // Chart options to reduce the gap by setting smaller height and removing padding
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      }
    },
    layout: {
      padding: 0
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-white p-0 m-0">
      <div className="w-full h-full grid grid-cols-2 gap-4">
        
        {/* Left Side - Header and Gauge Meters */}
        <div className="flex flex-col p-4 h-full">
          {/* Header */}
          <div className="w-full flex flex-col items-center mb-6">
            <h1 className="text-2xl font-bold text-black">Electricity Monitor</h1>
            <p className="text-sm text-black">Last Updated: {readings.time}</p>
          </div>

          {/* Top: Voltage and Current Gauges side by side */}
          <div className="grid grid-cols-2 gap-6 w-full mb-8">
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-medium mb-2 text-black">Voltage</h2>
              <div className="w-full h-64">
                <GaugeMeter 
                  value={readings.voltage} 
                  maxValue={maxValues.voltage}
                  color={gaugeColors.voltage}
                  unit="V"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-lg font-medium mb-2 text-black">Current</h2>
              <div className="w-full h-64">
                <GaugeMeter 
                  value={readings.current} 
                  maxValue={maxValues.current}
                  color={gaugeColors.current}
                  unit="A"
                />
              </div>
            </div>
          </div>

          {/* Bottom: Power and Energy (kWh) side by side */}
          <div className="grid grid-cols-2 gap-6 w-full">
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-medium mb-2 text-black">Power</h2>
              <div className="w-full h-64">
                <GaugeMeter 
                  value={readings.power} 
                  maxValue={maxValues.power}
                  color={gaugeColors.power}
                  unit="W"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-lg font-medium mb-2 text-black">Energy (kWh)</h2>
              <div className="w-full h-64">
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

        {/* Right Side - Graphs in vertical arrangement */}
        <div className="flex flex-col p-4 h-full">
          {/* Top: Voltage and Current Graphs side by side */}
          <div className="grid grid-cols-2 gap-6 mb-2">
            {/* Voltage Graph */}
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-bold text-black mb-2">Voltage Graph</h2>
              <div className="w-full h-56">
                <Line data={voltageData} options={chartOptions} />
              </div>
            </div>

            {/* Current Graph */}
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-bold text-black mb-2">Current Graph</h2>
              <div className="w-full h-56">
                <Line data={currentData} options={chartOptions} />
              </div>
            </div>
          </div>
          
          {/* Bottom: AI Predicted Bill - Now with minimal gap */}
          <div className="flex flex-col bg-orange-500 p-4 rounded-lg mt-2">
            <div className="flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h2 className="text-lg font-bold text-white">AI Predicted Bill</h2>
            </div>
            <div className="text-center mb-2">
              <p className="text-white text-sm">AI Smart Prediction</p>
            </div>
            <div className="w-full h-60">
              <Line 
                data={aiPredictedBillData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white'
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        color: 'white'
                      },
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      }
                    },
                    x: {
                      ticks: {
                        color: 'white'
                      },
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricityDashboard;