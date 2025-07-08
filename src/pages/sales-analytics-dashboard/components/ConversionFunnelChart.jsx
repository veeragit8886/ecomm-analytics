import React, { useState } from 'react';
import { FunnelChart, Funnel, Cell, ResponsiveContainer, Tooltip, LabelList } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversionFunnelChart = ({ onDrillDown }) => {
  const [selectedStage, setSelectedStage] = useState(null);

  const funnelData = [
    {
      name: 'Website Visitors',
      value: 125400,
      fill: '#3B82F6',
      dropOffRate: 0,
      conversionRate: 100,
      details: {
        organic: 52800,
        paid: 35100,
        social: 22600,
        direct: 14900
      }
    },
    {
      name: 'Product Views',
      value: 89200,
      fill: '#10B981',
      dropOffRate: 28.9,
      conversionRate: 71.1,
      details: {
        categoryPages: 34500,
        productPages: 54700,
        searchResults: 28900
      }
    },
    {
      name: 'Add to Cart',
      value: 34600,
      fill: '#F59E0B',
      dropOffRate: 61.2,
      conversionRate: 38.8,
      details: {
        singleItems: 21200,
        multipleItems: 13400,
        wishlistItems: 8900
      }
    },
    {
      name: 'Checkout Started',
      value: 18900,
      fill: '#EF4444',
      dropOffRate: 45.4,
      conversionRate: 54.6,
      details: {
        guestCheckout: 11300,
        registeredUsers: 7600,
        mobileCheckout: 5400
      }
    },
    {
      name: 'Payment Completed',
      value: 12400,
      fill: '#8B5CF6',
      dropOffRate: 34.4,
      conversionRate: 65.6,
      details: {
        creditCard: 8900,
        paypal: 2100,
        bankTransfer: 1400
      }
    },
    {
      name: 'Order Confirmed',
      value: 11800,
      fill: '#059669',
      dropOffRate: 4.8,
      conversionRate: 95.2,
      details: {
        emailConfirmed: 11800,
        smsConfirmed: 9200,
        appNotification: 7800
      }
    }
  ];

  const handleStageClick = (data, index) => {
    setSelectedStage(selectedStage === index ? null : index);
    if (onDrillDown) {
      onDrillDown(data, index);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg shadow-lg p-4 min-w-[200px]">
          <h4 className="font-semibold text-text-primary mb-2">{data.name}</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Users:</span>
              <span className="font-medium text-text-primary">{data.value.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Conversion Rate:</span>
              <span className="font-medium text-accent">{data.conversionRate}%</span>
            </div>
            {data.dropOffRate > 0 && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Drop-off Rate:</span>
                <span className="font-medium text-error">{data.dropOffRate}%</span>
              </div>
            )}
          </div>
          <div className="mt-2 pt-2 border-t border-border text-xs text-text-muted">
            Click to view detailed breakdown
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = (props) => {
    const { x, y, width, height, value, name } = props;
    return (
      <g>
        <text
          x={x + width / 2}
          y={y + height / 2 - 8}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white text-sm font-semibold"
        >
          {name}
        </text>
        <text
          x={x + width / 2}
          y={y + height / 2 + 8}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white text-xs"
        >
          {value.toLocaleString()}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingDown" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-text-primary">Conversion Funnel</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            iconName="Download"
            iconSize={16}
            className="text-text-secondary hover:text-primary"
          >
            Export
          </Button>
          <Button
            variant="ghost"
            iconName="RefreshCw"
            iconSize={16}
            className="text-text-secondary hover:text-primary"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip content={<CustomTooltip />} />
              <Funnel
                dataKey="value"
                data={funnelData}
                isAnimationActive={true}
                animationDuration={800}
                onClick={handleStageClick}
              >
                <LabelList content={<CustomLabel />} />
                {funnelData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    stroke={selectedStage === index ? '#1E40AF' : 'transparent'}
                    strokeWidth={selectedStage === index ? 3 : 0}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>

        {/* Stage Details */}
        {selectedStage !== null && (
          <div className="mt-4 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
            <h4 className="font-semibold text-text-primary mb-3">
              {funnelData[selectedStage].name} - Detailed Breakdown
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(funnelData[selectedStage].details).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <span className="text-sm text-text-secondary capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="font-semibold text-text-primary">
                    {value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-primary-50 rounded-lg">
            <div className="text-2xl font-bold text-primary">9.4%</div>
            <div className="text-sm text-text-secondary">Overall Conversion</div>
          </div>
          <div className="text-center p-3 bg-accent-50 rounded-lg">
            <div className="text-2xl font-bold text-accent">$2.1M</div>
            <div className="text-sm text-text-secondary">Revenue Generated</div>
          </div>
          <div className="text-center p-3 bg-warning-50 rounded-lg">
            <div className="text-2xl font-bold text-warning">34.6K</div>
            <div className="text-sm text-text-secondary">Cart Abandonment</div>
          </div>
          <div className="text-center p-3 bg-success-50 rounded-lg">
            <div className="text-2xl font-bold text-success">$178</div>
            <div className="text-sm text-text-secondary">Avg Order Value</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionFunnelChart;