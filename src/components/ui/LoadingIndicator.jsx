import React from 'react';
import Icon from '../AppIcon';

const LoadingIndicator = ({ 
  type = 'spinner', 
  size = 'md', 
  message = 'Loading...', 
  showMessage = true,
  className = '',
  color = 'primary'
}) => {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const colorClasses = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    accent: 'border-accent',
    muted: 'border-text-muted'
  };

  const SpinnerLoader = () => (
    <div 
      className={`${sizeClasses[size]} border-2 border-text-muted border-t-${color} rounded-full animate-spin`}
      role="status"
      aria-label="Loading"
    />
  );

  const DotsLoader = () => (
    <div className="flex items-center space-x-1" role="status" aria-label="Loading">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`${sizeClasses[size]} bg-${color} rounded-full animate-pulse`}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );

  const PulseLoader = () => (
    <div 
      className={`${sizeClasses[size]} bg-${color} rounded-full animate-pulse-soft`}
      role="status"
      aria-label="Loading"
    />
  );

  const BarLoader = () => (
    <div className="w-full bg-secondary-200 rounded-full h-2 overflow-hidden" role="status" aria-label="Loading">
      <div className={`h-full bg-${color} rounded-full animate-pulse`} style={{ width: '60%' }} />
    </div>
  );

  const IconLoader = () => (
    <Icon 
      name="Loader2" 
      size={size === 'xs' ? 12 : size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 32}
      className="animate-spin"
      color={`var(--color-${color})`}
    />
  );

  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return <DotsLoader />;
      case 'pulse':
        return <PulseLoader />;
      case 'bar':
        return <BarLoader />;
      case 'icon':
        return <IconLoader />;
      default:
        return <SpinnerLoader />;
    }
  };

  const LoadingComponent = () => (
    <div className={`loading-indicator ${className}`}>
      {renderLoader()}
      {showMessage && message && (
        <span className={`${textSizeClasses[size]} text-text-secondary font-medium`}>
          {message}
        </span>
      )}
    </div>
  );

  // For bar type, render without flex wrapper
  if (type === 'bar') {
    return (
      <div className={`space-y-2 ${className}`}>
        {renderLoader()}
        {showMessage && message && (
          <div className={`${textSizeClasses[size]} text-text-secondary font-medium text-center`}>
            {message}
          </div>
        )}
      </div>
    );
  }

  return <LoadingComponent />;
};

// Specialized loading components for common use cases
export const DashboardLoader = ({ message = 'Loading dashboard...' }) => (
  <div className="flex items-center justify-center min-h-[200px]">
    <LoadingIndicator 
      type="spinner" 
      size="lg" 
      message={message}
      className="flex-col space-y-3"
    />
  </div>
);

export const DataLoader = ({ message = 'Fetching data...' }) => (
  <LoadingIndicator 
    type="dots" 
    size="sm" 
    message={message}
    color="accent"
  />
);

export const InlineLoader = ({ message = 'Processing...' }) => (
  <LoadingIndicator 
    type="icon" 
    size="sm" 
    message={message}
    showMessage={false}
  />
);

export const ProgressLoader = ({ message = 'Loading...', progress }) => (
  <div className="space-y-2">
    <LoadingIndicator 
      type="bar" 
      message={message}
    />
    {progress && (
      <div className="text-xs text-text-muted text-center">
        {progress}%
      </div>
    )}
  </div>
);

export default LoadingIndicator;