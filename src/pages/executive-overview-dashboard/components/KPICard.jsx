import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  trend = [], 
  loading = false,
  className = '' 
}) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-text-muted';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  const renderSparkline = () => {
    if (!trend.length) return null;
    
    const max = Math.max(...trend);
    const min = Math.min(...trend);
    const range = max - min || 1;
    
    const points = trend.map((value, index) => {
      const x = (index / (trend.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="mt-2 h-8 w-full">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={changeType === 'positive' ? 'text-success' : changeType === 'negative' ? 'text-error' : 'text-primary'}
          />
        </svg>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`bg-surface rounded-lg border border-border p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-secondary-200 rounded w-24"></div>
            <div className="h-8 w-8 bg-secondary-200 rounded"></div>
          </div>
          <div className="h-8 bg-secondary-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-secondary-200 rounded w-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-surface rounded-lg border border-border p-6 hover:shadow-elevated transition-shadow duration-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        <div className="flex items-center justify-center w-8 h-8 bg-primary-50 rounded-lg">
          <Icon name={icon} size={16} color="var(--color-primary)" strokeWidth={2} />
        </div>
      </div>
      
      <div className="mb-2">
        <span className="text-2xl font-bold text-text-primary">{value}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Icon 
            name={getChangeIcon()} 
            size={14} 
            className={getChangeColor()}
            strokeWidth={2}
          />
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {change}
          </span>
        </div>
        
        {trend.length > 0 && (
          <div className="flex-1 ml-4">
            {renderSparkline()}
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;