import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GeographicHeatmap = ({ data = [], loading = false }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [viewMode, setViewMode] = useState('revenue');

  const mockRegionalData = [
    {
      region: 'North America',
      country: 'United States',
      revenue: 1250000,
      orders: 8500,
      customers: 12000,
      growth: 15.2,
      coordinates: { lat: 39.8283, lng: -98.5795 },
      states: [
        { name: 'California', revenue: 425000, orders: 2890, growth: 18.5 },
        { name: 'New York', revenue: 315000, orders: 2140, growth: 12.3 },
        { name: 'Texas', revenue: 285000, orders: 1940, growth: 16.8 },
        { name: 'Florida', revenue: 225000, orders: 1530, growth: 14.2 }
      ]
    },
    {
      region: 'Europe',
      country: 'United Kingdom',
      revenue: 890000,
      orders: 6200,
      customers: 8500,
      growth: 12.8,
      coordinates: { lat: 55.3781, lng: -3.4360 },
      states: [
        { name: 'England', revenue: 620000, orders: 4340, growth: 13.2 },
        { name: 'Scotland', revenue: 145000, orders: 1015, growth: 11.5 },
        { name: 'Wales', revenue: 85000, orders: 595, growth: 10.8 },
        { name: 'N. Ireland', revenue: 40000, orders: 280, growth: 9.2 }
      ]
    },
    {
      region: 'Asia Pacific',
      country: 'Australia',
      revenue: 675000,
      orders: 4800,
      customers: 6200,
      growth: 22.5,
      coordinates: { lat: -25.2744, lng: 133.7751 },
      states: [
        { name: 'New South Wales', revenue: 285000, orders: 2030, growth: 24.1 },
        { name: 'Victoria', revenue: 195000, orders: 1390, growth: 21.8 },
        { name: 'Queensland', revenue: 125000, orders: 890, growth: 20.5 },
        { name: 'Western Australia', revenue: 70000, orders: 490, growth: 19.2 }
      ]
    },
    {
      region: 'Europe',
      country: 'Germany',
      revenue: 580000,
      orders: 4100,
      customers: 5800,
      growth: 8.9,
      coordinates: { lat: 51.1657, lng: 10.4515 },
      states: [
        { name: 'Bavaria', revenue: 165000, orders: 1165, growth: 9.8 },
        { name: 'North Rhine-Westphalia', revenue: 145000, orders: 1025, growth: 8.5 },
        { name: 'Baden-Württemberg', revenue: 125000, orders: 885, growth: 9.2 },
        { name: 'Berlin', revenue: 85000, orders: 600, growth: 7.8 }
      ]
    },
    {
      region: 'North America',
      country: 'Canada',
      revenue: 420000,
      orders: 2900,
      customers: 4100,
      growth: 18.7,
      coordinates: { lat: 56.1304, lng: -106.3468 },
      states: [
        { name: 'Ontario', revenue: 185000, orders: 1280, growth: 19.5 },
        { name: 'Quebec', revenue: 125000, orders: 865, growth: 17.2 },
        { name: 'British Columbia', revenue: 75000, orders: 520, growth: 20.1 },
        { name: 'Alberta', revenue: 35000, orders: 235, growth: 16.8 }
      ]
    }
  ];

  const regionalData = data.length > 0 ? data : mockRegionalData;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const getPerformanceColor = (growth) => {
    if (growth >= 20) return 'bg-success text-success-foreground';
    if (growth >= 15) return 'bg-accent text-accent-foreground';
    if (growth >= 10) return 'bg-warning text-warning-foreground';
    return 'bg-secondary text-secondary-foreground';
  };

  const getRegionSize = (revenue) => {
    const maxRevenue = Math.max(...regionalData.map(r => r.revenue));
    const ratio = revenue / maxRevenue;
    return Math.max(40, ratio * 80);
  };

  const viewModes = [
    { key: 'revenue', label: 'Revenue', icon: 'DollarSign' },
    { key: 'orders', label: 'Orders', icon: 'ShoppingCart' },
    { key: 'growth', label: 'Growth', icon: 'TrendingUp' }
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
          <div className="h-64 bg-secondary-200 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-16 bg-secondary-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Geographic Performance</h3>
          <p className="text-sm text-text-muted mt-1">
            Regional sales distribution and market penetration analysis
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
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
        </div>
      </div>

      {/* World Map Visualization */}
      <div className="relative bg-secondary-50 rounded-lg p-8 mb-6" style={{ height: '300px' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-4xl">
            {/* Simplified world map representation */}
            <svg viewBox="0 0 800 400" className="w-full h-full">
              {/* Background */}
              <rect width="800" height="400" fill="var(--color-secondary-100)" />
              
              {/* Continents (simplified shapes) */}
              <path d="M100 150 L200 120 L280 140 L300 180 L250 220 L150 200 Z" fill="var(--color-secondary-200)" />
              <path d="M350 100 L500 90 L550 130 L520 180 L400 190 L340 150 Z" fill="var(--color-secondary-200)" />
              <path d="M600 200 L720 180 L750 220 L700 280 L620 270 Z" fill="var(--color-secondary-200)" />
              
              {/* Data points */}
              {regionalData.map((region, index) => {
                const x = 150 + (index * 120);
                const y = 150 + (Math.sin(index) * 50);
                const size = getRegionSize(region[viewMode] || region.revenue);
                
                return (
                  <g key={region.country}>
                    <circle
                      cx={x}
                      cy={y}
                      r={size / 4}
                      fill={region.growth >= 15 ? 'var(--color-success)' : 
                            region.growth >= 10 ? 'var(--color-accent)': 'var(--color-warning)'}
                      fillOpacity={0.7}
                      stroke="white"
                      strokeWidth={2}
                      className="cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedRegion(region)}
                    />
                    <text
                      x={x}
                      y={y + size / 4 + 15}
                      textAnchor="middle"
                      className="text-xs font-medium fill-current text-text-primary"
                    >
                      {region.country}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Regional Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {regionalData.slice(0, 6).map((region) => (
          <div
            key={region.country}
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-soft ${
              selectedRegion?.country === region.country
                ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-primary-200'
            }`}
            onClick={() => setSelectedRegion(region)}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-text-primary">{region.country}</h4>
                <p className="text-sm text-text-muted">{region.region}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(region.growth)}`}>
                +{region.growth}%
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Revenue</span>
                <span className="text-sm font-medium text-text-primary">
                  {formatCurrency(region.revenue)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Orders</span>
                <span className="text-sm font-medium text-text-primary">
                  {formatNumber(region.orders)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Customers</span>
                <span className="text-sm font-medium text-text-primary">
                  {formatNumber(region.customers)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Region Details */}
      {selectedRegion && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-text-primary">
              {selectedRegion.country} - Detailed Breakdown
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedRegion(null)}
              iconName="X"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedRegion.states?.map((state) => (
              <div key={state.name} className="bg-surface rounded-lg p-3 border border-border">
                <h5 className="font-medium text-text-primary text-sm mb-2">{state.name}</h5>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Revenue</span>
                    <span className="font-medium">{formatCurrency(state.revenue)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Orders</span>
                    <span className="font-medium">{formatNumber(state.orders)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Growth</span>
                    <span className={`font-medium ${state.growth >= 15 ? 'text-success' : state.growth >= 10 ? 'text-accent' : 'text-warning'}`}>
                      +{state.growth}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeographicHeatmap;