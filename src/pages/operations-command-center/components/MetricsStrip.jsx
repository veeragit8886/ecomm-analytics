import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsStrip = ({ metrics, isLoading }) => {
  const metricCards = [
    {
      id: 'pending-orders',
      title: 'Pending Orders',
      value: metrics.pendingOrders,
      change: metrics.pendingOrdersChange,
      icon: 'Package',
      status: metrics.pendingOrders > 50 ? 'warning' : 'success',
      unit: 'orders'
    },
    {
      id: 'low-stock-alerts',
      title: 'Low Stock Alerts',
      value: metrics.lowStockAlerts,
      change: metrics.lowStockAlertsChange,
      icon: 'AlertTriangle',
      status: metrics.lowStockAlerts > 10 ? 'danger' : metrics.lowStockAlerts > 5 ? 'warning' : 'success',
      unit: 'items'
    },
    {
      id: 'fulfillment-rate',
      title: 'Fulfillment Rate',
      value: metrics.fulfillmentRate,
      change: metrics.fulfillmentRateChange,
      icon: 'TrendingUp',
      status: metrics.fulfillmentRate >= 95 ? 'success' : metrics.fulfillmentRate >= 85 ? 'warning' : 'danger',
      unit: '%'
    },
    {
      id: 'processing-time',
      title: 'Avg Processing Time',
      value: metrics.avgProcessingTime,
      change: metrics.processingTimeChange,
      icon: 'Clock',
      status: metrics.avgProcessingTime <= 2 ? 'success' : metrics.avgProcessingTime <= 4 ? 'warning' : 'danger',
      unit: 'hrs'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success border-success-200 bg-success-50';
      case 'warning':
        return 'text-warning border-warning-200 bg-warning-50';
      case 'danger':
        return 'text-error border-error-200 bg-error-50';
      default:
        return 'text-text-secondary border-border bg-surface';
    }
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-text-secondary';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg p-4 animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div className="w-6 h-6 bg-secondary-200 rounded"></div>
              <div className="w-4 h-4 bg-secondary-200 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="w-16 h-8 bg-secondary-200 rounded"></div>
              <div className="w-24 h-4 bg-secondary-200 rounded"></div>
              <div className="w-20 h-3 bg-secondary-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-surface-secondary">
      {metricCards.map((metric) => (
        <div
          key={metric.id}
          className={`bg-surface border-2 rounded-lg p-4 transition-all duration-200 hover:shadow-elevated ${getStatusColor(metric.status)}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${getStatusColor(metric.status).replace('border-', 'bg-').replace('bg-', 'bg-opacity-20 bg-')}`}>
              <Icon name={metric.icon} size={20} className="current-color" />
            </div>
            <div className={`w-3 h-3 rounded-full ${getStatusColor(metric.status).split(' ')[2]}`}></div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-text-primary">
                {metric.value}
              </span>
              <span className="text-sm text-text-secondary font-medium">
                {metric.unit}
              </span>
            </div>
            
            <h3 className="text-sm font-medium text-text-primary">
              {metric.title}
            </h3>
            
            <div className="flex items-center space-x-1">
              <Icon 
                name={getChangeIcon(metric.change)} 
                size={12} 
                className={getChangeColor(metric.change)}
              />
              <span className={`text-xs font-medium ${getChangeColor(metric.change)}`}>
                {Math.abs(metric.change)}% vs yesterday
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsStrip;