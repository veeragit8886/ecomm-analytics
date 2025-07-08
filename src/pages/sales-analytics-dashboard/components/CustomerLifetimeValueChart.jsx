import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerLifetimeValueChart = () => {
  const [viewType, setViewType] = useState('segments');
  const [timeRange, setTimeRange] = useState('12m');

  const segmentData = [
    {
      month: 'Jan',
      newCustomers: 145,
      returning: 289,
      vip: 456,
      predicted: 320
    },
    {
      month: 'Feb',
      newCustomers: 158,
      returning: 312,
      vip: 478,
      predicted: 340
    },
    {
      month: 'Mar',
      newCustomers: 167,
      returning: 298,
      vip: 492,
      predicted: 355
    },
    {
      month: 'Apr',
      newCustomers: 142,
      returning: 334,
      vip: 501,
      predicted: 365
    },
    {
      month: 'May',
      newCustomers: 189,
      returning: 356,
      vip: 523,
      predicted: 380
    },
    {
      month: 'Jun',
      newCustomers: 201,
      returning: 378,
      vip: 545,
      predicted: 395
    },
    {
      month: 'Jul',
      newCustomers: 178,
      returning: 345,
      vip: 567,
      predicted: 410
    },
    {
      month: 'Aug',
      newCustomers: 195,
      returning: 389,
      vip: 578,
      predicted: 425
    },
    {
      month: 'Sep',
      newCustomers: 212,
      returning: 401,
      vip: 589,
      predicted: 440
    },
    {
      month: 'Oct',
      newCustomers: 198,
      returning: 423,
      vip: 601,
      predicted: 455
    },
    {
      month: 'Nov',
      newCustomers: 234,
      returning: 445,
      vip: 623,
      predicted: 470
    },
    {
      month: 'Dec',
      newCustomers: 256,
      returning: 467,
      vip: 645,
      predicted: 485
    }
  ];

  const cohortData = [
    {
      month: 'Jan',
      month1: 145,
      month3: 289,
      month6: 456,
      month12: 623
    },
    {
      month: 'Feb',
      month1: 158,
      month3: 312,
      month6: 478,
      month12: 645
    },
    {
      month: 'Mar',
      month1: 167,
      month3: 298,
      month6: 492,
      month12: 667
    },
    {
      month: 'Apr',
      month1: 142,
      month3: 334,
      month6: 501,
      month12: 689
    },
    {
      month: 'May',
      month1: 189,
      month3: 356,
      month6: 523,
      month12: 712
    },
    {
      month: 'Jun',
      month1: 201,
      month3: 378,
      month6: 545,
      month12: 734
    }
  ];

  const segments = [
    { key: 'newCustomers', name: 'New Customers', color: '#3B82F6', avgCLV: '$145' },
    { key: 'returning', name: 'Returning', color: '#10B981', avgCLV: '$389' },
    { key: 'vip', name: 'VIP Customers', color: '#8B5CF6', avgCLV: '$589' },
    { key: 'predicted', name: 'Predicted', color: '#F59E0B', avgCLV: '$425', dashed: true }
  ];

  const cohorts = [
    { key: 'month1', name: '1 Month', color: '#EF4444' },
    { key: 'month3', name: '3 Months', color: '#F59E0B' },
    { key: 'month6', name: '6 Months', color: '#10B981' },
    { key: 'month12', name: '12 Months', color: '#8B5CF6' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg shadow-lg p-4 min-w-[200px]">
          <h4 className="font-semibold text-text-primary mb-2">{label}</h4>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-text-secondary">{entry.name}:</span>
                </div>
                <span className="font-medium text-text-primary">${entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const currentData = viewType === 'segments' ? segmentData : cohortData;
  const currentLegend = viewType === 'segments' ? segments : cohorts;

  return (
    <div className="bg-surface border border-border rounded-lg shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-text-primary">Customer Lifetime Value</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-secondary-100 rounded-lg p-1">
            <button
              onClick={() => setViewType('segments')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewType === 'segments' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Segments
            </button>
            <button
              onClick={() => setViewType('cohorts')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewType === 'cohorts' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Cohorts
            </button>
          </div>
          <Button
            variant="ghost"
            iconName="Download"
            iconSize={16}
            className="text-text-secondary hover:text-primary"
          >
            Export
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {currentLegend.map((item, index) => (
                <Area
                  key={item.key}
                  type="monotone"
                  dataKey={item.key}
                  stackId={viewType === 'cohorts' ? '1' : undefined}
                  stroke={item.color}
                  fill={item.color}
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray={item.dashed ? '5 5' : '0'}
                  name={item.name}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          {currentLegend.map((item) => (
            <div key={item.key} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-text-secondary">{item.name}</span>
              {item.avgCLV && (
                <span className="text-sm font-medium text-text-primary">
                  ({item.avgCLV})
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-primary-50 rounded-lg">
            <div className="text-xl font-bold text-primary">$425</div>
            <div className="text-sm text-text-secondary">Avg CLV</div>
          </div>
          <div className="text-center p-3 bg-accent-50 rounded-lg">
            <div className="text-xl font-bold text-accent">18.5%</div>
            <div className="text-sm text-text-secondary">CLV Growth</div>
          </div>
          <div className="text-center p-3 bg-warning-50 rounded-lg">
            <div className="text-xl font-bold text-warning">8.2</div>
            <div className="text-sm text-text-secondary">Avg Orders</div>
          </div>
          <div className="text-center p-3 bg-success-50 rounded-lg">
            <div className="text-xl font-bold text-success">24m</div>
            <div className="text-sm text-text-secondary">Avg Lifespan</div>
          </div>
        </div>

        {/* Predictive Insights */}
        {viewType === 'segments' && (
          <div className="mt-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg border border-primary-200">
            <div className="flex items-start space-x-3">
              <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
              <div>
                <h4 className="font-semibold text-text-primary mb-1">Predictive Insights</h4>
                <p className="text-sm text-text-secondary">
                  VIP customers show 23% higher retention rates. Predicted CLV growth of 15% 
                  for Q1 2024 based on current trends and seasonal patterns.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerLifetimeValueChart;