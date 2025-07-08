import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveAlertFeed = ({ alerts, onAlertAction, isRealTime }) => {
  const [filteredAlerts, setFilteredAlerts] = useState(alerts);
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const severityLevels = [
    { value: 'all', label: 'All Alerts', count: alerts.length },
    { value: 'critical', label: 'Critical', count: alerts.filter(a => a.severity === 'critical').length },
    { value: 'high', label: 'High', count: alerts.filter(a => a.severity === 'high').length },
    { value: 'medium', label: 'Medium', count: alerts.filter(a => a.severity === 'medium').length },
    { value: 'low', label: 'Low', count: alerts.filter(a => a.severity === 'low').length }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'inventory', label: 'Inventory' },
    { value: 'orders', label: 'Orders' },
    { value: 'fulfillment', label: 'Fulfillment' },
    { value: 'system', label: 'System' }
  ];

  useEffect(() => {
    let filtered = alerts;
    
    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(alert => alert.severity === selectedSeverity);
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(alert => alert.category === selectedCategory);
    }
    
    setFilteredAlerts(filtered);
  }, [alerts, selectedSeverity, selectedCategory]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error-50 border-error-200 text-error';
      case 'high':
        return 'bg-warning-50 border-warning-200 text-warning';
      case 'medium':
        return 'bg-primary-50 border-primary-200 text-primary';
      case 'low':
        return 'bg-secondary-50 border-secondary-200 text-secondary';
      default:
        return 'bg-surface border-border text-text-secondary';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertCircle';
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'Info';
      case 'low':
        return 'Bell';
      default:
        return 'Bell';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'inventory':
        return 'Package';
      case 'orders':
        return 'ShoppingCart';
      case 'fulfillment':
        return 'Truck';
      case 'system':
        return 'Server';
      default:
        return 'Bell';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return alertTime.toLocaleDateString();
  };

  const handleAlertAction = (alertId, action) => {
    onAlertAction(alertId, action);
  };

  return (
    <div className="bg-surface border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-error-50 rounded-lg">
            <Icon name="AlertTriangle" size={20} className="text-error" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Live Alerts</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isRealTime ? 'bg-accent animate-pulse' : 'bg-secondary-400'}`} />
              <span className="text-sm text-text-secondary">
                {isRealTime ? 'Real-time monitoring' : 'Updates paused'}
              </span>
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" iconName="Settings">
          Configure
        </Button>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-border space-y-3">
        {/* Severity Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Severity</label>
          <div className="flex flex-wrap gap-2">
            {severityLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => setSelectedSeverity(level.value)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  selectedSeverity === level.value
                    ? 'bg-primary text-white border-primary' :'bg-surface text-text-secondary border-border hover:border-primary'
                }`}
              >
                {level.label} ({level.count})
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Alert List */}
      <div className="flex-1 overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-success mb-4" />
            <h4 className="text-lg font-medium text-text-primary mb-2">All Clear!</h4>
            <p className="text-text-secondary">No alerts match your current filters.</p>
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-soft ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={getSeverityIcon(alert.severity)} 
                      size={20} 
                      className="current-color flex-shrink-0"
                    />
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getCategoryIcon(alert.category)} 
                        size={16} 
                        className="text-text-secondary"
                      />
                      <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                        {alert.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-text-secondary">
                    {formatTimestamp(alert.timestamp)}
                  </span>
                </div>
                
                <h4 className="font-medium text-text-primary mb-2">
                  {alert.title}
                </h4>
                
                <p className="text-sm text-text-secondary mb-3">
                  {alert.description}
                </p>
                
                {alert.metadata && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {Object.entries(alert.metadata).map(([key, value]) => (
                      <span
                        key={key}
                        className="px-2 py-1 text-xs bg-surface-secondary rounded-full text-text-secondary"
                      >
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {alert.actions.map((action) => (
                      <Button
                        key={action.id}
                        variant={action.primary ? "primary" : "outline"}
                        size="xs"
                        onClick={() => handleAlertAction(alert.id, action.id)}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="X"
                    onClick={() => handleAlertAction(alert.id, 'dismiss')}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveAlertFeed;