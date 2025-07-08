import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueChart = ({ data = [], loading = false, showForecast = true }) => {
  const [viewMode, setViewMode] = useState('monthly');
  const [showComparison, setShowComparison] = useState(false);

  const mockData = [
    { period: 'Jan', revenue: 125000, forecast: 130000, lastYear: 98000, orders: 1250 },
    { period: 'Feb', revenue: 142000, forecast: 145000, lastYear: 112000, orders: 1420 },
    { period: 'Mar', revenue: 158000, forecast: 162000, lastYear: 125000, orders: 1580 },
    { period: 'Apr', revenue: 167000, forecast: 170000, lastYear: 134000, orders: 1670 },
    { period: 'May', revenue: 189000, forecast: 195000, lastYear: 145000, orders: 1890 },
    { period: 'Jun', revenue: 203000, forecast: 210000, lastYear: 167000, orders: 2030 },
    { period: 'Jul', revenue: 218000, forecast: 225000, lastYear: 178000, orders: 2180 },
    { period: 'Aug', revenue: 234000, forecast: 240000, lastYear: 189000, orders: 2340 },
    { period: 'Sep', revenue: 245000, forecast: 250000, lastYear: 201000, orders: 2450 },
    { period: 'Oct', revenue: 267000, forecast: 275000, lastYear: 215000, orders: 2670 },
    { period: 'Nov', revenue: 289000, forecast: 295000, lastYear: 234000, orders: 2890 },
    { period: 'Dec', revenue: 312000, forecast: 320000, lastYear: 256000, orders: 3120 }
  ];

  const chartData = data.length > 0 ? data : mockData;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-floating">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 mb-1">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-text-secondary capitalize">{entry.dataKey}</span>
              </div>
              <span className="text-sm font-medium text-text-primary">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const viewModes = [
    { key: 'monthly', label: 'Monthly', icon: 'Calendar' },
    { key: 'weekly', label: 'Weekly', icon: 'CalendarDays' },
    { key: 'daily', label: 'Daily', icon: 'Clock' }
  ];

  if (loading) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 bg-secondary-200 rounded w-48"></div>
            <div className="flex space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-8 w-20 bg-secondary-200 rounded"></div>
              ))}
            </div>
          </div>
          <div className="h-80 bg-secondary-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Revenue Trends & Forecasting</h3>
          <p className="text-sm text-text-muted mt-1">
            Monthly revenue performance with seasonal indicators and growth projections
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* View Mode Selector */}
          <div className="flex bg-secondary-100 rounded-lg p-1">
            {viewModes.map((mode) => (
              <button
                key={mode.key}
                onClick={() => setViewMode(mode.key)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === mode.key
                    ? 'bg-surface text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={mode.icon} size={14} />
                <span>{mode.label}</span>
              </button>
            ))}
          </div>

          {/* Comparison Toggle */}
          <Button
            variant={showComparison ? "primary" : "outline"}
            size="sm"
            onClick={() => setShowComparison(!showComparison)}
            iconName="GitCompare"
            iconPosition="left"
          >
            Compare YoY
          </Button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="period" 
              stroke="var(--color-text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="var(--color-text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Main Revenue Area */}
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-primary)"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              name="Revenue"
            />
            
            {/* Forecast Line */}
            {showForecast && (
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="var(--color-accent)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Forecast"
              />
            )}
            
            {/* Year-over-Year Comparison */}
            {showComparison && (
              <Line
                type="monotone"
                dataKey="lastYear"
                stroke="var(--color-secondary)"
                strokeWidth={2}
                dot={false}
                name="Last Year"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="text-sm text-text-secondary">Current Revenue</span>
        </div>
        {showForecast && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-accent"></div>
            <span className="text-sm text-text-secondary">Forecast</span>
          </div>
        )}
        {showComparison && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="text-sm text-text-secondary">Previous Year</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;