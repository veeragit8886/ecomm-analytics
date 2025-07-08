import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/ui/DashboardHeader';
import GlobalControlsBar from './components/GlobalControlsBar';
import MetricsStrip from './components/MetricsStrip';
import OrderVolumeChart from './components/OrderVolumeChart';
import LiveAlertFeed from './components/LiveAlertFeed';
import InventoryStatusTable from './components/InventoryStatusTable';

const OperationsCommandCenter = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [alertThresholds, setAlertThresholds] = useState({
    lowStock: 10,
    processingTime: 4,
    fulfillmentRate: 85
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for metrics
  const [metrics, setMetrics] = useState({
    pendingOrders: 47,
    pendingOrdersChange: -12,
    lowStockAlerts: 8,
    lowStockAlertsChange: 3,
    fulfillmentRate: 94.2,
    fulfillmentRateChange: 2.1,
    avgProcessingTime: 2.8,
    processingTimeChange: -0.5
  });

  // Mock data for alerts
  const [alerts, setAlerts] = useState([
    {
      id: 'alert-001',
      severity: 'critical',
      category: 'inventory',
      title: 'Critical Stock Level - iPhone 15 Pro',
      description: 'Only 3 units remaining. Reorder point reached.',
      timestamp: new Date(Date.now() - 300000),
      metadata: {
        'Product': 'iPhone 15 Pro 256GB',
        'Current Stock': '3 units',
        'Reorder Point': '10 units'
      },
      actions: [
        { id: 'reorder', label: 'Reorder Now', primary: true },
        { id: 'adjust', label: 'Adjust Threshold', primary: false }
      ]
    },
    {
      id: 'alert-002',
      severity: 'high',
      category: 'orders',
      title: 'Order Processing Delay',
      description: 'Order #ORD-2024-5678 has exceeded standard processing time.',
      timestamp: new Date(Date.now() - 600000),
      metadata: {
        'Order ID': 'ORD-2024-5678',
        'Processing Time': '6.2 hours',
        'Standard Time': '4 hours'
      },
      actions: [
        { id: 'escalate', label: 'Escalate', primary: true },
        { id: 'investigate', label: 'Investigate', primary: false }
      ]
    },
    {
      id: 'alert-003',
      severity: 'medium',
      category: 'fulfillment',
      title: 'Fulfillment Rate Below Target',
      description: 'West Coast Hub fulfillment rate dropped to 87% in the last hour.',
      timestamp: new Date(Date.now() - 900000),
      metadata: {
        'Hub': 'West Coast Hub',
        'Current Rate': '87%',
        'Target Rate': '95%'
      },
      actions: [
        { id: 'analyze', label: 'Analyze', primary: true },
        { id: 'notify', label: 'Notify Manager', primary: false }
      ]
    },
    {
      id: 'alert-004',
      severity: 'low',
      category: 'system',
      title: 'System Performance Notice',
      description: 'Database query response time slightly elevated.',
      timestamp: new Date(Date.now() - 1200000),
      metadata: {
        'Response Time': '1.2s',
        'Normal Range': '< 1s'
      },
      actions: [
        { id: 'monitor', label: 'Continue Monitoring', primary: true }
      ]
    }
  ]);

  // Mock data for inventory
  const [inventoryData, setInventoryData] = useState([
    {
      id: 'inv-001',
      productName: 'iPhone 15 Pro 256GB',
      sku: 'APL-IP15P-256',
      category: 'Electronics',
      stockLevel: 3,
      reorderPoint: 10,
      maxStock: 100,
      avgDailySales: 2.5
    },
    {
      id: 'inv-002',
      productName: 'Samsung Galaxy S24 Ultra',
      sku: 'SAM-GS24U-512',
      category: 'Electronics',
      stockLevel: 15,
      reorderPoint: 20,
      maxStock: 80,
      avgDailySales: 1.8
    },
    {
      id: 'inv-003',
      productName: 'MacBook Air M3',
      sku: 'APL-MBA-M3-13',
      category: 'Electronics',
      stockLevel: 7,
      reorderPoint: 12,
      maxStock: 50,
      avgDailySales: 1.2
    },
    {
      id: 'inv-004',
      productName: 'Sony WH-1000XM5',
      sku: 'SNY-WH1000XM5',
      category: 'Electronics',
      stockLevel: 25,
      reorderPoint: 15,
      maxStock: 60,
      avgDailySales: 3.0
    },
    {
      id: 'inv-005',
      productName: 'Dell XPS 13',
      sku: 'DEL-XPS13-I7',
      category: 'Electronics',
      stockLevel: 4,
      reorderPoint: 8,
      maxStock: 40,
      avgDailySales: 0.8
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    if (!isRealTimeEnabled) return;

    const interval = setInterval(() => {
      // Update metrics with small random changes
      setMetrics(prev => ({
        ...prev,
        pendingOrders: Math.max(0, prev.pendingOrders + Math.floor(Math.random() * 6) - 3),
        fulfillmentRate: Math.min(100, Math.max(80, prev.fulfillmentRate + (Math.random() - 0.5) * 2))
      }));

      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isRealTimeEnabled]);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleWarehouseChange = (warehouseId) => {
    setSelectedWarehouse(warehouseId);
    setIsLoading(true);
    
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleRealTimeToggle = () => {
    setIsRealTimeEnabled(!isRealTimeEnabled);
  };

  const handleThresholdChange = (newThresholds) => {
    setAlertThresholds(newThresholds);
  };

  const handleAlertAction = (alertId, action) => {
    console.log(`Alert ${alertId} action: ${action}`);
    
    if (action === 'dismiss') {
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    }
  };

  const handleReplenishmentAction = (items, type) => {
    console.log(`Replenishment action (${type}):`, items);
    
    // Simulate creating purchase orders
    const orderIds = items.map(() => `PO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
    
    // Add success alert
    const successAlert = {
      id: `alert-success-${Date.now()}`,
      severity: 'low',
      category: 'system',
      title: 'Purchase Orders Created',
      description: `${orderIds.length} purchase order(s) created successfully: ${orderIds.join(', ')}`,
      timestamp: new Date(),
      metadata: {
        'Orders Created': orderIds.length.toString(),
        'Type': type === 'bulk' ? 'Bulk Order' : 'Single Order'
      },
      actions: [
        { id: 'view', label: 'View Orders', primary: true }
      ]
    };
    
    setAlerts(prev => [successAlert, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="dashboard-content">
        {/* Global Controls */}
        <GlobalControlsBar
          selectedWarehouse={selectedWarehouse}
          onWarehouseChange={handleWarehouseChange}
          isRealTimeEnabled={isRealTimeEnabled}
          onRealTimeToggle={handleRealTimeToggle}
          alertThresholds={alertThresholds}
          onThresholdChange={handleThresholdChange}
        />

        {/* Metrics Strip */}
        <MetricsStrip metrics={metrics} isLoading={isLoading} />

        {/* Main Dashboard Grid */}
        <div className="p-4 grid grid-cols-1 xl:grid-cols-16 gap-6">
          {/* Main Chart Area - 10 columns */}
          <div className="xl:col-span-10">
            <OrderVolumeChart data={[]} isLoading={isLoading} />
          </div>

          {/* Right Panel - 6 columns */}
          <div className="xl:col-span-6">
            <LiveAlertFeed
              alerts={alerts}
              onAlertAction={handleAlertAction}
              isRealTime={isRealTimeEnabled}
            />
          </div>
        </div>

        {/* Inventory Status Table */}
        <div className="p-4">
          <InventoryStatusTable
            inventoryData={inventoryData}
            onReplenishmentAction={handleReplenishmentAction}
          />
        </div>

        {/* Connection Status & Last Updated */}
        <div className="px-4 pb-4">
          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isRealTimeEnabled ? 'bg-accent animate-pulse' : 'bg-secondary-400'}`} />
                  <span className="text-text-secondary">
                    Connection: {isRealTimeEnabled ? 'Active' : 'Paused'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-text-secondary">
                    Warehouse: {selectedWarehouse === 'all' ? 'All Warehouses' : `Warehouse ${selectedWarehouse}`}
                  </span>
                </div>
              </div>
              <div className="text-text-secondary">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsCommandCenter;