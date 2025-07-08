import React, { useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderVolumeChart = ({ data, isLoading }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const periods = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'books', label: 'Books' }
  ];

  const chartData = [
    { time: '00:00', orders: 45, fulfillmentRate: 92, category: 'all' },
    { time: '02:00', orders: 32, fulfillmentRate: 88, category: 'all' },
    { time: '04:00', orders: 28, fulfillmentRate: 95, category: 'all' },
    { time: '06:00', orders: 52, fulfillmentRate: 91, category: 'all' },
    { time: '08:00', orders: 78, fulfillmentRate: 89, category: 'all' },
    { time: '10:00', orders: 95, fulfillmentRate: 93, category: 'all' },
    { time: '12:00', orders: 112, fulfillmentRate: 87, category: 'all' },
    { time: '14:00', orders: 128, fulfillmentRate: 85, category: 'all' },
    { time: '16:00', orders: 145, fulfillmentRate: 82, category: 'all' },
    { time: '18:00', orders: 132, fulfillmentRate: 88, category: 'all' },
    { time: '20:00', orders: 98, fulfillmentRate: 94, category: 'all' },
    { time: '22:00', orders: 67, fulfillmentRate: 96, category: 'all' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-text-primary mb-2">{`Time: ${label}`}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-text-secondary">{entry.name}:</span>
              <span className="font-medium text-text-primary">
                {entry.name === 'Fulfillment Rate' ? `${entry.value}%` : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-center h-80">
          <div className="flex items-center space-x-3">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
            <span className="text-text-secondary">Loading chart data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Order Volume & Fulfillment</h3>
            <p className="text-sm text-text-secondary">Real-time order processing metrics</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Period Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Period:</span>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          
          <Button variant="ghost" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                yAxisId="left"
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                yAxisId="left"
                dataKey="orders" 
                fill="var(--color-primary)" 
                name="Order Volume"
                radius={[2, 2, 0, 0]}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="fulfillmentRate" 
                stroke="var(--color-accent)" 
                strokeWidth={3}
                name="Fulfillment Rate (%)"
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OrderVolumeChart;