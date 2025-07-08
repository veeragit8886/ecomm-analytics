import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'revenue', direction: 'desc' });
  const [filterText, setFilterText] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const productData = [
    {
      id: 'PRD001',
      name: 'iPhone 15 Pro Max',
      sku: 'APL-IP15PM-256',
      category: 'Electronics',
      price: 1199.99,
      cost: 850.00,
      revenue: 287998.00,
      unitsSold: 240,
      stock: 45,
      margin: 29.2,
      velocity: 9.2,
      reorderPoint: 20,
      supplier: 'Apple Inc.',
      leadTime: 7,
      status: 'active',
      trend: 'up'
    },
    {
      id: 'PRD002',
      name: 'Samsung Galaxy S24',
      sku: 'SAM-GS24-128',
      category: 'Electronics',
      price: 899.99,
      cost: 620.00,
      revenue: 215998.00,
      unitsSold: 240,
      stock: 34,
      margin: 31.1,
      velocity: 8.7,
      reorderPoint: 25,
      supplier: 'Samsung Electronics',
      leadTime: 5,
      status: 'active',
      trend: 'up'
    },
    {
      id: 'PRD003',
      name: 'Nike Air Max 270',
      sku: 'NIK-AM270-BLK',
      category: 'Footwear',
      price: 149.99,
      cost: 75.00,
      revenue: 134991.00,
      unitsSold: 900,
      stock: 67,
      margin: 50.0,
      velocity: 9.5,
      reorderPoint: 50,
      supplier: 'Nike Inc.',
      leadTime: 14,
      status: 'active',
      trend: 'up'
    },
    {
      id: 'PRD004',
      name: 'MacBook Pro M3',
      sku: 'APL-MBP-M3-512',
      category: 'Electronics',
      price: 1999.99,
      cost: 1350.00,
      revenue: 119999.40,
      unitsSold: 60,
      stock: 23,
      margin: 32.5,
      velocity: 7.8,
      reorderPoint: 15,
      supplier: 'Apple Inc.',
      leadTime: 10,
      status: 'active',
      trend: 'stable'
    },
    {
      id: 'PRD005',
      name: 'Wireless Earbuds Pro',
      sku: 'GEN-WEP-001',
      category: 'Electronics',
      price: 79.99,
      cost: 35.00,
      revenue: 95988.00,
      unitsSold: 1200,
      stock: 156,
      margin: 56.3,
      velocity: 8.9,
      reorderPoint: 100,
      supplier: 'Generic Electronics',
      leadTime: 21,
      status: 'active',
      trend: 'up'
    },
    {
      id: 'PRD006',
      name: 'Premium Leather Jacket',
      sku: 'FAS-PLJ-BRN',
      category: 'Clothing',
      price: 299.99,
      cost: 120.00,
      revenue: 35999.00,
      unitsSold: 120,
      stock: 12,
      margin: 60.0,
      velocity: 6.2,
      reorderPoint: 10,
      supplier: 'Fashion House Ltd.',
      leadTime: 30,
      status: 'low_stock',
      trend: 'down'
    },
    {
      id: 'PRD007',
      name: 'Smart Home Hub',
      sku: 'SMT-HUB-001',
      category: 'Electronics',
      price: 199.99,
      cost: 85.00,
      revenue: 31998.40,
      unitsSold: 160,
      stock: 8,
      margin: 57.5,
      velocity: 7.1,
      reorderPoint: 20,
      supplier: 'Smart Tech Co.',
      leadTime: 14,
      status: 'critical_stock',
      trend: 'stable'
    },
    {
      id: 'PRD008',
      name: 'Yoga Mat Premium',
      sku: 'SPT-YMP-001',
      category: 'Sports',
      price: 49.99,
      cost: 18.00,
      revenue: 29994.00,
      unitsSold: 600,
      stock: 89,
      margin: 64.0,
      velocity: 8.3,
      reorderPoint: 40,
      supplier: 'Sports Equipment Inc.',
      leadTime: 7,
      status: 'active',
      trend: 'up'
    }
  ];

  const filteredData = useMemo(() => {
    return productData.filter(product =>
      product.name.toLowerCase().includes(filterText.toLowerCase()) ||
      product.sku.toLowerCase().includes(filterText.toLowerCase()) ||
      product.category.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === paginatedData.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedData.map(product => product.id));
    }
  };

  const getStockStatus = (stock, reorderPoint) => {
    if (stock <= reorderPoint * 0.5) return 'critical';
    if (stock <= reorderPoint) return 'low';
    return 'normal';
  };

  const getStockStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-error bg-error-50';
      case 'low': return 'text-warning bg-warning-50';
      default: return 'text-success bg-success-50';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-text-muted';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const SortableHeader = ({ label, sortKey, className = '' }) => (
    <th
      className={`px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-secondary-50 ${className}`}
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <div className="flex flex-col">
          <Icon
            name="ChevronUp"
            size={12}
            color={sortConfig.key === sortKey && sortConfig.direction === 'asc' ? 'var(--color-primary)' : 'var(--color-text-muted)'}
          />
          <Icon
            name="ChevronDown"
            size={12}
            color={sortConfig.key === sortKey && sortConfig.direction === 'desc' ? 'var(--color-primary)' : 'var(--color-text-muted)'}
          />
        </div>
      </div>
    </th>
  );

  return (
    <div className="bg-surface rounded-xl border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-1">
              Product Performance Table
            </h2>
            <p className="text-sm text-text-secondary">
              Detailed metrics and inventory management for all products
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="Search" size={16} color="var(--color-text-muted)" />
              </div>
              <Input
                type="search"
                placeholder="Search products..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            {selectedProducts.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="Download">
                  Export ({selectedProducts.length})
                </Button>
                <Button variant="primary" size="sm" iconName="ShoppingCart">
                  Reorder
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-secondary-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              <SortableHeader label="Product" sortKey="name" />
              <SortableHeader label="SKU" sortKey="sku" />
              <SortableHeader label="Category" sortKey="category" />
              <SortableHeader label="Price" sortKey="price" />
              <SortableHeader label="Revenue" sortKey="revenue" />
              <SortableHeader label="Units Sold" sortKey="unitsSold" />
              <SortableHeader label="Stock" sortKey="stock" />
              <SortableHeader label="Margin" sortKey="margin" />
              <SortableHeader label="Velocity" sortKey="velocity" />
              <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {paginatedData.map((product) => {
              const stockStatus = getStockStatus(product.stock, product.reorderPoint);
              
              return (
                <tr
                  key={product.id}
                  className={`hover:bg-secondary-50 transition-colors duration-150 ${
                    selectedProducts.includes(product.id) ? 'bg-primary-50' : ''
                  }`}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                        <Icon name="Package" size={16} color="var(--color-text-muted)" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-text-primary">
                          {product.name}
                        </div>
                        <div className="text-xs text-text-muted">
                          {product.supplier}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4 text-sm text-text-primary font-mono">
                    {product.sku}
                  </td>
                  
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-text-secondary">
                      {product.category}
                    </span>
                  </td>
                  
                  <td className="px-4 py-4 text-sm font-medium text-text-primary">
                    {formatCurrency(product.price)}
                  </td>
                  
                  <td className="px-4 py-4 text-sm font-medium text-text-primary">
                    {formatCurrency(product.revenue)}
                  </td>
                  
                  <td className="px-4 py-4 text-sm text-text-primary">
                    {product.unitsSold.toLocaleString()}
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStockStatusColor(stockStatus)}`}>
                        {product.stock} units
                      </span>
                      {stockStatus !== 'normal' && (
                        <Icon 
                          name="AlertTriangle" 
                          size={14} 
                          color={stockStatus === 'critical' ? 'var(--color-error)' : 'var(--color-warning)'} 
                        />
                      )}
                    </div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-text-primary">
                        {product.margin.toFixed(1)}%
                      </span>
                      <Icon
                        name={getTrendIcon(product.trend)}
                        size={14}
                        className={getTrendColor(product.trend)}
                      />
                    </div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-12 bg-secondary-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(product.velocity / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-muted ml-2">
                        {product.velocity.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => {}}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit"
                        onClick={() => {}}
                      />
                      {stockStatus !== 'normal' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="ShoppingCart"
                          onClick={() => {}}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-muted">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} products
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                      currentPage === pageNum
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-muted hover:bg-secondary-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;