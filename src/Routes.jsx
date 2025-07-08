import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";

// Lazy load pages
const ExecutiveOverviewDashboard = lazy(() => import("pages/executive-overview-dashboard"));
const OperationsCommandCenter = lazy(() => import("pages/operations-command-center"));
const ProductPerformanceDashboard = lazy(() => import("pages/product-performance-dashboard"));
const SalesAnalyticsDashboard = lazy(() => import("pages/sales-analytics-dashboard"));

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <RouterRoutes>
            <Route path="/" element={<ExecutiveOverviewDashboard />} />
            <Route path="/executive-overview-dashboard" element={<ExecutiveOverviewDashboard />} />
            <Route path="/operations-command-center" element={<OperationsCommandCenter />} />
            <Route path="/product-performance-dashboard" element={<ProductPerformanceDashboard />} />
            <Route path="/sales-analytics-dashboard" element={<SalesAnalyticsDashboard />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
