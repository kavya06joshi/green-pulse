import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/context/DataContext";
import { monthlyRevenue, wasteTypeRevenue, wasteTrends } from "@/data/mockData";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { DollarSign, TrendingUp, Package, ShoppingCart } from "lucide-react";

const COLORS = ["hsl(152,56%,34%)", "hsl(207,70%,45%)", "hsl(38,92%,50%)", "hsl(0,72%,51%)", "hsl(270,50%,50%)"];

import { useAuth } from "@/context/AuthContext";

export default function AdminRevenue() {
  const { inventory, allOrders } = useData();
  const { role } = useAuth();

  if (role !== "admin") return <div className="p-8 text-center text-destructive font-bold">Access Denied</div>;

  const totalRevenue = allOrders.filter((o) => o.status === "accepted").reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const totalOrders = allOrders.length;
  const activeListings = inventory.filter((i) => i.status === "Available").length;
  const pendingOrders = allOrders.filter((o) => o.status === "placed").length;

  const stats = [
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign },
    { label: "Total Orders", value: totalOrders, icon: ShoppingCart },
    { label: "Active Listings", value: activeListings, icon: Package },
    { label: "Pending Review", value: pendingOrders, icon: TrendingUp },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Revenue & Analytics</h2>
        <p className="text-sm text-muted-foreground">Financial overview and waste trends</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Monthly Revenue</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
                <XAxis dataKey="month" stroke="hsl(210,15%,46%)" fontSize={12} />
                <YAxis stroke="hsl(210,15%,46%)" fontSize={12} />
                <Tooltip />
                <Bar dataKey="revenue" fill="hsl(152,56%,34%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Revenue by Waste Type</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={wasteTypeRevenue} dataKey="revenue" nameKey="type" cx="50%" cy="50%" outerRadius={100} label>
                  {wasteTypeRevenue.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Waste Collection Trends (tons)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={wasteTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
              <XAxis dataKey="month" stroke="hsl(210,15%,46%)" fontSize={12} />
              <YAxis stroke="hsl(210,15%,46%)" fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Plastic" stroke={COLORS[0]} strokeWidth={2} />
              <Line type="monotone" dataKey="Paper" stroke={COLORS[1]} strokeWidth={2} />
              <Line type="monotone" dataKey="Metal" stroke={COLORS[2]} strokeWidth={2} />
              <Line type="monotone" dataKey="E-waste" stroke={COLORS[3]} strokeWidth={2} />
              <Line type="monotone" dataKey="Glass" stroke={COLORS[4]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
