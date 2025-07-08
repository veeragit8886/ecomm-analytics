import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFiltersChange, onReset, onBookmark }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const customerSegments = [
    { id: 'all', label: 'All Customers', count: '125.4K' },
    { id: 'new', label: 'New Customers', count: '23.1K' },
    { id: 'returning', label: 'Returning', count: '87.2K' },
    { id: 'vip', label: 'VIP Customers', count: '15.1K' }
  ];

  const productCategories = [
    { id: 'electronics', label: 'Electronics', selected: true },
    { id: 'clothing', label: 'Clothing & Fashion', selected: false },
    { id: 'home', label: 'Home & Garden', selected: true },
    { id: 'sports', label: 'Sports & Outdoors', selected: false },
    { id: 'books', label: 'Books & Media', selected: false },
    { id: 'beauty', label: 'Beauty & Personal Care', selected: true }
  ];

  const trafficSources = [
    { id: 'organic', label: 'Organic Search', percentage: '42%' },
    { id: 'paid', label: 'Paid Advertising', percentage: '28%' },
    { id: 'social', label: 'Social Media', percentage: '18%' },
    { id: 'direct', label: 'Direct Traffic', percentage: '12%' }
  ];

  const handleSegmentChange = (segmentId) => {
    onFiltersChange({
      ...filters,
      customerSegment: segmentId
    });
  };

  const handleCategoryToggle = (categoryId) => {
    const updatedCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    
    onFiltersChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleTrafficSourceToggle = (sourceId) => {
    const updatedSources = filters.trafficSources.includes(sourceId)
      ? filters.trafficSources.filter(id => id !== sourceId)
      : [...filters.trafficSources, sourceId];
    
    onFiltersChange({
      ...filters,
      trafficSources: updatedSources
    });
  };

  const handleDateRangeChange = (field, value) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-text-primary">Advanced Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            iconName="Bookmark"
            iconSize={16}
            onClick={onBookmark}
            className="text-text-secondary hover:text-primary"
          >
            Save
          </Button>
          <Button
            variant="ghost"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-text-secondary"
          />
        </div>
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Customer Segments */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Customer Segments
            </label>
            <div className="grid grid-cols-2 gap-2">
              {customerSegments.map((segment) => (
                <button
                  key={segment.id}
                  onClick={() => handleSegmentChange(segment.id)}
                  className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                    filters.customerSegment === segment.id
                      ? 'border-primary bg-primary-50 text-primary' :'border-border bg-surface hover:border-primary-200 text-text-secondary'
                  }`}
                >
                  <div className="font-medium text-sm">{segment.label}</div>
                  <div className="text-xs opacity-75">{segment.count}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Product Categories
            </label>
            <div className="space-y-2">
              {productCategories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-secondary">{category.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Traffic Sources
            </label>
            <div className="space-y-2">
              {trafficSources.map((source) => (
                <label
                  key={source.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary-50 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={filters.trafficSources.includes(source.id)}
                      onChange={() => handleTrafficSourceToggle(source.id)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-text-secondary">{source.label}</span>
                  </div>
                  <span className="text-xs text-text-muted">{source.percentage}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Cohort Analysis Date Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-text-muted mb-1">Start Date</label>
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">End Date</label>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="ghost"
              iconName="RotateCcw"
              iconSize={16}
              onClick={onReset}
              className="text-text-secondary"
            >
              Reset Filters
            </Button>
            <div className="flex items-center space-x-2">
              <div className="text-xs text-text-muted">
                {filters.categories.length} categories, {filters.trafficSources.length} sources
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;