
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RootCauseAnalysis from "./pages/RootCauseAnalysis";
import PredictiveAnalytics from "./pages/PredictiveAnalytics";
import DealerPerformance from "./pages/DealerPerformance";
import CustomerImpact from "./pages/CustomerImpact";
import FinancialImpact from "./pages/FinancialImpact";
import DetailedClaimsReport from "./pages/DetailedClaimsReport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/root-cause" element={<RootCauseAnalysis />} />
          <Route path="/predictive" element={<PredictiveAnalytics />} />
          <Route path="/dealer-performance" element={<DealerPerformance />} />
          <Route path="/customer-impact" element={<CustomerImpact />} />
          <Route path="/financial-impact" element={<FinancialImpact />} />
          <Route path="/claims-report" element={<DetailedClaimsReport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
