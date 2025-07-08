import React, { useState } from 'react';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryRankings = () => {
  const [sortBy, setSortBy] = useState('revenue');
  const [timeframe, setTimeframe] = useState('30d');

  const categoryData = [
    {
      id: 'electronics',
      name: 'Electronics',
      revenue: 2450000,
      growth: 15.2,
      products: 324,
      avgMargin: 28.5,
      topProduct: 'iPhone 15 Pro Max',
      trend: 'up',
      color: '#3B82F6'
    },
    {
      id: 'clothing',
      name: 'Clothing & Fashion',
      revenue: 1890000,
      growth: 8.7,
      products: 289,
      avgMargin: 22.1,
      topProduct: 'Nike Air Max 270',
      trend: 'up',
      color: '#10B981'
    },
    {
      id: 'home',
      name: 'Home & Garden',
      revenue: 1340000,
      growth: -3.2,
      products: 198,
      avgMargin: 31.8,
      topProduct: 'Smart Thermostat',
      trend: 'down',
      color: '#F59E0B'
    },
    {
      id: 'sports',
      name: 'Sports & Outdoors',
      revenue: 980000,
      growth: 12.4,
      products: 156,
      avgMargin: 26.3,
      topProduct: 'Yoga Mat Premium',
      trend: 'up',
      color: '#8B5CF6'
    },
    {
      id: 'health',
      name: 'Health & Beauty',
      revenue: 750000,
      growth: 6.8,
      products: 146,
      avgMargin: 35.2,
      topProduct: 'Vitamin D3 Supplement',
      trend: 'up',
      color: '#EF4444'
    },
    {
      id: 'books',
      name: 'Books & Media',
      revenue: 420000,
      growth: -8.1,
      products: 134,
      avgMargin: 18.7,
      topProduct: 'Programming Guide 2024',
      trend: 'down',
      color: '#6B7280'
    }
  ];

  const sortOptions = [
    { id: 'revenue', label: 'Revenue', icon: 'DollarSign' },
    { id: 'growth', label: 'Growth Rate', icon: 'TrendingUp' },
    { id: 'margin', label: 'Avg Margin', icon: 'Percent' },
    { id: 'products', label: 'Product Count', icon: 'Package' }
  ];

  const getSortedData = () => {
    return [...categoryData].sort((a, b) => {
      switch (sortBy) {
        case 'revenue':
          return b.revenue - a.revenue;
        case 'growth':
          return b.growth - a.growth;
        case 'margin':
          return b.avgMargin - a.avgMargin;
        case 'products':
          return b.products - a.products;
        default:
          return 0;
      }
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  const sortedData = getSortedData();

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-1">
            Category Performance Rankings
          </h2>
          <p className="text-sm text-text-secondary">
            Comparative analysis across product categories
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 text-sm border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                Sort by {option.label}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={() => {}}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Category List */}
      <div className="space-y-4">
        {sortedData.map((category, index) => (
          <div
            key={category.id}
            className="flex items-center p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
          >
            {/* Rank */}
            <div className="flex items-center justify-center w-8 h-8 bg-surface rounded-full border border-border mr-4">
              <span className="text-sm font-bold text-text-primary">
                {index + 1}
              </span>
            </div>

            {/* Category Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-semibold text-text-primary truncate">
                  {category.name}
                </h3>
                <div className={`flex items-center space-x-1 ${
                  category.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={category.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                    strokeWidth={2}
                  />
                  <span className="text-sm font-medium">
                    {category.growth > 0 ? '+' : ''}{category.growth}%
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-text-muted">Revenue</span>
                  <div className="font-semibold text-text-primary">
                    {formatCurrency(category.revenue)}
                  </div>
                </div>
                <div>
                  <span className="text-text-muted">Products</span>
                  <div className="font-semibold text-text-primary">
                    {category.products}
                  </div>
                </div>
                <div>
                  <span className="text-text-muted">Avg Margin</span>
                  <div className="font-semibold text-text-primary">
                    {category.avgMargin}%
                  </div>
                </div>
                <div>
                  <span className="text-text-muted">Top Product</span>
                  <div className="font-semibold text-text-primary truncate">
                    {category.topProduct}
                  </div>
                </div>
              </div>
            </div>

            {/* Mini Chart */}
            <div className="w-24 h-12 ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ value: category[sortBy] }]}>
                  <Bar dataKey="value" fill={category.color} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Action Button */}
            <div className="ml-4">
              <Button
                variant="ghost"
                size="sm"
                iconName="ChevronRight"
                onClick={() => {}}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-primary-50 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(sortedData.reduce((sum, cat) => sum + cat.revenue, 0))}
          </div>
          <div className="text-sm text-text-muted">Total Revenue</div>
        </div>
        <div className="text-center p-3 bg-success-50 rounded-lg">
          <div className="text-2xl font-bold text-success">
            {(sortedData.reduce((sum, cat) => sum + cat.growth, 0) / sortedData.length).toFixed(1)}%
          </div>
          <div className="text-sm text-text-muted">Avg Growth</div>
        </div>
        <div className="text-center p-3 bg-accent-50 rounded-lg">
          <div className="text-2xl font-bold text-accent">
            {sortedData.reduce((sum, cat) => sum + cat.products, 0)}
          </div>
          <div className="text-sm text-text-muted">Total Products</div>
        </div>
        <div className="text-center p-3 bg-warning-50 rounded-lg">
          <div className="text-2xl font-bold text-warning">
            {(sortedData.reduce((sum, cat) => sum + cat.avgMargin, 0) / sortedData.length).toFixed(1)}%
          </div>
          <div className="text-sm text-text-muted">Avg Margin</div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="bg-primary p-2 rounded-lg">
            <Icon name="BarChart3" size={16} color="white" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-text-primary mb-1">
              Category Insights
            </h4>
            <p className="text-sm text-text-secondary">
              Electronics leads in revenue but Health & Beauty shows highest margins. 
              Consider expanding high-margin categories while optimizing Electronics pricing strategy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryRankings;