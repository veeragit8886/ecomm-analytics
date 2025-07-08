import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = ({ className = '', onTabChange }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: 'executive',
      label: 'Executive Overview',
      path: '/executive-overview-dashboard',
      icon: 'TrendingUp',
      description: 'Strategic KPI dashboard for C-level rapid business assessment'
    },
    {
      id: 'operations',
      label: 'Operations Center',
      path: '/operations-command-center',
      icon: 'Activity',
      description: 'Real-time operational monitoring for order fulfillment and process efficiency'
    },
    {
      id: 'sales',
      label: 'Sales Analytics',
      path: '/sales-analytics-dashboard',
      icon: 'BarChart3',
      description: 'Interactive data exploration for customer behavior and revenue analysis'
    },
    {
      id: 'products',
      label: 'Product Performance',
      path: '/product-performance-dashboard',
      icon: 'Package',
      description: 'Comprehensive product analytics for inventory and merchandising optimization'
    }
  ];

  const handleTabClick = (item) => {
    navigate(item.path);
    if (onTabChange) {
      onTabChange(item);
    }
  };

  const handleKeyDown = (event, item) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(item);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const currentIndex = navigationItems.findIndex(navItem => navItem.path === location.pathname);
      let nextIndex;
      
      if (event.key === 'ArrowLeft') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : navigationItems.length - 1;
      } else {
        nextIndex = currentIndex < navigationItems.length - 1 ? currentIndex + 1 : 0;
      }
      
      const nextItem = navigationItems[nextIndex];
      handleTabClick(nextItem);
    }
  };

  const isActiveTab = (path) => {
    return location.pathname === path;
  };

  const getActiveTabIndex = () => {
    return navigationItems.findIndex(item => item.path === location.pathname);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <nav 
        className="flex items-center space-x-1" 
        role="tablist" 
        aria-label="Dashboard navigation tabs"
        aria-orientation="horizontal"
      >
        {navigationItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item)}
            onKeyDown={(e) => handleKeyDown(e, item)}
            className={`nav-tab ${isActiveTab(item.path) ? 'active' : ''}`}
            role="tab"
            tabIndex={isActiveTab(item.path) ? 0 : -1}
            aria-selected={isActiveTab(item.path)}
            aria-controls={`${item.id}-panel`}
            aria-describedby={`${item.id}-description`}
            title={item.description}
          >
            <div className="flex items-center space-x-2">
              <Icon 
                name={item.icon} 
                size={16} 
                strokeWidth={2}
                color={isActiveTab(item.path) ? 'var(--color-primary)' : 'currentColor'}
              />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.label.split(' ')[0]}</span>
            </div>
            
            {/* Screen reader description */}
            <span id={`${item.id}-description`} className="sr-only">
              {item.description}
            </span>
            
            {/* Active indicator for screen readers */}
            {isActiveTab(item.path) && (
              <span className="sr-only">Current page</span>
            )}
          </button>
        ))}
      </nav>

      {/* Tab position indicator for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Tab {getActiveTabIndex() + 1} of {navigationItems.length} selected
      </div>
    </div>
  );
};

export default TabNavigation;