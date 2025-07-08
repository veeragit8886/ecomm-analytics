import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateRangePicker = ({ onDateRangeChange, onComparisonToggle, showComparison = false }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('MTD');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [comparisonEnabled, setComparisonEnabled] = useState(showComparison);

  const fiscalPeriods = [
    { key: 'MTD', label: 'Month to Date', description: 'Current month performance' },
    { key: 'QTD', label: 'Quarter to Date', description: 'Current quarter performance' },
    { key: 'YTD', label: 'Year to Date', description: 'Current year performance' },
    { key: 'L30D', label: 'Last 30 Days', description: 'Rolling 30-day period' },
    { key: 'L90D', label: 'Last 90 Days', description: 'Rolling 90-day period' },
    { key: 'LY', label: 'Last Year', description: 'Previous year comparison' }
  ];

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period.key);
    setIsDropdownOpen(false);
    if (onDateRangeChange) {
      onDateRangeChange(period);
    }
  };

  const handleComparisonToggle = () => {
    const newState = !comparisonEnabled;
    setComparisonEnabled(newState);
    if (onComparisonToggle) {
      onComparisonToggle(newState);
    }
  };

  const selectedPeriodData = fiscalPeriods.find(p => p.key === selectedPeriod);

  return (
    <div className="flex items-center space-x-4">
      {/* Period Selector */}
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          iconName="Calendar"
          iconPosition="left"
          className="min-w-[140px] justify-between"
        >
          <span>{selectedPeriodData?.label}</span>
          <Icon 
            name={isDropdownOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="ml-2"
          />
        </Button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-floating z-50">
            <div className="p-2">
              {fiscalPeriods.map((period) => (
                <button
                  key={period.key}
                  onClick={() => handlePeriodSelect(period)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                    selectedPeriod === period.key
                      ? 'bg-primary-50 text-primary border border-primary-200' :'hover:bg-secondary-50 text-text-primary'
                  }`}
                >
                  <div className="font-medium">{period.label}</div>
                  <div className="text-xs text-text-muted mt-1">{period.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Comparison Toggle */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleComparisonToggle}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors duration-200 ${
            comparisonEnabled
              ? 'bg-accent-50 border-accent-200 text-accent' :'bg-surface border-border text-text-secondary hover:bg-secondary-50'
          }`}
        >
          <Icon 
            name={comparisonEnabled ? "ToggleRight" : "ToggleLeft"} 
            size={16}
            color={comparisonEnabled ? 'var(--color-accent)' : 'currentColor'}
          />
          <span className="text-sm font-medium">Compare</span>
        </button>
      </div>

      {/* Export Button */}
      <Button
        variant="ghost"
        iconName="Download"
        iconPosition="left"
        onClick={() => {
          // Mock export functionality
          console.log('Exporting executive summary...');
        }}
      >
        Export PDF
      </Button>

      {/* Refresh Indicator */}
      <div className="flex items-center space-x-2 text-text-muted">
        <Icon name="RefreshCw" size={14} className="animate-spin-slow" />
        <span className="text-xs">Updated 5 min ago</span>
      </div>
    </div>
  );
};

export default DateRangePicker;