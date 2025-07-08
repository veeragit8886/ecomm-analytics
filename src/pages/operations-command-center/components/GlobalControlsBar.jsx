import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GlobalControlsBar = ({ 
  selectedWarehouse, 
  onWarehouseChange, 
  isRealTimeEnabled, 
  onRealTimeToggle,
  alertThresholds,
  onThresholdChange 
}) => {
  const [showThresholdModal, setShowThresholdModal] = useState(false);

  const warehouses = [
    { id: 'all', name: 'All Warehouses', location: 'Global View' },
    { id: 'wh-001', name: 'Main Distribution Center', location: 'New York, NY' },
    { id: 'wh-002', name: 'West Coast Hub', location: 'Los Angeles, CA' },
    { id: 'wh-003', name: 'Central Fulfillment', location: 'Chicago, IL' },
    { id: 'wh-004', name: 'Southeast Regional', location: 'Atlanta, GA' }
  ];

  const handleThresholdSave = (newThresholds) => {
    onThresholdChange(newThresholds);
    setShowThresholdModal(false);
  };

  return (
    <>
      <div className="bg-surface border-b border-border p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Section - Warehouse Selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Building2" size={20} className="text-text-secondary" />
              <label htmlFor="warehouse-select" className="text-sm font-medium text-text-primary">
                Warehouse:
              </label>
            </div>
            <select
              id="warehouse-select"
              value={selectedWarehouse}
              onChange={(e) => onWarehouseChange(e.target.value)}
              className="px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-[200px]"
            >
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name} - {warehouse.location}
                </option>
              ))}
            </select>
          </div>

          {/* Right Section - Controls */}
          <div className="flex items-center space-x-4">
            {/* Real-time Toggle */}
            <div className="flex items-center space-x-2">
              <label htmlFor="realtime-toggle" className="text-sm font-medium text-text-primary">
                Real-time:
              </label>
              <button
                id="realtime-toggle"
                onClick={onRealTimeToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  isRealTimeEnabled ? 'bg-primary' : 'bg-secondary-300'
                }`}
                role="switch"
                aria-checked={isRealTimeEnabled}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    isRealTimeEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${isRealTimeEnabled ? 'bg-accent animate-pulse' : 'bg-secondary-400'}`} />
                <span className="text-xs text-text-secondary">
                  {isRealTimeEnabled ? 'Live' : 'Paused'}
                </span>
              </div>
            </div>

            {/* Alert Threshold Configurator */}
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              onClick={() => setShowThresholdModal(true)}
            >
              Thresholds
            </Button>

            {/* Refresh Button */}
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Threshold Configuration Modal */}
      {showThresholdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/50 backdrop-blur-sm">
          <div className="bg-surface rounded-lg shadow-modal w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">Alert Thresholds</h3>
              <button
                onClick={() => setShowThresholdModal(false)}
                className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Low Stock Alert (units)
                </label>
                <input
                  type="number"
                  defaultValue={alertThresholds.lowStock}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Processing Time Alert (hours)
                </label>
                <input
                  type="number"
                  defaultValue={alertThresholds.processingTime}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                  step="0.5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Fulfillment Rate Alert (%)
                </label>
                <input
                  type="number"
                  defaultValue={alertThresholds.fulfillmentRate}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-border">
              <Button
                variant="ghost"
                onClick={() => setShowThresholdModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleThresholdSave(alertThresholds)}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalControlsBar;