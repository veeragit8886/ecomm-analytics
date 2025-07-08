import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InventoryStatusTable = ({ inventoryData, onReplenishmentAction }) => {
  const [sortField, setSortField] = useState('stockLevel');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showReplenishmentModal, setShowReplenishmentModal] = useState(false);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...inventoryData].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === inventoryData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(inventoryData.map(item => item.id));
    }
  };

  const getStockStatus = (current, reorderPoint, maxStock) => {
    const percentage = (current / maxStock) * 100;
    if (current <= reorderPoint) return { status: 'critical', color: 'text-error', bg: 'bg-error-50' };
    if (percentage <= 25) return { status: 'low', color: 'text-warning', bg: 'bg-warning-50' };
    if (percentage <= 50) return { status: 'medium', color: 'text-primary', bg: 'bg-primary-50' };
    return { status: 'good', color: 'text-success', bg: 'bg-success-50' };
  };

  const getReplenishmentSuggestion = (item) => {
    const daysOfStock = Math.floor(item.stockLevel / (item.avgDailySales || 1));
    const suggestedQuantity = Math.max(item.reorderPoint * 2, item.avgDailySales * 30);
    
    return {
      urgency: daysOfStock <= 7 ? 'urgent' : daysOfStock <= 14 ? 'soon' : 'normal',
      daysRemaining: daysOfStock,
      suggestedQuantity: Math.round(suggestedQuantity)
    };
  };

  const handleBulkReplenishment = () => {
    const selectedItemsData = inventoryData.filter(item => selectedItems.includes(item.id));
    onReplenishmentAction(selectedItemsData, 'bulk');
    setShowReplenishmentModal(false);
    setSelectedItems([]);
  };

  return (
    <>
      <div className="bg-surface border border-border rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-50 rounded-lg">
              <Icon name="Package" size={20} className="text-warning" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Inventory Status</h3>
              <p className="text-sm text-text-secondary">
                {inventoryData.filter(item => item.stockLevel <= item.reorderPoint).length} items need replenishment
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {selectedItems.length > 0 && (
              <Button
                variant="primary"
                size="sm"
                iconName="ShoppingCart"
                onClick={() => setShowReplenishmentModal(true)}
              >
                Replenish Selected ({selectedItems.length})
              </Button>
            )}
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === inventoryData.length}
                    onChange={handleSelectAll}
                    className="rounded border-border focus:ring-primary"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                  <button
                    onClick={() => handleSort('productName')}
                    className="flex items-center space-x-1 hover:text-text-primary"
                  >
                    <span>Product</span>
                    <Icon name="ArrowUpDown" size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                  <button
                    onClick={() => handleSort('category')}
                    className="flex items-center space-x-1 hover:text-text-primary"
                  >
                    <span>Category</span>
                    <Icon name="ArrowUpDown" size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                  <button
                    onClick={() => handleSort('stockLevel')}
                    className="flex items-center space-x-1 hover:text-text-primary"
                  >
                    <span>Stock Level</span>
                    <Icon name="ArrowUpDown" size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                  Days Remaining
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                  Suggested Order
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedData.map((item) => {
                const stockStatus = getStockStatus(item.stockLevel, item.reorderPoint, item.maxStock);
                const replenishment = getReplenishmentSuggestion(item);
                
                return (
                  <tr key={item.id} className="hover:bg-surface-secondary transition-colors">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="rounded border-border focus:ring-primary"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                          <Icon name="Package" size={16} className="text-text-secondary" />
                        </div>
                        <div>
                          <div className="font-medium text-text-primary">{item.productName}</div>
                          <div className="text-sm text-text-secondary">SKU: {item.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs bg-secondary-100 text-text-secondary rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-text-primary">{item.stockLevel}</span>
                        <div className="w-16 bg-secondary-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${stockStatus.color.replace('text-', 'bg-')}`}
                            style={{ width: `${Math.min((item.stockLevel / item.maxStock) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${stockStatus.bg} ${stockStatus.color} font-medium`}>
                        {stockStatus.status.charAt(0).toUpperCase() + stockStatus.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <Icon 
                          name="Clock" 
                          size={14} 
                          className={replenishment.urgency === 'urgent' ? 'text-error' : 'text-text-secondary'} 
                        />
                        <span className={`text-sm ${replenishment.urgency === 'urgent' ? 'text-error font-medium' : 'text-text-secondary'}`}>
                          {replenishment.daysRemaining} days
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-text-primary">
                        {replenishment.suggestedQuantity} units
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="primary"
                          size="xs"
                          iconName="ShoppingCart"
                          onClick={() => onReplenishmentAction([item], 'single')}
                        >
                          Order
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="Eye"
                          onClick={() => console.log('View details:', item.id)}
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Replenishment Modal */}
      {showReplenishmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/50 backdrop-blur-sm">
          <div className="bg-surface rounded-lg shadow-modal w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">Bulk Replenishment Order</h3>
              <button
                onClick={() => setShowReplenishmentModal(false)}
                className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {inventoryData.filter(item => selectedItems.includes(item.id)).map((item) => {
                  const suggestion = getReplenishmentSuggestion(item);
                  return (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                          <Icon name="Package" size={16} className="text-text-secondary" />
                        </div>
                        <div>
                          <div className="font-medium text-text-primary">{item.productName}</div>
                          <div className="text-sm text-text-secondary">Current: {item.stockLevel} units</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-text-primary">{suggestion.suggestedQuantity} units</div>
                        <div className="text-sm text-text-secondary">Suggested order</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-border">
              <Button
                variant="ghost"
                onClick={() => setShowReplenishmentModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleBulkReplenishment}
              >
                Create Purchase Orders
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryStatusTable;