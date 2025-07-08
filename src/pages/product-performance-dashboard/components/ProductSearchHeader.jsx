import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ProductSearchHeader = ({ onSearchChange, onCategoryChange, onPeriodChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', count: 1247 },
    { id: 'electronics', name: 'Electronics', count: 324 },
    { id: 'clothing', name: 'Clothing & Fashion', count: 289 },
    { id: 'home', name: 'Home & Garden', count: 198 },
    { id: 'sports', name: 'Sports & Outdoors', count: 156 },
    { id: 'books', name: 'Books & Media', count: 134 },
    { id: 'health', name: 'Health & Beauty', count: 146 }
  ];

  const periods = [
    { id: '7d', name: 'Last 7 Days', description: 'Recent performance' },
    { id: '30d', name: 'Last 30 Days', description: 'Monthly trends' },
    { id: '90d', name: 'Last 90 Days', description: 'Quarterly analysis' },
    { id: '1y', name: 'Last Year', description: 'Annual performance' },
    { id: 'ytd', name: 'Year to Date', description: 'Current year progress' }
  ];

  const searchSuggestions = [
    'iPhone 15 Pro Max',
    'Samsung Galaxy S24',
    'Nike Air Max 270',
    'Adidas Ultraboost 22',
    'Sony WH-1000XM5',
    'MacBook Pro M3',
    'iPad Air 5th Gen',
    'Apple Watch Series 9'
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
    onSearchChange(value);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId);
  };

  const handlePeriodChange = (periodId) => {
    setSelectedPeriod(periodId);
    onPeriodChange(periodId);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    onSearchChange(suggestion);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="bg-surface border-b border-border p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Product Performance Dashboard
          </h1>
          <p className="text-text-secondary">
            Comprehensive analytics for inventory optimization and merchandising decisions
          </p>
        </div>

        {/* Search and Filters Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          {/* Product Search */}
          <div className="lg:col-span-5 search-container relative">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Search Products
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="Search" size={18} color="var(--color-text-muted)" />
              </div>
              <Input
                type="search"
                placeholder="Search by product name, SKU, or category..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4"
              />
              
              {/* Search Suggestions */}
              {showSuggestions && (
                <div className="absolute z-50 w-full mt-1 bg-surface border border-border rounded-lg shadow-floating max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <div className="text-xs font-medium text-text-muted mb-2 px-2">
                      Popular Products
                    </div>
                    {searchSuggestions
                      .filter(suggestion => 
                        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .slice(0, 6)
                      .map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-3 py-2 text-sm text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-150"
                        >
                          <div className="flex items-center space-x-2">
                            <Icon name="Package" size={14} color="var(--color-text-muted)" />
                            <span>{suggestion}</span>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="lg:col-span-3">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Category
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Icon name="ChevronDown" size={16} color="var(--color-text-muted)" />
              </div>
            </div>
          </div>

          {/* Period Selector */}
          <div className="lg:col-span-3">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Time Period
            </label>
            <div className="relative">
              <select
                value={selectedPeriod}
                onChange={(e) => handlePeriodChange(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>
                    {period.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Icon name="Calendar" size={16} color="var(--color-text-muted)" />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="lg:col-span-1">
            <Button
              variant="primary"
              iconName="Filter"
              className="w-full"
              onClick={() => {}}
            >
              <span className="hidden lg:inline">Filter</span>
            </Button>
          </div>
        </div>

        {/* Quick Category Navigation */}
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.slice(0, 6).map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSearchHeader;