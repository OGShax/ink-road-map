import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ProviderProfile } from "./components/ProviderProfile";
import { StaffProfile } from "./components/StaffProfile";
import { StudyCenter } from "./components/StudyCenter";
import { MonetizationDashboard } from "./components/MonetizationDashboard";
import Support from "./pages/Support";
import HowItWorks from "./pages/HowItWorks";
import SafetyGuarantee from "./pages/SafetyGuarantee";
import ProviderBenefits from "./pages/ProviderBenefits";
import GetVerified from "./pages/GetVerified";
import ResourcesTools from "./pages/ResourcesTools";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/job/:jobId" element={<Index />} />
          <Route path="/provider/:providerId" element={<ProviderProfile />} />
          <Route path="/staff/:staffId" element={<StaffProfile />} />
          <Route path="/study-center" element={<StudyCenter />} />
          <Route path="/pro-subscription" element={<MonetizationDashboard />} />
          <Route path="/become-provider" element={<MonetizationDashboard />} />
          <Route path="/support" element={<Support />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/safety-guarantee" element={<SafetyGuarantee />} />
          <Route path="/provider-benefits" element={<ProviderBenefits />} />
          <Route path="/get-verified" element={<GetVerified />} />
          <Route path="/resources-tools" element={<ResourcesTools />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
