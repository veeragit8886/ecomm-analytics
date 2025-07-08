import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = ({ alerts = [], loading = false }) => {
  const [filter, setFilter] = useState('all');
  const [isExpanded, setIsExpanded] = useState(true);

  const mockAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Inventory Critical',
      message: 'iPhone 15 Pro stock below 10 units',
      timestamp: new Date(Date.now() - 300000),
      category: 'inventory',
      actionRequired: true,
      resolved: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Conversion Rate Drop',
      message: 'Mobile conversion down 15% vs last week',
      timestamp: new Date(Date.now() - 900000),
      category: 'performance',
      actionRequired: true,
      resolved: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Payment Gateway Update',
      message: 'Stripe integration updated successfully',
      timestamp: new Date(Date.now() - 1800000),
      category: 'system',
      actionRequired: false,
      resolved: true
    },
    {
      id: 4,
      type: 'success',
      title: 'Revenue Milestone',
      message: 'Monthly target achieved 5 days early',
      timestamp: new Date(Date.now() - 3600000),
      category: 'achievement',
      actionRequired: false,
      resolved: false
    },
    {
      id: 5,
      type: 'warning',
      title: 'High Cart Abandonment',
      message: 'Cart abandonment rate increased to 68%',
      timestamp: new Date(Date.now() - 7200000),
      category: 'performance',
      actionRequired: true,
      resolved: false
    }
  ];

  const alertData = alerts.length > 0 ? alerts : mockAlerts;

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      case 'success': return 'CheckCircle';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      case 'success': return 'text-success';
      default: return 'text-text-muted';
    }
  };

  const getAlertBgColor = (type) => {
    switch (type) {
      case 'critical': return 'bg-error-50 border-error-200';
      case 'warning': return 'bg-warning-50 border-warning-200';
      case 'info': return 'bg-primary-50 border-primary-200';
      case 'success': return 'bg-success-50 border-success-200';
      default: return 'bg-secondary-50 border-secondary-200';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const filteredAlerts = alertData.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unresolved') return !alert.resolved;
    if (filter === 'actionRequired') return alert.actionRequired;
    return alert.type === filter;
  });

  const filterOptions = [
    { key: 'all', label: 'All Alerts', count: alertData.length },
    { key: 'unresolved', label: 'Unresolved', count: alertData.filter(a => !a.resolved).length },
    { key: 'critical', label: 'Critical', count: alertData.filter(a => a.type === 'critical').length },
    { key: 'actionRequired', label: 'Action Required', count: alertData.filter(a => a.actionRequired).length }
  ];

  if (loading) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-secondary-200 rounded w-32"></div>
            <div className="h-8 w-8 bg-secondary-200 rounded"></div>
          </div>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="mb-4 p-3 bg-secondary-100 rounded-lg">
              <div className="h-4 bg-secondary-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-warning-50 rounded-lg">
            <Icon name="Bell" size={16} color="var(--color-warning)" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Performance Alerts</h3>
            <p className="text-sm text-text-muted">
              {filteredAlerts.filter(a => !a.resolved).length} active alerts requiring attention
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
        />
      </div>

      {isExpanded && (
        <>
          {/* Filter Tabs */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => setFilter(option.key)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filter === option.key
                      ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                  }`}
                >
                  <span>{option.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    filter === option.key
                      ? 'bg-primary-100 text-primary' :'bg-secondary-200 text-text-muted'
                  }`}>
                    {option.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Alerts List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredAlerts.length === 0 ? (
              <div className="p-6 text-center">
                <Icon name="CheckCircle" size={48} color="var(--color-success)" className="mx-auto mb-3" />
                <p className="text-text-muted">No alerts match your current filter</p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-soft ${
                      alert.resolved ? 'opacity-60' : ''
                    } ${getAlertBgColor(alert.type)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 ${getAlertColor(alert.type)}`}>
                        <Icon name={getAlertIcon(alert.type)} size={18} strokeWidth={2} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-text-primary truncate">
                            {alert.title}
                          </h4>
                          <span className="text-xs text-text-muted flex-shrink-0 ml-2">
                            {formatTimeAgo(alert.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-text-secondary mb-2">
                          {alert.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              alert.type === 'critical' ? 'bg-error-100 text-error' :
                              alert.type === 'warning' ? 'bg-warning-100 text-warning' :
                              alert.type === 'success'? 'bg-success-100 text-success' : 'bg-primary-100 text-primary'
                            }`}>
                              {alert.category}
                            </span>
                            
                            {alert.actionRequired && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-text-secondary">
                                Action Required
                              </span>
                            )}
                          </div>
                          
                          {!alert.resolved && (
                            <Button
                              variant="ghost"
                              size="xs"
                              onClick={() => console.log('Resolving alert:', alert.id)}
                              iconName="Check"
                              iconPosition="left"
                            >
                              Resolve
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Panel Footer */}
          <div className="px-6 py-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">
                Showing {filteredAlerts.length} of {alertData.length} alerts
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => console.log('View all alerts')}
                iconName="ExternalLink"
                iconPosition="right"
              >
                View All
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AlertsPanel;