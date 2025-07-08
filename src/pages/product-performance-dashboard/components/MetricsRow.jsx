import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsRow = () => {
  const metrics = [
    {
      id: 'velocity',
      title: 'Product Velocity Score',
      value: '8.7',
      unit: '/10',
      change: '+12.5%',
      trend: 'up',
      description: 'Average sales velocity across all products',
      icon: 'Zap',
      color: 'accent',
      details: {
        current: '8.7/10',
        previous: '7.7/10',
        target: '9.0/10'
      }
    },
    {
      id: 'turnover',
      title: 'Inventory Turnover Rate',
      value: '4.2',
      unit: 'x/year',
      change: '+8.3%',
      trend: 'up',
      description: 'How quickly inventory is sold and replaced',
      icon: 'RotateCcw',
      color: 'primary',
      details: {
        current: '4.2x',
        previous: '3.9x',
        target: '5.0x'
      }
    },
    {
      id: 'margin',
      title: 'Profit Margin Trends',
      value: '24.8',
      unit: '%',
      change: '-2.1%',
      trend: 'down',
      description: 'Average profit margin across product categories',
      icon: 'TrendingUp',
      color: 'warning',
      details: {
        current: '24.8%',
        previous: '25.3%',
        target: '28.0%'
      }
    },
    {
      id: 'stockout',
      title: 'Stockout Frequency',
      value: '3.2',
      unit: '%',
      change: '-15.4%',
      trend: 'up',
      description: 'Percentage of products experiencing stockouts',
      icon: 'AlertTriangle',
      color: 'success',
      details: {
        current: '3.2%',
        previous: '3.8%',
        target: '2.0%'
      }
    }
  ];

  const getColorClasses = (color, trend) => {
    const colorMap = {
      accent: {
        bg: 'bg-accent-50',
        icon: 'bg-accent text-accent-foreground',
        text: 'text-accent-700'
      },
      primary: {
        bg: 'bg-primary-50',
        icon: 'bg-primary text-primary-foreground',
        text: 'text-primary-700'
      },
      warning: {
        bg: 'bg-warning-50',
        icon: 'bg-warning text-warning-foreground',
        text: 'text-warning-700'
      },
      success: {
        bg: 'bg-success-50',
        icon: 'bg-success text-success-foreground',
        text: 'text-success-700'
      }
    };

    return colorMap[color] || colorMap.primary;
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend, change) => {
    if (change.startsWith('-') && trend === 'up') return 'text-success'; // Negative change but good trend (like stockout reduction)
    if (change.startsWith('+') && trend === 'up') return 'text-success';
    if (change.startsWith('-') && trend === 'down') return 'text-error';
    return 'text-text-muted';
  };

  return (
    <div className="bg-surface p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {metrics.map((metric) => {
            const colorClasses = getColorClasses(metric.color, metric.trend);
            
            return (
              <div
                key={metric.id}
                className={`${colorClasses.bg} rounded-xl p-6 border border-border hover:shadow-elevated transition-shadow duration-200`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`${colorClasses.icon} p-3 rounded-lg`}>
                    <Icon name={metric.icon} size={24} strokeWidth={2} />
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend, metric.change)}`}>
                      <Icon 
                        name={getTrendIcon(metric.trend)} 
                        size={16} 
                        strokeWidth={2}
                      />
                      <span className="text-sm font-medium">{metric.change}</span>
                    </div>
                  </div>
                </div>

                {/* Main Value */}
                <div className="mb-3">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-bold text-text-primary">
                      {metric.value}
                    </span>
                    <span className="text-lg text-text-secondary font-medium">
                      {metric.unit}
                    </span>
                  </div>
                </div>

                {/* Title and Description */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-text-primary mb-1">
                    {metric.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {metric.description}
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>Current</span>
                    <span>Target</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        metric.color === 'accent' ? 'bg-accent' :
                        metric.color === 'primary' ? 'bg-primary' :
                        metric.color === 'warning'? 'bg-warning' : 'bg-success'
                      }`}
                      style={{ 
                        width: metric.id === 'velocity' ? '87%' :
                               metric.id === 'turnover' ? '84%' :
                               metric.id === 'margin' ? '89%' : '60%'
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={colorClasses.text}>{metric.details.current}</span>
                    <span className="text-text-muted">{metric.details.target}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Insights */}
        <div className="mt-6 bg-secondary-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-primary p-2 rounded-lg">
              <Icon name="Lightbulb" size={20} color="white" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-text-primary mb-1">
                Performance Insights
              </h4>
              <p className="text-sm text-text-secondary">
                Product velocity and inventory turnover are trending positively, indicating strong demand management. 
                Focus on margin optimization strategies to reach the 28% target while maintaining current stockout performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsRow;