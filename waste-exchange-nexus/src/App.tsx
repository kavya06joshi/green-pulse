import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminInventory from "./pages/admin/Inventory";
import AdminOrders from "./pages/admin/Orders";
import AdminRevenue from "./pages/admin/Revenue";
import IndustryLayout from "./pages/industry/IndustryLayout";
import BrowseInventory from "./pages/industry/BrowseInventory";
import MyOrders from "./pages/industry/MyOrders";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminInventory />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="revenue" element={<AdminRevenue />} />
              </Route>
              <Route path="/industry" element={<IndustryLayout />}>
                <Route index element={<BrowseInventory />} />
                <Route path="orders" element={<MyOrders />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
