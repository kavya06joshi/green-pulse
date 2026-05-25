import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SchedulePage from "./pages/SchedulePage";
import GuidelinesPage from "./pages/GuidelinesPage";
import GreenPointsPage from "./pages/GreenPointsPage";
import AdminPortal from "./pages/AdminPortal";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading } = useAuth();
  if (loading) return null;
  if (!user || profile?.role !== 'admin') return <Navigate to="/" />;
  return <>{children}</>;
};

const AppContent = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/guidelines" element={<GuidelinesPage />} />
        <Route path="/green-points" element={<ProtectedRoute><GreenPointsPage /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminPortal /></AdminRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
