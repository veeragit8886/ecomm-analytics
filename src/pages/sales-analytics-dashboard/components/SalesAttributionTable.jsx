import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SalesAttributionTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'revenue', direction: 'desc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const attributionData = [
    {
      id: 1,
      channel: 'Google Ads',
      campaign: 'Holiday Sale 2024',
      source: 'google',
      medium: 'cpc',
      sessions: 12450,
      users: 8920,
      newUsers: 3240,
      bounceRate: 32.4,
      avgSessionDuration: '2:34',
      pageviews: 45600,
      conversions: 892,
      conversionRate: 7.16,
      revenue: 156780,
      roas: 4.2,
      cpa: 45.60,
      sparkline: [120, 135, 142, 158, 167, 189, 201]
    },
    {
      id: 2,
      channel: 'Facebook Ads',
      campaign: 'Black Friday Promo',
      source: 'facebook',
      medium: 'social',
      sessions: 8960,
      users: 6780,
      newUsers: 4120,
      bounceRate: 28.7,
      avgSessionDuration: '3:12',
      pageviews: 32400,
      conversions: 567,
      conversionRate: 6.33,
      revenue: 98450,
      roas: 3.8,
      cpa: 52.30,
      sparkline: [89, 95, 102, 108, 115, 122, 128]
    },
    {
      id: 3,
      channel: 'Organic Search',
      campaign: 'SEO Traffic',
      source: 'google',
      medium: 'organic',
      sessions: 15670,
      users: 11230,
      newUsers: 2890,
      bounceRate: 24.1,
      avgSessionDuration: '4:18',
      pageviews: 67800,
      conversions: 1245,
      conversionRate: 7.94,
      revenue: 234560,
      roas: 0,
      cpa: 0,
      sparkline: [145, 152, 158, 167, 174, 182, 189]
    },
    {
      id: 4,
      channel: 'Email Marketing',
      campaign: 'Newsletter Campaign',
      source: 'newsletter',
      medium: 'email',
      sessions: 5420,
      users: 4890,
      newUsers: 890,
      bounceRate: 18.3,
      avgSessionDuration: '5:42',
      pageviews: 28900,
      conversions: 678,
      conversionRate: 12.51,
      revenue: 89670,
      roas: 8.9,
      cpa: 12.40,
      sparkline: [67, 72, 78, 84, 89, 95, 102]
    },
    {
      id: 5,
      channel: 'Direct Traffic',
      campaign: 'Direct Visits',
      source: 'direct',
      medium: 'none',
      sessions: 9870,
      users: 7650,
      newUsers: 1230,
      bounceRate: 21.6,
      avgSessionDuration: '3:56',
      pageviews: 42300,
      conversions: 789,
      conversionRate: 7.99,
      revenue: 145230,
      roas: 0,
      cpa: 0,
      sparkline: [98, 105, 112, 118, 125, 132, 139]
    },
    {
      id: 6,
      channel: 'Instagram Ads',
      campaign: 'Influencer Collab',
      source: 'instagram',
      medium: 'social',
      sessions: 3450,
      users: 2890,
      newUsers: 2340,
      bounceRate: 35.2,
      avgSessionDuration: '2:18',
      pageviews: 15600,
      conversions: 234,
      conversionRate: 6.78,
      revenue: 34560,
      roas: 2.9,
      cpa: 67.80,
      sparkline: [34, 38, 42, 45, 49, 52, 56]
    },
    {
      id: 7,
      channel: 'YouTube Ads',
      campaign: 'Product Demo Videos',
      source: 'youtube',
      medium: 'video',
      sessions: 2340,
      users: 1890,
      newUsers: 1560,
      bounceRate: 42.1,
      avgSessionDuration: '1:54',
      pageviews: 8900,
      conversions: 156,
      conversionRate: 6.67,
      revenue: 23450,
      roas: 3.1,
      cpa: 78.90,
      sparkline: [23, 26, 29, 32, 35, 38, 41]
    },
    {
      id: 8,
      channel: 'LinkedIn Ads',
      campaign: 'B2B Targeting',
      source: 'linkedin',
      medium: 'social',
      sessions: 1890,
      users: 1560,
      newUsers: 1230,
      bounceRate: 29.4,
      avgSessionDuration: '3:45',
      pageviews: 7800,
      conversions: 189,
      conversionRate: 10.00,
      revenue: 45670,
      roas: 4.8,
      cpa: 89.20,
      sparkline: [18, 21, 24, 27, 30, 33, 36]
    }
  ];

  const columns = [
    { key: 'channel', label: 'Channel', sortable: true },
    { key: 'campaign', label: 'Campaign', sortable: true },
    { key: 'sessions', label: 'Sessions', sortable: true },
    { key: 'users', label: 'Users', sortable: true },
    { key: 'conversions', label: 'Conversions', sortable: true },
    { key: 'conversionRate', label: 'Conv. Rate', sortable: true },
    { key: 'revenue', label: 'Revenue', sortable: true },
    { key: 'roas', label: 'ROAS', sortable: true },
    { key: 'cpa', label: 'CPA', sortable: true },
    { key: 'sparkline', label: 'Trend', sortable: false }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleRowSelect = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === sortedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sortedData.map(row => row.id));
    }
  };

  const sortedData = [...attributionData].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortConfig.direction === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    }
    return 0;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const Sparkline = ({ data }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 80;
      const y = 20 - ((value - min) / range) * 20;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="80" height="20" className="inline-block">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary"
        />
      </svg>
    );
  };

  const getChannelIcon = (channel) => {
    const channelIcons = {
      'Google Ads': 'Search',
      'Facebook Ads': 'Facebook',
      'Organic Search': 'Globe',
      'Email Marketing': 'Mail',
      'Direct Traffic': 'MousePointer',
      'Instagram Ads': 'Instagram',
      'YouTube Ads': 'Play',
      'LinkedIn Ads': 'Linkedin'
    };
    return channelIcons[channel] || 'BarChart3';
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Table" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-text-primary">Sales Attribution Analysis</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            iconName="Filter"
            iconSize={16}
            className="text-text-secondary hover:text-primary"
          >
            Filter
          </Button>
          <Button
            variant="ghost"
            iconName="Download"
            iconSize={16}
            className="text-text-secondary hover:text-primary"
          >
            Export
          </Button>
          <Button
            variant="primary"
            iconName="Plus"
            iconSize={16}
          >
            Add Campaign
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-border">
            <tr>
              <th className="w-12 p-3">
                <input
                  type="checkbox"
                  checked={selectedRows.length === sortedData.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`p-3 text-left text-sm font-medium text-text-primary ${
                    column.sortable ? 'cursor-pointer hover:bg-secondary-100' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <Icon
                        name={
                          sortConfig.key === column.key
                            ? sortConfig.direction === 'asc' ?'ChevronUp' :'ChevronDown' :'ChevronsUpDown'
                        }
                        size={14}
                        className="text-text-muted"
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-border hover:bg-secondary-50 transition-colors ${
                  selectedRows.includes(row.id) ? 'bg-primary-50' : ''
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <Icon name={getChannelIcon(row.channel)} size={16} className="text-primary" />
                    <span className="font-medium text-text-primary">{row.channel}</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-text-secondary truncate max-w-[200px]">
                    {row.campaign}
                  </div>
                </td>
                <td className="p-3 text-sm text-text-primary">{row.sessions.toLocaleString()}</td>
                <td className="p-3 text-sm text-text-primary">{row.users.toLocaleString()}</td>
                <td className="p-3 text-sm text-text-primary">{row.conversions.toLocaleString()}</td>
                <td className="p-3">
                  <span className="text-sm font-medium text-accent">{row.conversionRate}%</span>
                </td>
                <td className="p-3">
                  <span className="text-sm font-medium text-text-primary">
                    ${row.revenue.toLocaleString()}
                  </span>
                </td>
                <td className="p-3">
                  {row.roas > 0 ? (
                    <span className={`text-sm font-medium ${row.roas >= 4 ? 'text-success' : row.roas >= 2 ? 'text-warning' : 'text-error'}`}>
                      {row.roas}x
                    </span>
                  ) : (
                    <span className="text-sm text-text-muted">-</span>
                  )}
                </td>
                <td className="p-3">
                  {row.cpa > 0 ? (
                    <span className="text-sm text-text-primary">${row.cpa}</span>
                  ) : (
                    <span className="text-sm text-text-muted">-</span>
                  )}
                </td>
                <td className="p-3">
                  <Sparkline data={row.sparkline} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Show</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-2 py-1 text-sm border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-text-secondary">
            of {sortedData.length} entries
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            iconName="ChevronLeft"
            iconSize={16}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          />
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === pageNum
                      ? 'bg-primary text-white' :'text-text-secondary hover:bg-secondary-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <Button
            variant="ghost"
            iconName="ChevronRight"
            iconSize={16}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          />
        </div>
      </div>

      {/* Summary */}
      {selectedRows.length > 0 && (
        <div className="p-4 bg-primary-50 border-t border-primary-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary font-medium">
              {selectedRows.length} row(s) selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">Compare</Button>
              <Button variant="ghost" size="sm">Export Selected</Button>
              <Button variant="ghost" size="sm">Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesAttributionTable;