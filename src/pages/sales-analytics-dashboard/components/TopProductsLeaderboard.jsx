import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TopProductsLeaderboard = () => {
  const [sortBy, setSortBy] = useState('revenue');
  const [timeRange, setTimeRange] = useState('7d');

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      revenue: 245600,
      units: 412,
      avgPrice: 1199,
      conversionRate: 8.4,
      inventoryLevel: 156,
      inventoryStatus: 'low',
      trend: 'up',
      trendValue: 12.5,
      sparklineData: [45, 52, 48, 61, 58, 67, 72]
    },
    {
      id: 2,
      name: "MacBook Air M2",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
      revenue: 198400,
      units: 124,
      avgPrice: 1599,
      conversionRate: 6.2,
      inventoryLevel: 89,
      inventoryStatus: 'medium',
      trend: 'up',
      trendValue: 8.3,
      sparklineData: [38, 42, 45, 48, 52, 55, 58]
    },
    {
      id: 3,
      name: "Nike Air Max 270",
      category: "Footwear",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      revenue: 156800,
      units: 896,
      avgPrice: 175,
      conversionRate: 12.1,
      inventoryLevel: 234,
      inventoryStatus: 'good',
      trend: 'down',
      trendValue: -3.2,
      sparklineData: [62, 58, 55, 52, 48, 45, 42]
    },
    {
      id: 4,
      name: "Samsung 65\" QLED TV",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      revenue: 134200,
      units: 67,
      avgPrice: 2003,
      conversionRate: 4.8,
      inventoryLevel: 23,
      inventoryStatus: 'critical',
      trend: 'up',
      trendValue: 15.7,
      sparklineData: [28, 32, 35, 38, 42, 45, 48]
    },
    {
      id: 5,
      name: "Levi\'s 501 Jeans",
      category: "Clothing",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      revenue: 89600,
      units: 1024,
      avgPrice: 87.5,
      conversionRate: 15.3,
      inventoryLevel: 456,
      inventoryStatus: 'good',
      trend: 'stable',
      trendValue: 0.8,
      sparklineData: [52, 53, 52, 54, 53, 52, 53]
    },
    {
      id: 6,
      name: "AirPods Pro 2nd Gen",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400",
      revenue: 78400,
      units: 314,
      avgPrice: 249,
      conversionRate: 9.7,
      inventoryLevel: 178,
      inventoryStatus: 'medium',
      trend: 'up',
      trendValue: 6.4,
      sparklineData: [42, 45, 48, 52, 55, 58, 62]
    }
  ];

  const sortOptions = [
    { value: 'revenue', label: 'Revenue' },
    { value: 'units', label: 'Units Sold' },
    { value: 'conversionRate', label: 'Conversion Rate' },
    { value: 'trend', label: 'Trending' }
  ];

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const getInventoryStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-error bg-error-50 border-error-200';
      case 'low': return 'text-warning bg-warning-50 border-warning-200';
      case 'medium': return 'text-primary bg-primary-50 border-primary-200';
      case 'good': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-muted bg-secondary-50 border-secondary-200';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-text-muted';
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'trend') {
      return Math.abs(b.trendValue) - Math.abs(a.trendValue);
    }
    return b[sortBy] - a[sortBy];
  });

  const Sparkline = ({ data }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 20;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="60" height="20" className="inline-block">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary"
        />
      </svg>
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Trophy" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-text-primary">Top Products</h3>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products List */}
      <div className="p-4">
        <div className="space-y-3">
          {sortedProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                {index < 3 ? (
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-yellow-600'
                  }`}>
                    {index + 1}
                  </div>
                ) : (
                  <span className="text-sm font-medium text-text-muted">#{index + 1}</span>
                )}
              </div>

              {/* Product Image */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary truncate">{product.name}</h4>
                <p className="text-sm text-text-secondary">{product.category}</p>
              </div>

              {/* Metrics */}
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-sm font-semibold text-text-primary">
                    ${product.revenue.toLocaleString()}
                  </div>
                  <div className="text-xs text-text-muted">Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-text-primary">
                    {product.units}
                  </div>
                  <div className="text-xs text-text-muted">Units</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-text-primary">
                    {product.conversionRate}%
                  </div>
                  <div className="text-xs text-text-muted">Conv. Rate</div>
                </div>
              </div>

              {/* Inventory Status */}
              <div className="hidden lg:block">
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getInventoryStatusColor(product.inventoryStatus)}`}>
                  {product.inventoryLevel} units
                </span>
              </div>

              {/* Trend */}
              <div className="flex items-center space-x-2">
                <Sparkline data={product.sparklineData} />
                <div className={`flex items-center space-x-1 ${getTrendColor(product.trend)}`}>
                  <Icon name={getTrendIcon(product.trend)} size={14} />
                  <span className="text-sm font-medium">
                    {Math.abs(product.trendValue)}%
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex-shrink-0">
                <Button
                  variant="ghost"
                  iconName="ExternalLink"
                  iconSize={14}
                  className="text-text-secondary hover:text-primary"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-primary-50 rounded-lg">
            <div className="text-xl font-bold text-primary">
              ${sortedProducts.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}
            </div>
            <div className="text-sm text-text-secondary">Total Revenue</div>
          </div>
          <div className="text-center p-3 bg-accent-50 rounded-lg">
            <div className="text-xl font-bold text-accent">
              {sortedProducts.reduce((sum, p) => sum + p.units, 0).toLocaleString()}
            </div>
            <div className="text-sm text-text-secondary">Units Sold</div>
          </div>
          <div className="text-center p-3 bg-warning-50 rounded-lg">
            <div className="text-xl font-bold text-warning">
              {(sortedProducts.reduce((sum, p) => sum + p.conversionRate, 0) / sortedProducts.length).toFixed(1)}%
            </div>
            <div className="text-sm text-text-secondary">Avg Conv. Rate</div>
          </div>
          <div className="text-center p-3 bg-success-50 rounded-lg">
            <div className="text-xl font-bold text-success">
              ${(sortedProducts.reduce((sum, p) => sum + p.avgPrice, 0) / sortedProducts.length).toFixed(0)}
            </div>
            <div className="text-sm text-text-secondary">Avg Price</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProductsLeaderboard;