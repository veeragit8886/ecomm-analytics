import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const DashboardHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleTabClick = (path) => {
    setIsLoading(true);
    navigate(path);
    setIsMobileMenuOpen(false);
    
    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handleKeyDown = (event, path) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(path);
    }
  };

  const isActiveTab = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="dashboard-header">
        <div className="flex items-center justify-between h-full px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="BarChart3" size={20} color="white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-text-primary leading-tight">
                  eCommerce Analytics Hub
                </h1>
                <span className="text-xs text-text-secondary font-medium">
                  Business Intelligence Platform
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.path)}
                onKeyDown={(e) => handleKeyDown(e, item.path)}
                className={`nav-tab ${isActiveTab(item.path) ? 'active' : ''}`}
                role="tab"
                aria-selected={isActiveTab(item.path)}
                aria-describedby={`${item.id}-description`}
                title={item.description}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={item.icon} size={16} strokeWidth={2} />
                  <span>{item.label}</span>
                </div>
                <span id={`${item.id}-description`} className="sr-only">
                  {item.description}
                </span>
              </button>
            ))}
          </nav>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="hidden md:flex loading-indicator">
              <div className="loading-spinner"></div>
              <span>Loading...</span>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-colors duration-200"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-200 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-secondary-900/50 backdrop-blur-sm"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />
          
          {/* Mobile Menu Panel */}
          <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-surface shadow-modal animate-slide-in">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-text-primary">Navigation</h2>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-colors duration-200"
                aria-label="Close navigation menu"
              >
                <Icon name="X" size={20} strokeWidth={2} />
              </button>
            </div>
            
            <nav className="p-4" role="navigation" aria-label="Mobile navigation">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.path)}
                    className={`w-full flex items-center space-x-3 p-4 rounded-lg text-left transition-colors duration-200 ${
                      isActiveTab(item.path)
                        ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                    }`}
                    role="tab"
                    aria-selected={isActiveTab(item.path)}
                  >
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      strokeWidth={2}
                      color={isActiveTab(item.path) ? 'var(--color-primary)' : 'currentColor'}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-text-muted mt-1">{item.description}</div>
                    </div>
                    {isActiveTab(item.path) && (
                      <Icon name="Check" size={16} color="var(--color-primary)" strokeWidth={2.5} />
                    )}
                  </button>
                ))}
              </div>
            </nav>

            {/* Mobile Loading Indicator */}
            {isLoading && (
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-center space-x-2 p-3 bg-secondary-50 rounded-lg">
                  <div className="loading-spinner"></div>
                  <span className="text-sm text-text-secondary">Loading dashboard...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHeader;