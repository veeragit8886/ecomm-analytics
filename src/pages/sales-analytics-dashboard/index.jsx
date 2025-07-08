import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/ui/DashboardHeader';
import FilterPanel from './components/FilterPanel';
import ConversionFunnelChart from './components/ConversionFunnelChart';
import CustomerLifetimeValueChart from './components/CustomerLifetimeValueChart';
import TopProductsLeaderboard from './components/TopProductsLeaderboard';
import SalesAttributionTable from './components/SalesAttributionTable';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SalesAnalyticsDashboard = () => {
  const [filters, setFilters] = useState({
    customerSegment: 'all',
    categories: ['electronics', 'home', 'beauty'],
    trafficSources: ['organic', 'paid'],
    dateRange: {
      start: '2024-01-01',
      end: '2024-12-31'
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [bookmarkedFilters, setBookmarkedFilters] = useState([]);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update last updated time every minute
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setIsLoading(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 800);
  };

  const handleFiltersReset = () => {
    const defaultFilters = {
      customerSegment: 'all',
      categories: [],
      trafficSources: [],
      dateRange: {
        start: '2024-01-01',
        end: '2024-12-31'
      }
    };
    setFilters(defaultFilters);
  };

  const handleBookmarkFilters = () => {
    const bookmark = {
      id: Date.now(),
      name: `Filter Set ${bookmarkedFilters.length + 1}`,
      filters: { ...filters },
      createdAt: new Date()
    };
    setBookmarkedFilters(prev => [...prev, bookmark]);
  };

  const handleFunnelDrillDown = (data, index) => {
    console.log('Drilling down into funnel stage:', data, index);
    // Implement drill-down functionality
  };

  const handleExportData = () => {
    // Simulate export functionality
    console.log('Exporting dashboard data...');
  };

  const handleScheduleReport = () => {
    // Simulate report scheduling
    console.log('Scheduling report...');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="dashboard-content">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="loading-spinner mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Loading Sales Analytics
              </h3>
              <p className="text-text-secondary">
                Fetching customer behavior data and revenue insights...
              </p>
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
        <div className="max-w-[1920px] mx-auto p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Sales Analytics Dashboard
              </h1>
              <p className="text-text-secondary">
                Interactive data exploration for customer behavior analysis and revenue optimization
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-text-muted">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <Button
                variant="ghost"
                iconName="Calendar"
                iconSize={16}
                onClick={handleScheduleReport}
                className="text-text-secondary hover:text-primary"
              >
                Schedule Report
              </Button>
              <Button
                variant="ghost"
                iconName="Download"
                iconSize={16}
                onClick={handleExportData}
                className="text-text-secondary hover:text-primary"
              >
                Export Data
              </Button>
              <Button
                variant="primary"
                iconName="RefreshCw"
                iconSize={16}
                onClick={() => handleFiltersChange(filters)}
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          <div className="mb-6">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={handleFiltersReset}
              onBookmark={handleBookmarkFilters}
            />
          </div>

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-24 gap-6 mb-6">
            {/* Conversion Funnel - 12 columns */}
            <div className="xl:col-span-12">
              <ConversionFunnelChart onDrillDown={handleFunnelDrillDown} />
            </div>

            {/* Customer Lifetime Value - 6 columns */}
            <div className="xl:col-span-6">
              <CustomerLifetimeValueChart />
            </div>

            {/* Top Products Leaderboard - 6 columns */}
            <div className="xl:col-span-6">
              <TopProductsLeaderboard />
            </div>
          </div>

          {/* Sales Attribution Table - Full Width */}
          <div className="mb-6">
            <SalesAttributionTable />
          </div>

          {/* Key Insights Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-surface border border-border rounded-lg p-6 shadow-soft">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Revenue Growth</h3>
                  <p className="text-sm text-text-secondary">Month over month</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-primary mb-2">+18.5%</div>
              <p className="text-sm text-text-secondary">
                Strong performance across all customer segments with VIP customers leading growth.
              </p>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6 shadow-soft">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} color="var(--color-accent)" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Customer Acquisition</h3>
                  <p className="text-sm text-text-secondary">New vs returning</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-accent mb-2">67:33</div>
              <p className="text-sm text-text-secondary">
                Healthy balance between new customer acquisition and retention strategies.
              </p>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6 shadow-soft">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-warning-50 rounded-lg flex items-center justify-center">
                  <Icon name="ShoppingCart" size={20} color="var(--color-warning)" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Cart Optimization</h3>
                  <p className="text-sm text-text-secondary">Abandonment insights</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-warning mb-2">-12.3%</div>
              <p className="text-sm text-text-secondary">
                Cart abandonment reduced through improved checkout flow and retargeting.
              </p>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6 shadow-soft">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-success-50 rounded-lg flex items-center justify-center">
                  <Icon name="Target" size={20} color="var(--color-success)" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Campaign ROI</h3>
                  <p className="text-sm text-text-secondary">Marketing efficiency</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-success mb-2">4.2x</div>
              <p className="text-sm text-text-secondary">
                Email marketing and organic search driving highest returns on investment.
              </p>
            </div>
          </div>

          {/* Bookmarked Filters */}
          {bookmarkedFilters.length > 0 && (
            <div className="bg-surface border border-border rounded-lg p-6 shadow-soft">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Bookmark" size={20} color="var(--color-primary)" />
                <h3 className="text-lg font-semibold text-text-primary">Saved Filter Sets</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {bookmarkedFilters.map((bookmark) => (
                  <button
                    key={bookmark.id}
                    onClick={() => setFilters(bookmark.filters)}
                    className="px-3 py-2 bg-primary-50 text-primary rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
                  >
                    {bookmark.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesAnalyticsDashboard;