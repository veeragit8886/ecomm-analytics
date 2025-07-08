import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductPerformanceMatrix = () => {
  const [selectedQuadrant, setSelectedQuadrant] = useState('all');
  const [showLabels, setShowLabels] = useState(true);

  const productData = [
    // Stars (High Sales, High Profit)
    { name: 'iPhone 15 Pro Max', sales: 8500, profit: 28.5, category: 'Electronics', stock: 45, quadrant: 'star' },
    { name: 'MacBook Pro M3', sales: 6200, profit: 32.1, category: 'Electronics', stock: 23, quadrant: 'star' },
    { name: 'Nike Air Max 270', sales: 7800, profit: 35.2, category: 'Footwear', stock: 67, quadrant: 'star' },
    { name: 'Samsung Galaxy S24', sales: 7200, profit: 29.8, category: 'Electronics', stock: 34, quadrant: 'star' },
    
    // Cash Cows (High Sales, Low Profit)
    { name: 'Basic Cotton T-Shirt', sales: 9200, profit: 12.3, category: 'Clothing', stock: 234, quadrant: 'cash_cow' },
    { name: 'USB-C Cable', sales: 8900, profit: 8.7, category: 'Accessories', stock: 456, quadrant: 'cash_cow' },
    { name: 'Phone Case Generic', sales: 7600, profit: 15.2, category: 'Accessories', stock: 189, quadrant: 'cash_cow' },
    { name: 'Wireless Earbuds Basic', sales: 6800, profit: 18.4, category: 'Electronics', stock: 78, quadrant: 'cash_cow' },
    
    // Question Marks (Low Sales, High Profit)
    { name: 'Premium Leather Jacket', sales: 1200, profit: 45.6, category: 'Clothing', stock: 12, quadrant: 'question' },
    { name: 'Smart Home Hub Pro', sales: 2100, profit: 38.9, category: 'Electronics', stock: 8, quadrant: 'question' },
    { name: 'Artisan Coffee Beans', sales: 1800, profit: 42.1, category: 'Food', stock: 34, quadrant: 'question' },
    { name: 'Designer Sunglasses', sales: 1500, profit: 48.3, category: 'Accessories', stock: 15, quadrant: 'question' },
    
    // Dogs (Low Sales, Low Profit)
    { name: 'Old Model Headphones', sales: 800, profit: 8.2, category: 'Electronics', stock: 67, quadrant: 'dog' },
    { name: 'Seasonal Decoration', sales: 600, profit: 12.1, category: 'Home', stock: 89, quadrant: 'dog' },
    { name: 'Outdated Phone Model', sales: 450, profit: 5.8, category: 'Electronics', stock: 23, quadrant: 'dog' },
    { name: 'Last Season Shoes', sales: 720, profit: 9.4, category: 'Footwear', stock: 45, quadrant: 'dog' }
  ];

  const quadrantColors = {
    star: '#10B981',      // Green
    cash_cow: '#3B82F6',  // Blue
    question: '#F59E0B',  // Orange
    dog: '#EF4444'        // Red
  };

  const quadrantLabels = {
    star: 'Stars',
    cash_cow: 'Cash Cows',
    question: 'Question Marks',
    dog: 'Dogs'
  };

  const filteredData = selectedQuadrant === 'all' 
    ? productData 
    : productData.filter(item => item.quadrant === selectedQuadrant);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-floating">
          <h4 className="font-semibold text-text-primary mb-2">{data.name}</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Sales Volume:</span>
              <span className="font-medium">{data.sales.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Profit Margin:</span>
              <span className="font-medium">{data.profit}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Category:</span>
              <span className="font-medium">{data.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Stock Level:</span>
              <span className={`font-medium ${data.stock < 20 ? 'text-error' : data.stock < 50 ? 'text-warning' : 'text-success'}`}>
                {data.stock} units
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getQuadrantStats = (quadrant) => {
    const quadrantData = productData.filter(item => item.quadrant === quadrant);
    return {
      count: quadrantData.length,
      avgSales: Math.round(quadrantData.reduce((sum, item) => sum + item.sales, 0) / quadrantData.length),
      avgProfit: (quadrantData.reduce((sum, item) => sum + item.profit, 0) / quadrantData.length).toFixed(1)
    };
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-1">
            Product Performance Matrix
          </h2>
          <p className="text-sm text-text-secondary">
            Sales volume vs. profitability analysis with quadrant classification
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button
            variant={showLabels ? 'primary' : 'outline'}
            size="sm"
            iconName="Tag"
            onClick={() => setShowLabels(!showLabels)}
          >
            Labels
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={() => {}}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Quadrant Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedQuadrant('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedQuadrant === 'all' ?'bg-secondary-800 text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
          }`}
        >
          All Products ({productData.length})
        </button>
        {Object.entries(quadrantLabels).map(([key, label]) => {
          const stats = getQuadrantStats(key);
          return (
            <button
              key={key}
              onClick={() => setSelectedQuadrant(key)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                selectedQuadrant === key
                  ? 'text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
              }`}
              style={{
                backgroundColor: selectedQuadrant === key ? quadrantColors[key] : undefined
              }}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: quadrantColors[key] }}
              />
              <span>{label} ({stats.count})</span>
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="h-96 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              type="number" 
              dataKey="sales" 
              name="Sales Volume"
              domain={[0, 10000]}
              tickFormatter={(value) => `${(value/1000).toFixed(0)}K`}
              stroke="var(--color-text-muted)"
            />
            <YAxis 
              type="number" 
              dataKey="profit" 
              name="Profit Margin"
              domain={[0, 50]}
              tickFormatter={(value) => `${value}%`}
              stroke="var(--color-text-muted)"
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Quadrant Lines */}
            <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="var(--color-border)" strokeWidth={2} strokeDasharray="5,5" />
            <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="var(--color-border)" strokeWidth={2} strokeDasharray="5,5" />
            
            <Scatter data={filteredData}>
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={quadrantColors[entry.quadrant]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Quadrant Labels */}
      {showLabels && (
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="text-center p-2 bg-success-50 rounded-lg">
            <div className="font-semibold text-success-700">Stars</div>
            <div className="text-success-600">High Sales, High Profit</div>
          </div>
          <div className="text-center p-2 bg-primary-50 rounded-lg">
            <div className="font-semibold text-primary-700">Cash Cows</div>
            <div className="text-primary-600">High Sales, Low Profit</div>
          </div>
          <div className="text-center p-2 bg-warning-50 rounded-lg">
            <div className="font-semibold text-warning-700">Question Marks</div>
            <div className="text-warning-600">Low Sales, High Profit</div>
          </div>
          <div className="text-center p-2 bg-error-50 rounded-lg">
            <div className="font-semibold text-error-700">Dogs</div>
            <div className="text-error-600">Low Sales, Low Profit</div>
          </div>
        </div>
      )}

      {/* Action Recommendations */}
      <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="bg-primary p-2 rounded-lg">
            <Icon name="Target" size={16} color="white" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-text-primary mb-1">
              Strategic Recommendations
            </h4>
            <div className="text-sm text-text-secondary space-y-1">
              <div>• <strong>Stars:</strong> Invest in marketing and inventory to maximize growth potential</div>
              <div>• <strong>Cash Cows:</strong> Focus on cost optimization to improve margins</div>
              <div>• <strong>Question Marks:</strong> Increase marketing spend or consider repositioning</div>
              <div>• <strong>Dogs:</strong> Evaluate for discontinuation or clearance pricing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPerformanceMatrix;