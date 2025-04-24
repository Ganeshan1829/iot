// Example usage in your React application
import React from 'react';
import GaugeMeter from '.././components/GaugeMeter';

const ElectricityDashboard = () => {
  // Current reading data
  const readings = {
    voltage: 230,
    current: 50,
    power: 1000,
    kWh: 5000,
    time: "Apr 24, 2025 14:50:53"
  };

  // Max values for gauges
  const maxValues = {
    voltage: 240,
    current: 63,
    power: 15000,
    kWh: 10000
  };

  // Colors for each gauge
  const gaugeColors = {
    voltage: "#3b82f6", // blue
    current: "#ef4444", // red
    power: "#10b981",   // green
    kWh: "#8b5cf6"      // purple
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold text-gray-800">Electricity Monitor</h1>
          <p className="text-sm text-gray-600">Last Updated: {readings.time}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {/* Voltage Gauge */}
          <div className="flex flex-col items-center">
            <h2 className="text-sm font-medium mb-1">Voltage</h2>
            <div className="w-full h-24">
              <GaugeMeter 
                value={readings.voltage} 
                maxValue={maxValues.voltage}
                color={gaugeColors.voltage}
                unit="V"
              />
            </div>
          </div>
          
          {/* Current Gauge */}
          <div className="flex flex-col items-center">
            <h2 className="text-sm font-medium mb-1">Current</h2>
            <div className="w-full h-24">
              <GaugeMeter 
                value={readings.current} 
                maxValue={maxValues.current}
                color={gaugeColors.current}
                unit="A"
              />
            </div>
          </div>
          
          {/* Power Gauge */}
          <div className="flex flex-col items-center">
            <h2 className="text-sm font-medium mb-1">Power</h2>
            <div className="w-full h-24">
              <GaugeMeter 
                value={readings.power} 
                maxValue={maxValues.power}
                color={gaugeColors.power}
                unit="W"
              />
            </div>
          </div>
          
          {/* Energy Gauge */}
          <div className="flex flex-col items-center">
            <h2 className="text-sm font-medium mb-1">Energy</h2>
            <div className="w-full h-24">
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
    </div>
  );
};

export default ElectricityDashboard;