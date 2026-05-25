import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { Package, ShoppingCart, BarChart3, TrendingUp, LogOut, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Inventory", url: "/admin", icon: Package },
  { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
  { title: "Revenue", url: "/admin/revenue", icon: BarChart3 },
];

export default function AdminLayout() {
  const { role, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role && role !== "admin") {
      // Access denied handled in UI
    } else if (!role && !loading) {
      navigate("/login");
    }
  }, [role, loading, navigate]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  if (role && role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-2">Access denied for this module</h1>
        <p className="text-muted-foreground mb-4">You do not have the required permissions to access the Admin Portal.</p>
        <Button onClick={() => { logout(); navigate("/login"); }}>Go to Login</Button>
      </div>
    );
  }

  if (!role) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <Link to="/admin" className="flex items-center gap-2">
              <Recycle className="h-6 w-6 text-sidebar-primary" />
              <span className="font-bold text-sidebar-foreground">WasteXchange</span>
            </Link>
            <span className="text-xs text-sidebar-foreground/60 mt-1">Admin Portal</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink to={item.url} end className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground" onClick={() => { logout(); navigate("/"); }}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto">
          <header className="h-14 border-b flex items-center px-4 gap-4 bg-card">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
          </header>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
