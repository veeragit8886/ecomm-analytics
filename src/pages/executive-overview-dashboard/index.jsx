import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/ui/DashboardHeader';
import KPICard from './components/KPICard';
import DateRangePicker from './components/DateRangePicker';
import RevenueChart from './components/RevenueChart';
import AlertsPanel from './components/AlertsPanel';
import GeographicHeatmap from './components/GeographicHeatmap';
import ExecutiveSummary from './components/ExecutiveSummary';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ExecutiveOverviewDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('MTD');
  const [showComparison, setShowComparison] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data loading simulation
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
    };

    loadDashboardData();
  }, [dateRange]);

  const handleDateRangeChange = (period) => {
    setDateRange(period.key);
    console.log('Date range changed to:', period);
  };

  const handleComparisonToggle = (enabled) => {
    setShowComparison(enabled);
    console.log('Comparison mode:', enabled);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    console.log('Category filter changed to:', category);
  };

  const handleExportPDF = () => {
    console.log('Exporting executive dashboard to PDF...');
    // Mock export functionality
  };

  // Mock KPI data
  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$2.84M',
      change: '+18.5%',
      changeType: 'positive',
      icon: 'DollarSign',
      trend: [125000, 142000, 158000, 167000, 189000, 203000, 218000, 234000, 245000, 267000, 289000, 312000],
      loading: loading
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      changeType: 'negative',
      icon: 'Target',
      trend: [3.8, 3.6, 3.4, 3.2, 3.1, 3.0, 3.1, 3.2, 3.3, 3.2, 3.1, 3.24],
      loading: loading
    },
    {
      title: 'Average Order Value',
      value: '$154.67',
      change: '+5.8%',
      changeType: 'positive',
      icon: 'ShoppingCart',
      trend: [142, 145, 148, 151, 149, 152, 155, 158, 156, 159, 162, 154.67],
      loading: loading
    },
    {
      title: 'Active Customers',
      value: '34.5K',
      change: '+15.2%',
      changeType: 'positive',
      icon: 'Users',
      trend: [28000, 29200, 30100, 31500, 32200, 32800, 33100, 33600, 34000, 34200, 34300, 34500],
      loading: loading
    }
  ];

  const categoryFilters = [
    { key: 'all', label: 'All Categories', icon: 'Grid3X3' },
    { key: 'electronics', label: 'Electronics', icon: 'Smartphone' },
    { key: 'clothing', label: 'Clothing', icon: 'Shirt' },
    { key: 'home', label: 'Home & Garden', icon: 'Home' },
    { key: 'books', label: 'Books', icon: 'Book' },
    { key: 'sports', label: 'Sports', icon: 'Dumbbell' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="dashboard-content">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Executive Overview Dashboard
              </h1>
              <p className="text-text-secondary">
                Strategic KPI dashboard for C-level rapid business assessment and decision-making
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <DateRangePicker
                onDateRangeChange={handleDateRangeChange}
                onComparisonToggle={handleComparisonToggle}
                showComparison={showComparison}
              />
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  iconName={refreshing ? "Loader2" : "RefreshCw"}
                  iconPosition="left"
                  className={refreshing ? "animate-spin" : ""}
                >
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
                
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleExportPDF}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categoryFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => handleCategoryFilter(filter.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    selectedCategory === filter.key
                      ? 'bg-primary-50 border-primary-200 text-primary' :'bg-surface border-border text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                  }`}
                >
                  <Icon name={filter.icon} size={16} strokeWidth={2} />
                  <span className="text-sm font-medium">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                changeType={kpi.changeType}
                icon={kpi.icon}
                trend={kpi.trend}
                loading={kpi.loading}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Revenue Chart - 2 columns */}
            <div className="lg:col-span-2">
              <RevenueChart
                loading={loading}
                showForecast={true}
              />
            </div>

            {/* Alerts Panel - 1 column */}
            <div className="lg:col-span-1">
              <AlertsPanel loading={loading} />
            </div>
          </div>

          {/* Geographic Heatmap */}
          <div className="mb-8">
            <GeographicHeatmap loading={loading} />
          </div>

          {/* Executive Summary */}
          <div className="mb-8">
            <ExecutiveSummary loading={loading} />
          </div>

          {/* Loading Overlay */}
          {loading && (
            <div className="fixed inset-0 bg-secondary-900/20 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-surface rounded-lg border border-border p-8 shadow-modal">
                <LoadingIndicator
                  type="spinner"
                  size="lg"
                  message="Loading executive dashboard..."
                  className="flex-col space-y-4"
                />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-text-muted">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <span>Last updated: {new Date().toLocaleString()}</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Live data</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span>Data refresh: Every 30 minutes</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={14} />
                  <span>Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveOverviewDashboard;