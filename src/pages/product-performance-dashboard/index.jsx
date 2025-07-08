import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/ui/DashboardHeader';
import ProductSearchHeader from './components/ProductSearchHeader';
import MetricsRow from './components/MetricsRow';
import ProductPerformanceMatrix from './components/ProductPerformanceMatrix';
import CategoryRankings from './components/CategoryRankings';
import ProductTable from './components/ProductTable';

const ProductPerformanceDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="dashboard-content">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p className="text-text-secondary">Loading product performance data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="dashboard-content">
        {/* Search Header */}
        <ProductSearchHeader
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onPeriodChange={handlePeriodChange}
        />

        {/* Metrics Row */}
        <MetricsRow />

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Product Performance Matrix - Main Visualization */}
            <div className="xl:col-span-8">
              <ProductPerformanceMatrix />
            </div>

            {/* Category Rankings - Side Panel */}
            <div className="xl:col-span-4">
              <CategoryRankings />
            </div>
          </div>

          {/* Product Table - Full Width */}
          <div className="mt-6">
            <ProductTable />
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-surface border-t border-border mt-12">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Product Performance Dashboard
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Comprehensive analytics platform for inventory optimization and merchandising decisions. 
                  Monitor product performance, track inventory levels, and make data-driven decisions.
                </p>
                <div className="flex items-center space-x-4 text-sm text-text-muted">
                  <span>Last updated: {new Date().toLocaleString()}</span>
                  <span>•</span>
                  <span>Real-time data</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-3">Quick Actions</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li><a href="#" className="hover:text-primary transition-colors">Export Reports</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Inventory Alerts</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Reorder Products</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Performance Analysis</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-3">Support</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">System Status</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-text-muted">
                © {new Date().getFullYear()} eCommerce Analytics Hub. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProductPerformanceDashboard;