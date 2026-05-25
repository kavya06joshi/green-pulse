import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const links = [
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Features", href: "/#features" },
  { name: "Rewards", href: "/#rewards" },
  { name: "Leaderboard", href: "/#leaderboard" },
  { name: "Impact", href: "/#impact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, userProfile, logout } = useAuth();
  const location = useLocation();

  const isAdmin = userProfile?.role === "admin";
  const dashboardLink = isAdmin ? "/admin" : "/dashboard";
  const dashboardLabel = isAdmin ? "Admin Panel" : "Dashboard";
  const isDashboardActive = location.pathname === dashboardLink;

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <Droplets className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground uppercase tracking-tight">SUCO</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
          {user && (
            <Link 
              to={dashboardLink} 
              className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${
                isDashboardActive ? "text-secondary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              {dashboardLabel}
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 border-l border-border/50 pl-4">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-foreground">{userProfile?.name || "Member"}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium opacity-70">{userProfile?.userId}</span>
              </div>
              <Button size="icon" variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-destructive transition-colors">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" className="bg-gradient-hero text-primary-foreground rounded-lg shadow-md hover:shadow-lg transition-all">
                Login / Register
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {links.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground py-2">
                  {link.name}
                </a>
              ))}
              {user && (
                <Link to={dashboardLink} onClick={() => setOpen(false)} className="text-sm text-secondary font-medium py-2 flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" /> {dashboardLabel}
                </Link>
              )}
              {user ? (
                <Button variant="outline" size="sm" onClick={() => { handleLogout(); setOpen(false); }} className="w-full justify-start gap-2 mt-2">
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button size="sm" className="bg-gradient-hero text-primary-foreground rounded-lg mt-2 w-full">
                    Login / Register
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
