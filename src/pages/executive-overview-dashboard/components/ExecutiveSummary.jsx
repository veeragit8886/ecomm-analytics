import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutiveSummary = ({ data = {}, loading = false }) => {
  const mockSummaryData = {
    totalRevenue: 2847000,
    revenueGrowth: 18.5,
    totalOrders: 18420,
    orderGrowth: 12.3,
    avgOrderValue: 154.67,
    aovGrowth: 5.8,
    conversionRate: 3.24,
    conversionGrowth: -2.1,
    activeCustomers: 34567,
    customerGrowth: 15.2,
    repeatCustomerRate: 42.8,
    repeatGrowth: 8.9,
    topPerformingCategory: 'Electronics',
    categoryRevenue: 1245000,
    categoryGrowth: 22.1,
    inventoryTurnover: 8.4,
    turnoverGrowth: 6.7,
    customerAcquisitionCost: 28.50,
    cacGrowth: -12.4,
    customerLifetimeValue: 485.20,
    clvGrowth: 14.8,
    grossMargin: 34.2,
    marginGrowth: 2.1,
    returnRate: 4.8,
    returnGrowth: -8.5
  };

  const summaryData = Object.keys(data).length > 0 ? data : mockSummaryData;

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

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  const getGrowthColor = (growth) => {
    if (growth > 0) return 'text-success';
    if (growth < 0) return 'text-error';
    return 'text-text-muted';
  };

  const getGrowthIcon = (growth) => {
    if (growth > 0) return 'TrendingUp';
    if (growth < 0) return 'TrendingDown';
    return 'Minus';
  };

  const summaryMetrics = [
    {
      category: 'Revenue Performance',
      icon: 'DollarSign',
      color: 'bg-primary-50 text-primary',
      metrics: [
        {
          label: 'Total Revenue',
          value: formatCurrency(summaryData.totalRevenue),
          growth: summaryData.revenueGrowth,
          description: 'Year-to-date revenue performance'
        },
        {
          label: 'Average Order Value',
          value: formatCurrency(summaryData.avgOrderValue),
          growth: summaryData.aovGrowth,
          description: 'Average transaction value'
        },
        {
          label: 'Gross Margin',
          value: formatPercentage(summaryData.grossMargin),
          growth: summaryData.marginGrowth,
          description: 'Overall profitability margin'
        }
      ]
    },
    {
      category: 'Customer Metrics',
      icon: 'Users',
      color: 'bg-accent-50 text-accent',
      metrics: [
        {
          label: 'Active Customers',
          value: formatNumber(summaryData.activeCustomers),
          growth: summaryData.customerGrowth,
          description: 'Monthly active customer base'
        },
        {
          label: 'Repeat Customer Rate',
          value: formatPercentage(summaryData.repeatCustomerRate),
          growth: summaryData.repeatGrowth,
          description: 'Customer retention performance'
        },
        {
          label: 'Customer Lifetime Value',
          value: formatCurrency(summaryData.customerLifetimeValue),
          growth: summaryData.clvGrowth,
          description: 'Average customer value over time'
        }
      ]
    },
    {
      category: 'Operational Excellence',
      icon: 'Activity',
      color: 'bg-warning-50 text-warning',
      metrics: [
        {
          label: 'Total Orders',
          value: formatNumber(summaryData.totalOrders),
          growth: summaryData.orderGrowth,
          description: 'Order volume performance'
        },
        {
          label: 'Conversion Rate',
          value: formatPercentage(summaryData.conversionRate),
          growth: summaryData.conversionGrowth,
          description: 'Website conversion efficiency'
        },
        {
          label: 'Inventory Turnover',
          value: `${summaryData.inventoryTurnover}x`,
          growth: summaryData.turnoverGrowth,
          description: 'Inventory management efficiency'
        }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-secondary-200 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-4">
                <div className="h-5 bg-secondary-200 rounded w-32"></div>
                {[1, 2, 3].map(j => (
                  <div key={j} className="p-4 bg-secondary-100 rounded-lg">
                    <div className="h-4 bg-secondary-200 rounded w-24 mb-2"></div>
                    <div className="h-6 bg-secondary-200 rounded w-20 mb-1"></div>
                    <div className="h-3 bg-secondary-200 rounded w-32"></div>
                  </div>
                ))}
              </div>
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
          <h3 className="text-lg font-semibold text-text-primary">Executive Summary</h3>
          <p className="text-sm text-text-muted mt-1">
            Key performance indicators and business health metrics
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-text-muted">
          <Icon name="Clock" size={14} />
          <span className="text-xs">Updated 2 min ago</span>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryMetrics.map((category) => (
          <div key={category.category} className="space-y-4">
            {/* Category Header */}
            <div className="flex items-center space-x-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${category.color}`}>
                <Icon name={category.icon} size={16} strokeWidth={2} />
              </div>
              <h4 className="font-medium text-text-primary">{category.category}</h4>
            </div>

            {/* Category Metrics */}
            <div className="space-y-3">
              {category.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-4 bg-secondary-50 rounded-lg border border-secondary-200 hover:bg-secondary-100 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-secondary">
                      {metric.label}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Icon
                        name={getGrowthIcon(metric.growth)}
                        size={12}
                        className={getGrowthColor(metric.growth)}
                        strokeWidth={2}
                      />
                      <span className={`text-xs font-medium ${getGrowthColor(metric.growth)}`}>
                        {metric.growth > 0 ? '+' : ''}{formatPercentage(Math.abs(metric.growth))}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-xl font-bold text-text-primary">
                      {metric.value}
                    </span>
                  </div>
                  
                  <p className="text-xs text-text-muted">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Key Insights */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="font-medium text-text-primary mb-4">Key Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3 p-4 bg-success-50 border border-success-200 rounded-lg">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" strokeWidth={2} />
            <div>
              <p className="text-sm font-medium text-success mb-1">Strong Revenue Growth</p>
              <p className="text-xs text-text-secondary">
                Revenue increased by {formatPercentage(summaryData.revenueGrowth)} with {summaryData.topPerformingCategory} leading at {formatPercentage(summaryData.categoryGrowth)} growth
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-accent-50 border border-accent-200 rounded-lg">
            <Icon name="Users" size={16} color="var(--color-accent)" strokeWidth={2} />
            <div>
              <p className="text-sm font-medium text-accent mb-1">Customer Acquisition</p>
              <p className="text-xs text-text-secondary">
                CAC reduced by {formatPercentage(Math.abs(summaryData.cacGrowth))} while CLV increased by {formatPercentage(summaryData.clvGrowth)}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-warning-50 border border-warning-200 rounded-lg">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" strokeWidth={2} />
            <div>
              <p className="text-sm font-medium text-warning mb-1">Conversion Optimization</p>
              <p className="text-xs text-text-secondary">
                Conversion rate declined by {formatPercentage(Math.abs(summaryData.conversionGrowth))} - requires immediate attention
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <Icon name="Package" size={16} color="var(--color-primary)" strokeWidth={2} />
            <div>
              <p className="text-sm font-medium text-primary mb-1">Operational Efficiency</p>
              <p className="text-xs text-text-secondary">
                Return rate improved by {formatPercentage(Math.abs(summaryData.returnGrowth))} with inventory turnover at {summaryData.inventoryTurnover}x
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummary;